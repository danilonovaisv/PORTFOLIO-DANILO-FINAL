#!/usr/bin/env python3
"""Firebase Hosting specialized audit agent."""

from __future__ import annotations

import argparse
import difflib
import json
import re
from pathlib import Path
from typing import Any

if __package__ in (None, ""):
    import sys

    sys.path.append(str(Path(__file__).resolve().parent))

from contracts import Finding, compute_score, ensure_reports_dir, now_iso, stable_id, write_json


REQUIRED_HEADERS = {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}


def _flatten_headers(hosting: dict[str, Any]) -> dict[str, str]:
    flattened: dict[str, str] = {}
    for block in hosting.get("headers", []):
        for header in block.get("headers", []):
            key = header.get("key")
            value = header.get("value")
            if key and isinstance(value, str):
                flattened[key] = value
    return flattened


def _detect_next_trailing_slash(next_config_path: Path) -> bool | None:
    if not next_config_path.exists():
        return None
    content = next_config_path.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r"trailingSlash\s*:\s*(true|false)", content)
    if not m:
        return None
    return m.group(1) == "true"


def _has_cache_pattern(hosting: dict[str, Any], source_pattern: str) -> bool:
    for block in hosting.get("headers", []):
        if block.get("source") == source_pattern:
            for header in block.get("headers", []):
                if header.get("key") == "Cache-Control":
                    return True
    return False


def _collect_findings(project_root: Path) -> tuple[list[Finding], dict[str, Any], dict[str, Any]]:
    findings: list[Finding] = []
    firebase_path = project_root / "firebase.json"

    if not firebase_path.exists():
        findings.append(
            Finding(
                finding_id="firebase-config-missing",
                domain="firebase",
                severity="critical",
                category="hosting_rewrites",
                title="firebase.json is missing",
                recommendation="Create firebase.json with hosting and functions configuration.",
                auto_fixable=False,
                evidence={"files": [], "snippets": ["firebase.json missing"]},
            )
        )
        return findings, {}, {}

    raw = firebase_path.read_text(encoding="utf-8", errors="ignore")
    try:
        config = json.loads(raw)
    except json.JSONDecodeError as exc:
        findings.append(
            Finding(
                finding_id="firebase-json-invalid",
                domain="firebase",
                severity="critical",
                category="hosting_rewrites",
                title="firebase.json is invalid JSON",
                recommendation="Fix JSON syntax before deploy.",
                auto_fixable=False,
                evidence={"files": ["firebase.json"], "snippets": [str(exc)]},
            )
        )
        return findings, {}, {}

    hosting = config.get("hosting", {}) if isinstance(config.get("hosting"), dict) else {}
    flattened_headers = _flatten_headers(hosting)

    for key, expected_value in REQUIRED_HEADERS.items():
        current = flattened_headers.get(key)
        if current is None:
            findings.append(
                Finding(
                    finding_id=stable_id("firebase-header-missing", key),
                    domain="firebase",
                    severity="high",
                    category="hosting_headers",
                    title=f"Missing required hosting header: {key}",
                    recommendation=f"Add hosting header `{key}: {expected_value}`.",
                    auto_fixable=True,
                    evidence={"files": ["firebase.json"], "snippets": [key]},
                )
            )
        elif key == "Strict-Transport-Security" and "preload" not in current:
            findings.append(
                Finding(
                    finding_id=stable_id("firebase-header-weak", key),
                    domain="firebase",
                    severity="medium",
                    category="hosting_headers",
                    title="HSTS header present without preload",
                    recommendation="Upgrade HSTS to include preload for stricter browser enforcement.",
                    auto_fixable=True,
                    evidence={"files": ["firebase.json"], "snippets": [current]},
                )
            )

    # Next.js App Router rewrites strategy
    rewrites = hosting.get("rewrites", []) if isinstance(hosting.get("rewrites"), list) else []
    has_frameworks_backend = isinstance(hosting.get("frameworksBackend"), dict)
    has_catch_all_rewrite = any(isinstance(rw, dict) and rw.get("source") == "**" for rw in rewrites)
    if not has_frameworks_backend and not has_catch_all_rewrite:
        findings.append(
            Finding(
                finding_id="firebase-nextjs-rewrite-missing",
                domain="firebase",
                severity="high",
                category="hosting_rewrites",
                title="No catch-all rewrite and no frameworks backend detected",
                recommendation="Configure frameworksBackend or add a safe catch-all rewrite for SSR routes.",
                auto_fixable=False,
                evidence={"files": ["firebase.json"], "snippets": ["hosting.rewrites"]},
            )
        )

    # Cache-control checks
    if not _has_cache_pattern(hosting, "/_next/static/**"):
        findings.append(
            Finding(
                finding_id="firebase-cache-next-static-missing",
                domain="firebase",
                severity="medium",
                category="cache_control",
                title="Missing cache-control policy for _next/static",
                recommendation="Add immutable long-term caching for `/_next/static/**`.",
                auto_fixable=True,
                evidence={"files": ["firebase.json"], "snippets": ["/_next/static/**"]},
            )
        )

    if not _has_cache_pattern(hosting, "**/*.@(glb|gltf|bin|hdr|exr|mp4|webm|mov|m3u8)"):
        findings.append(
            Finding(
                finding_id="firebase-cache-3d-media-missing",
                domain="firebase",
                severity="medium",
                category="cache_control",
                title="Missing cache-control policy for 3D/media assets",
                recommendation="Add bounded cache-control for 3D/media assets to avoid stale visual artifacts.",
                auto_fixable=True,
                evidence={"files": ["firebase.json"], "snippets": [".glb/.gltf/.mp4"]},
            )
        )

    if not _has_cache_pattern(hosting, "/api/**"):
        findings.append(
            Finding(
                finding_id="firebase-cache-api-missing",
                domain="firebase",
                severity="low",
                category="cache_control",
                title="Missing explicit no-store cache policy for /api routes",
                recommendation="Add `Cache-Control: no-store` for `/api/**` routes.",
                auto_fixable=True,
                evidence={"files": ["firebase.json"], "snippets": ["/api/**"]},
            )
        )

    # trailingSlash consistency
    next_trailing = _detect_next_trailing_slash(project_root / "next.config.mjs")
    hosting_trailing = hosting.get("trailingSlash") if isinstance(hosting.get("trailingSlash"), bool) else None
    if next_trailing is not None and hosting_trailing is not None and next_trailing != hosting_trailing:
        findings.append(
            Finding(
                finding_id="firebase-trailing-slash-mismatch",
                domain="firebase",
                severity="medium",
                category="hosting_rewrites",
                title="trailingSlash mismatch between Next.js and Firebase Hosting",
                recommendation="Align `hosting.trailingSlash` with Next.js config.",
                auto_fixable=True,
                evidence={"files": ["firebase.json", "next.config.mjs"], "snippets": [f"hosting={hosting_trailing}, next={next_trailing}"]},
            )
        )

    meta = {
        "has_frameworks_backend": has_frameworks_backend,
        "has_catch_all_rewrite": has_catch_all_rewrite,
        "detected_next_trailing_slash": next_trailing,
        "detected_hosting_trailing_slash": hosting_trailing,
    }

    return findings, config, meta


def _upsert_header_block(hosting: dict[str, Any], source: str, key: str, value: str) -> None:
    headers = hosting.setdefault("headers", [])
    for block in headers:
        if block.get("source") == source:
            block_headers = block.setdefault("headers", [])
            for header in block_headers:
                if header.get("key") == key:
                    header["value"] = value
                    return
            block_headers.append({"key": key, "value": value})
            return
    headers.append({"source": source, "headers": [{"key": key, "value": value}]})


def _ensure_cache_block(hosting: dict[str, Any], source: str, cache_value: str) -> None:
    _upsert_header_block(hosting, source, "Cache-Control", cache_value)


def _apply_safe_fixes(project_root: Path, reports_dir: Path, config: dict[str, Any], findings: list[Finding], meta: dict[str, Any]) -> list[str]:
    applied: list[str] = []

    firebase_path = project_root / "firebase.json"
    before = firebase_path.read_text(encoding="utf-8", errors="ignore")

    hosting = config.setdefault("hosting", {})
    if not isinstance(hosting, dict):
        return applied

    # Header baseline
    for key, value in REQUIRED_HEADERS.items():
        _upsert_header_block(hosting, "**", key, value)

    # Cache baseline
    _ensure_cache_block(hosting, "/_next/static/**", "public, max-age=31536000, immutable")
    _ensure_cache_block(
        hosting,
        "**/*.@(glb|gltf|bin|hdr|exr|mp4|webm|mov|m3u8)",
        "public, max-age=3600, stale-while-revalidate=86400",
    )
    _ensure_cache_block(hosting, "/api/**", "no-store")

    # trailingSlash consistency
    if any(f.finding_id == "firebase-trailing-slash-mismatch" for f in findings):
        detected_next = meta.get("detected_next_trailing_slash")
        if isinstance(detected_next, bool):
            hosting["trailingSlash"] = detected_next

    after = json.dumps(config, indent=2, ensure_ascii=True) + "\n"
    if before == after:
        return applied

    backup_dir = reports_dir / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)
    backup_file = backup_dir / f"firebase.{now_iso().replace(':', '').replace('-', '').replace('+00:00', '').replace('T', '')}.json"
    backup_file.write_text(before, encoding="utf-8")

    diff = "\n".join(
        difflib.unified_diff(
            before.splitlines(),
            after.splitlines(),
            fromfile="firebase.json.before",
            tofile="firebase.json.after",
            lineterm="",
        )
    )
    (reports_dir / "firebase.json.diff.patch").write_text(diff + "\n", encoding="utf-8")

    firebase_path.write_text(after, encoding="utf-8")

    applied.append(f"Backed up firebase.json to {backup_file.relative_to(project_root).as_posix()}")
    applied.append("Generated reports/firebase.json.diff.patch")
    applied.append("Applied hosting header/cache/trailingSlash hardening to firebase.json")

    write_json(
        reports_dir / "hosting-fixes-applied.json",
        {
            "timestamp_utc": now_iso(),
            "applied_fixes": applied,
        },
    )

    return applied


def run_firebase_audit(project_root: Path, reports_dir: Path, auto_fix: bool = False) -> dict[str, Any]:
    reports_dir = ensure_reports_dir(reports_dir)
    findings, config, meta = _collect_findings(project_root)

    applied_fixes: list[str] = []
    if auto_fix and config:
        applied_fixes = _apply_safe_fixes(project_root, reports_dir, config, findings, meta)

    security_findings = [f for f in findings if f.category in {"hosting_headers", "hosting_rewrites", "env_governance"}]
    performance_findings = [f for f in findings if f.category in {"cache_control", "performance"}]

    security_score = compute_score(security_findings)
    performance_score = compute_score(performance_findings)

    report = {
        "agent": "agent-firebase-audit",
        "timestamp_utc": now_iso(),
        "auto_fix": auto_fix,
        "security_score": security_score,
        "performance_score": performance_score,
        "summary": {
            "total_findings": len(findings),
            "critical": sum(1 for f in findings if f.severity == "critical"),
            "high": sum(1 for f in findings if f.severity == "high"),
            "medium": sum(1 for f in findings if f.severity == "medium"),
            "low": sum(1 for f in findings if f.severity == "low"),
            "info": sum(1 for f in findings if f.severity == "info"),
        },
        "findings": [f.to_dict() for f in findings],
        "applied_fixes": applied_fixes,
        "meta": meta,
    }

    write_json(reports_dir / "hosting-audit.json", report)
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Run agent-firebase-audit")
    parser.add_argument("--project-root", default=".", help="Repository root path")
    parser.add_argument("--reports-dir", default="reports", help="Reports directory")
    parser.add_argument("--auto-fix", action="store_true", help="Apply safe automatic fixes")
    args = parser.parse_args()

    report = run_firebase_audit(Path(args.project_root).resolve(), Path(args.reports_dir).resolve(), auto_fix=args.auto_fix)
    print(f"[agent-firebase-audit] findings={report['summary']['total_findings']} security={report['security_score']} performance={report['performance_score']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
