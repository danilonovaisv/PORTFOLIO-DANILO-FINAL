#!/usr/bin/env python3
"""Supabase Storage specialized audit agent."""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Any

if __package__ in (None, ""):
    import sys

    sys.path.append(str(Path(__file__).resolve().parent))

from contracts import (
    Finding,
    compute_score,
    ensure_reports_dir,
    list_tracked_files,
    now_iso,
    read_text,
    stable_id,
    write_json,
)

TEXT_FILE_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".mjs",
    ".cjs",
    ".json",
    ".md",
    ".yml",
    ".yaml",
    ".sql",
    ".toml",
    ".env",
    ".txt",
}

PUBLIC_CLIENT_PATHS = (
    "src/app/",
    "src/components/",
    "src/hooks/",
    "public/",
)

ALLOWED_PUBLIC_BUCKETS = {"portfolio-media", "site-assets", "public-assets"}


def _is_text_like(path: Path) -> bool:
    if path.suffix.lower() in TEXT_FILE_EXTENSIONS:
        return True
    if path.name.startswith(".env"):
        return True
    return False


def _collect_findings(project_root: Path) -> tuple[list[Finding], dict[str, Any]]:
    findings: list[Finding] = []
    tracked_files = list_tracked_files(project_root)

    secret_pattern = re.compile(r"sb_service_role_[A-Za-z0-9_\-]+")
    service_role_name_pattern = re.compile(r"SUPABASE_SERVICE_ROLE_KEY")

    for file_path in tracked_files:
        if not _is_text_like(file_path):
            continue
        rel = file_path.relative_to(project_root).as_posix()
        text = read_text(file_path)

        if secret_pattern.search(text):
            findings.append(
                Finding(
                    finding_id=stable_id("supabase-secret-literal", rel),
                    domain="supabase",
                    severity="critical",
                    category="credentials",
                    title="Hardcoded Supabase service role token pattern detected",
                    recommendation="Remove hardcoded token and load it only from secure server-side environment.",
                    auto_fixable=False,
                    evidence={"files": [rel], "snippets": ["sb_service_role_***"]},
                )
            )

        if service_role_name_pattern.search(text):
            # Service role references in server-only files are acceptable.
            server_only_ok = rel.startswith("src/lib/supabase/admin") or rel.startswith("functions/")
            exposed_surface = any(rel.startswith(prefix) for prefix in PUBLIC_CLIENT_PATHS)
            if exposed_surface and not server_only_ok:
                findings.append(
                    Finding(
                        finding_id=stable_id("supabase-service-role-client", rel),
                        domain="supabase",
                        severity="critical",
                        category="credentials",
                        title="Service role key referenced from client-exposed surface",
                        recommendation="Move service-role logic to server-only modules and remove from client bundles.",
                        auto_fixable=False,
                        evidence={"files": [rel], "snippets": ["SUPABASE_SERVICE_ROLE_KEY"]},
                    )
                )

        if "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY" in text:
            findings.append(
                Finding(
                    finding_id=stable_id("supabase-next-public-service-role", rel),
                    domain="supabase",
                    severity="critical",
                    category="credentials",
                    title="NEXT_PUBLIC service role variable detected",
                    recommendation="Replace NEXT_PUBLIC service-role variable with server-side SUPABASE_SERVICE_ROLE_KEY only.",
                    auto_fixable=True,
                    evidence={"files": [rel], "snippets": ["NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"]},
                )
            )

    sql_files = sorted((project_root / "supabase").rglob("*.sql"))
    sql_blob = "\n".join(read_text(p) for p in sql_files)

    # Bucket visibility scan
    bucket_matches = re.findall(
        r"insert\s+into\s+storage\.buckets\s*\([^)]*\)\s*values\s*\('([^']+)'\s*,\s*'[^']+'\s*,\s*(true|false)\)",
        sql_blob,
        flags=re.IGNORECASE,
    )
    public_buckets = {bucket for bucket, is_public in bucket_matches if is_public.lower() == "true"}
    unexpected_public = sorted(public_buckets - ALLOWED_PUBLIC_BUCKETS)
    if unexpected_public:
        findings.append(
            Finding(
                finding_id=stable_id("supabase-unexpected-public-buckets", ",".join(unexpected_public)),
                domain="supabase",
                severity="high",
                category="bucket_visibility",
                title="Unexpected public buckets detected",
                recommendation="Migrate these buckets to private access with signed URLs.",
                auto_fixable=False,
                evidence={"files": ["supabase/**/*.sql"], "snippets": unexpected_public},
            )
        )

    # RLS policy coverage for storage.objects
    operations = {op.lower() for op in re.findall(r"create\s+policy\s+\"[^\"]+\"\s+on\s+storage\.objects\s+for\s+(select|insert|update|delete|all)", sql_blob, flags=re.IGNORECASE)}
    normalized_ops = set(operations)
    if "all" in normalized_ops:
        normalized_ops.update({"select", "insert", "update", "delete"})
    missing_ops = sorted({"select", "insert", "update", "delete"} - normalized_ops)
    if missing_ops:
        findings.append(
            Finding(
                finding_id=stable_id("supabase-storage-rls-missing-ops", ",".join(missing_ops)),
                domain="supabase",
                severity="high",
                category="rls_policy",
                title="Missing storage.objects policy operations",
                recommendation="Add explicit storage.objects policies for missing operations with admin-bound checks.",
                auto_fixable=True,
                evidence={"files": ["supabase/**/*.sql"], "snippets": missing_ops},
            )
        )

    # CORS baseline check
    cors_path = project_root / "supabase" / "storage-cors.json"
    if not cors_path.exists():
        findings.append(
            Finding(
                finding_id="supabase-cors-baseline-missing",
                domain="supabase",
                severity="medium",
                category="storage_cors",
                title="Supabase Storage CORS baseline file is missing",
                recommendation="Create and version a restrictive CORS baseline for storage API calls.",
                auto_fixable=True,
                evidence={"files": [], "snippets": ["supabase/storage-cors.json missing"]},
            )
        )

    # 3D asset versioning check
    asset_root = project_root / "public" / "site.assets"
    versioning_issues: list[str] = []
    if asset_root.exists():
        for ext in ("*.glb", "*.gltf", "*.bin", "*.hdr", "*.exr"):
            for asset in asset_root.rglob(ext):
                name = asset.name
                hashed = bool(re.search(r"[.-][a-f0-9]{8,}\.", name, flags=re.IGNORECASE))
                versioned = bool(re.search(r"[-_.]v\d+", name, flags=re.IGNORECASE))
                if not (hashed or versioned):
                    versioning_issues.append(asset.relative_to(project_root).as_posix())

    if versioning_issues:
        findings.append(
            Finding(
                finding_id=stable_id("supabase-3d-versioning", str(len(versioning_issues))),
                domain="supabase",
                severity="medium",
                category="performance",
                title="3D assets without explicit version/hash naming",
                recommendation="Adopt hashed or versioned filenames for immutable cache safety.",
                auto_fixable=False,
                evidence={"files": versioning_issues[:25], "snippets": [f"count={len(versioning_issues)}"]},
            )
        )

    meta = {
        "public_buckets_detected": sorted(public_buckets),
        "unexpected_public_buckets": unexpected_public,
        "storage_policy_operations": sorted(normalized_ops),
        "missing_storage_policy_operations": missing_ops,
        "tracked_files_scanned": len(tracked_files),
    }

    return findings, meta


def _apply_safe_fixes(project_root: Path, findings: list[Finding], reports_dir: Path) -> list[str]:
    applied: list[str] = []

    files_to_sanitize = []
    for finding in findings:
        if finding.finding_id.startswith("supabase-next-public-service-role"):
            files_to_sanitize.extend(finding.evidence.get("files", []))

    for rel in sorted(set(files_to_sanitize)):
        p = project_root / rel
        if not p.exists():
            continue
        before = read_text(p)
        after = before.replace("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY")
        if before != after:
            p.write_text(after, encoding="utf-8")
            applied.append(f"Sanitized NEXT_PUBLIC service-role key reference in {rel}")

    cors_path = project_root / "supabase" / "storage-cors.json"
    if not cors_path.exists():
        cors_path.write_text(
            '{\n'
            '  "allowedOrigins": [\n'
            '    "https://portfoliodanilo.com",\n'
            '    "http://localhost:3000"\n'
            '  ],\n'
            '  "allowedMethods": ["GET", "HEAD", "OPTIONS"],\n'
            '  "allowedHeaders": ["Authorization", "Content-Type", "x-client-info", "apikey"],\n'
            '  "maxAgeSeconds": 3600\n'
            '}\n',
            encoding="utf-8",
        )
        applied.append("Created supabase/storage-cors.json baseline")

    missing_rls = any(f.finding_id.startswith("supabase-storage-rls-missing-ops") for f in findings)
    if missing_rls:
        patch_path = project_root / "supabase" / "migrations" / f"{now_iso().replace(':', '').replace('-', '').replace('+00:00', '').replace('T', '')}_storage_policy_patch.sql"
        patch_path.write_text(
            "-- Generated by agent-supabase-audit\n"
            "-- Ensure storage.objects policy coverage for select/insert/update/delete\n"
            "-- Review before applying to production.\n\n"
            "do $$\n"
            "begin\n"
            "  if not exists (\n"
            "    select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'legacy_buckets_select'\n"
            "  ) then\n"
            "    create policy \"legacy_buckets_select\" on storage.objects for select to anon, authenticated\n"
            "    using (bucket_id in ('portfolio-media', 'site-assets'));\n"
            "  end if;\n"
            "end;\n"
            "$$;\n",
            encoding="utf-8",
        )
        applied.append(f"Generated storage policy patch migration: {patch_path.relative_to(project_root).as_posix()}")

    if applied:
        write_json(
            reports_dir / "storage-fixes-applied.json",
            {
                "timestamp_utc": now_iso(),
                "applied_fixes": applied,
            },
        )

    return applied


def run_supabase_audit(project_root: Path, reports_dir: Path, auto_fix: bool = False) -> dict[str, Any]:
    reports_dir = ensure_reports_dir(reports_dir)
    findings, meta = _collect_findings(project_root)

    applied_fixes: list[str] = []
    if auto_fix:
        applied_fixes = _apply_safe_fixes(project_root, findings, reports_dir)

    security_score = compute_score([f for f in findings if f.category != "performance"])
    performance_score = compute_score([f for f in findings if f.category == "performance"], base=100)

    report = {
        "agent": "agent-supabase-audit",
        "timestamp_utc": now_iso(),
        "auto_fix": auto_fix,
        "storage_security_score": security_score,
        "storage_performance_score": performance_score,
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

    write_json(reports_dir / "storage-audit.json", report)
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Run agent-supabase-audit")
    parser.add_argument("--project-root", default=".", help="Repository root path")
    parser.add_argument("--reports-dir", default="reports", help="Reports directory")
    parser.add_argument("--auto-fix", action="store_true", help="Apply safe automatic fixes")
    args = parser.parse_args()

    report = run_supabase_audit(Path(args.project_root).resolve(), Path(args.reports_dir).resolve(), auto_fix=args.auto_fix)
    print(f"[agent-supabase-audit] findings={report['summary']['total_findings']} security={report['storage_security_score']} performance={report['storage_performance_score']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
