# 🛡️ Security Armor Module

> **Status**: Critical Defense
> **Type**: Shared Module (Audits & Configs)

This module encapsulates the security standards (OWASP, Best Practices) for the system.

## 📂 Structure

```
security-armor/
├── hardening.md          # 📜 Theoretical Hardening Guide (Existing)
├── checklists/           # ✅ Audit Tools
│   └── vuln_scan.md      #    - Manual/Automated Vulnerability Scan Checklist
└── presets/              # ⚙️ Configuration
    └── helmet_config.json #   - Reusable Helmet.js / Security Headers config
```

## 🚀 Usage

### 1. Pre-Deployment Audit

Before any major release, run through the `checklists/vuln_scan.md`.

### 2. Header Configuration

Copy the `helmet_config.json` settings into your web server (Express/Next.js) middleware to secure HTTP headers.
