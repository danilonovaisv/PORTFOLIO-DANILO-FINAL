#!/usr/bin/env python3
"""Shared contracts and helpers for Antigravity fullstack audit agents."""

from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import json
from typing import Any

SEVERITY_WEIGHTS = {
    "critical": 25,
    "high": 15,
    "medium": 8,
    "low": 3,
    "info": 0,
}


@dataclass
class Finding:
    finding_id: str
    domain: str
    severity: str
    category: str
    title: str
    recommendation: str
    auto_fixable: bool
    evidence: dict[str, Any]

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def stable_id(prefix: str, payload: str) -> str:
    digest = sha256(payload.encode("utf-8")).hexdigest()[:12]
    return f"{prefix}-{digest}"


def ensure_reports_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def compute_score(findings: list[Finding], base: int = 100) -> int:
    penalty = sum(SEVERITY_WEIGHTS.get(f.severity, 0) for f in findings)
    return max(0, min(100, base - penalty))


def list_tracked_files(project_root: Path) -> list[Path]:
    import subprocess

    result = subprocess.run(
        ["git", "ls-files"],
        cwd=project_root,
        capture_output=True,
        check=False,
        text=True,
    )
    if result.returncode != 0:
        return []

    files: list[Path] = []
    for raw in result.stdout.splitlines():
        raw = raw.strip()
        if not raw:
            continue
        p = project_root / raw
        if p.exists() and p.is_file():
            files.append(p)
    return files
