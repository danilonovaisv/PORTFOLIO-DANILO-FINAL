#!/usr/bin/env python3
"""Orchestrator agent for fullstack config audit workflow."""

from __future__ import annotations

import argparse
import html
from pathlib import Path
from typing import Any

if __package__ in (None, ""):
    import sys

    sys.path.append(str(Path(__file__).resolve().parent))

from contracts import ensure_reports_dir, now_iso, write_json
from agent_supabase_audit import run_supabase_audit
from agent_firebase_audit import run_firebase_audit


def _validate_project(project_root: Path) -> list[dict[str, Any]]:
    checks = [
        ("src/app", (project_root / "src" / "app").exists()),
        ("src/components", (project_root / "src" / "components").exists()),
        ("firebase.json", (project_root / "firebase.json").exists()),
        ("supabase directory", (project_root / "supabase").exists()),
    ]

    findings: list[dict[str, Any]] = []
    for target, ok in checks:
        if not ok:
            findings.append(
                {
                    "severity": "critical",
                    "title": f"Required project target missing: {target}",
                    "recommendation": f"Create or restore `{target}` before running audit workflow.",
                }
            )
    return findings


def _build_fix_plan(storage_report: dict[str, Any], hosting_report: dict[str, Any], reports_dir: Path) -> Path:
    fixable = []
    for source, report in (("supabase", storage_report), ("firebase", hosting_report)):
        for finding in report.get("findings", []):
            if finding.get("auto_fixable"):
                fixable.append((source, finding))

    lines = [
        "# FIX_PLAN",
        "",
        f"Generated at: `{now_iso()}`",
        "",
        "## Auto-fix Eligible Findings",
    ]

    if not fixable:
        lines.append("- No auto-fixable findings detected.")
    else:
        for idx, (source, finding) in enumerate(fixable, start=1):
            lines.extend(
                [
                    f"{idx}. [{source}] `{finding.get('severity', 'unknown')}` {finding.get('title', 'Untitled finding')}",
                    f"   - Category: `{finding.get('category', 'n/a')}`",
                    f"   - Recommendation: {finding.get('recommendation', 'n/a')}",
                ]
            )

    lines.extend(
        [
            "",
            "## Guardrails",
            "- Never apply storage policy changes without backup artifact.",
            "- Never modify `firebase.json` without diff preview.",
            "- Always re-audit after mutation.",
        ]
    )

    fix_plan_path = reports_dir / "FIX_PLAN.md"
    fix_plan_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return fix_plan_path


def _score_master(storage_report: dict[str, Any], hosting_report: dict[str, Any]) -> tuple[int, int, int]:
    storage_security = int(storage_report.get("storage_security_score", 0))
    storage_perf = int(storage_report.get("storage_performance_score", 0))
    hosting_security = int(hosting_report.get("security_score", 0))
    hosting_perf = int(hosting_report.get("performance_score", 0))

    security_score = round((storage_security + hosting_security) / 2)
    performance_score = round((storage_perf + hosting_perf) / 2)
    global_score = round((security_score * 0.6) + (performance_score * 0.4))
    return global_score, security_score, performance_score


def _render_html(master: dict[str, Any], reports_dir: Path) -> Path:
    def escape(text: Any) -> str:
        return html.escape(str(text))

    storage_findings = master["audits"]["supabase_storage"]["summary"]["total_findings"]
    hosting_findings = master["audits"]["firebase_hosting"]["summary"]["total_findings"]

    html_content = f"""<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>Fullstack Audit Report</title>
  <style>
    body {{ font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 2rem; color: #101828; }}
    h1, h2 {{ margin-bottom: 0.4rem; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1rem 0 1.5rem; }}
    .card {{ border: 1px solid #d0d5dd; border-radius: 8px; padding: 1rem; background: #fff; }}
    .score {{ font-size: 1.8rem; font-weight: 700; }}
    .ok {{ color: #027a48; }}
    .warn {{ color: #b54708; }}
    code {{ background: #f2f4f7; padding: 0.1rem 0.3rem; border-radius: 4px; }}
  </style>
</head>
<body>
  <h1>Audit Fullstack Config</h1>
  <p>Generated: <code>{escape(master['timestamp_utc'])}</code></p>

  <div class=\"grid\">
    <div class=\"card\"><div>Global Score</div><div class=\"score\">{escape(master['global_score'])}</div></div>
    <div class=\"card\"><div>Security Score</div><div class=\"score\">{escape(master['security_score'])}</div></div>
    <div class=\"card\"><div>Performance Score</div><div class=\"score\">{escape(master['performance_score'])}</div></div>
    <div class=\"card\"><div>Status</div><div class=\"score {'ok' if master['status'] == 'OK' else 'warn'}\">{escape(master['status'])}</div></div>
  </div>

  <h2>Audit Summary</h2>
  <ul>
    <li>Supabase findings: <strong>{escape(storage_findings)}</strong></li>
    <li>Firebase findings: <strong>{escape(hosting_findings)}</strong></li>
    <li>Auto-fix mode: <strong>{escape(master['auto_fix'])}</strong></li>
  </ul>

  <h2>Artifacts</h2>
  <ul>
    <li><code>reports/storage-audit.json</code></li>
    <li><code>reports/hosting-audit.json</code></li>
    <li><code>reports/master-audit.json</code></li>
    <li><code>reports/security-score.json</code></li>
    <li><code>reports/performance-score.json</code></li>
  </ul>
</body>
</html>
"""
    out = reports_dir / "final-report.html"
    out.write_text(html_content, encoding="utf-8")
    return out


def _version_reports(reports_dir: Path) -> Path:
    stamp = now_iso().replace(":", "").replace("-", "").replace("+00:00", "").replace("T", "-")
    version_dir = reports_dir / "history" / stamp
    version_dir.mkdir(parents=True, exist_ok=True)

    for name in [
        "storage-audit.json",
        "hosting-audit.json",
        "master-audit.json",
        "security-score.json",
        "performance-score.json",
        "final-report.html",
        "FIX_PLAN.md",
    ]:
        src = reports_dir / name
        if src.exists():
            (version_dir / name).write_text(src.read_text(encoding="utf-8", errors="ignore"), encoding="utf-8")

    return version_dir


def run_workflow(project_root: Path, reports_dir: Path, auto_fix: bool = False) -> dict[str, Any]:
    reports_dir = ensure_reports_dir(reports_dir)

    structure_findings = _validate_project(project_root)
    if structure_findings:
        master = {
            "workflow": "audit-fullstack-config",
            "timestamp_utc": now_iso(),
            "auto_fix": auto_fix,
            "global_score": 0,
            "security_score": 0,
            "performance_score": 0,
            "status": "FAILED_PRECHECK",
            "precheck_findings": structure_findings,
            "audits": {},
        }
        write_json(reports_dir / "master-audit.json", master)
        write_json(reports_dir / "security-score.json", {"score": 0, "status": "FAILED_PRECHECK"})
        write_json(reports_dir / "performance-score.json", {"score": 0, "status": "FAILED_PRECHECK"})
        return master

    storage_report = run_supabase_audit(project_root, reports_dir, auto_fix=auto_fix)
    hosting_report = run_firebase_audit(project_root, reports_dir, auto_fix=auto_fix)

    _build_fix_plan(storage_report, hosting_report, reports_dir)

    # Mandatory revalidation pass after auto-fix
    if auto_fix:
        storage_report = run_supabase_audit(project_root, reports_dir, auto_fix=False)
        hosting_report = run_firebase_audit(project_root, reports_dir, auto_fix=False)

    global_score, security_score, performance_score = _score_master(storage_report, hosting_report)

    critical_count = (
        storage_report.get("summary", {}).get("critical", 0)
        + hosting_report.get("summary", {}).get("critical", 0)
    )
    status = "OK" if critical_count == 0 else "REQUIRES_ACTION"

    master = {
        "workflow": "audit-fullstack-config",
        "timestamp_utc": now_iso(),
        "auto_fix": auto_fix,
        "global_score": global_score,
        "security_score": security_score,
        "performance_score": performance_score,
        "status": status,
        "audits": {
            "supabase_storage": {
                "score": storage_report.get("storage_security_score", 0),
                "summary": storage_report.get("summary", {}),
            },
            "firebase_hosting": {
                "score": hosting_report.get("security_score", 0),
                "summary": hosting_report.get("summary", {}),
            },
        },
    }

    write_json(reports_dir / "master-audit.json", master)
    write_json(
        reports_dir / "security-score.json",
        {
            "timestamp_utc": now_iso(),
            "score": security_score,
            "components": {
                "supabase_storage_security": storage_report.get("storage_security_score", 0),
                "firebase_hosting_security": hosting_report.get("security_score", 0),
            },
        },
    )
    write_json(
        reports_dir / "performance-score.json",
        {
            "timestamp_utc": now_iso(),
            "score": performance_score,
            "components": {
                "supabase_storage_performance": storage_report.get("storage_performance_score", 0),
                "firebase_hosting_performance": hosting_report.get("performance_score", 0),
            },
        },
    )

    _render_html(master, reports_dir)
    version_dir = _version_reports(reports_dir)
    master["versioned_report_dir"] = version_dir.as_posix()

    return master


def main() -> int:
    parser = argparse.ArgumentParser(description="Run audit-fullstack-config orchestrator")
    parser.add_argument("--project-root", default=".", help="Repository root path")
    parser.add_argument("--reports-dir", default="reports", help="Reports directory")
    parser.add_argument("--auto-fix", action="store_true", help="Apply safe automatic fixes")
    args = parser.parse_args()

    project_root = Path(args.project_root).resolve()
    reports_dir = Path(args.reports_dir).resolve()

    result = run_workflow(project_root, reports_dir, auto_fix=args.auto_fix)

    print(
        "[agent-orchestrator-audit] "
        f"status={result['status']} "
        f"global={result['global_score']} "
        f"security={result['security_score']} "
        f"performance={result['performance_score']}"
    )

    return 1 if result.get("status") == "REQUIRES_ACTION" else 0


if __name__ == "__main__":
    raise SystemExit(main())
