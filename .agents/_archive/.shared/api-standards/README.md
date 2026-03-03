# 📡 API Standards Module

> **Status**: Interface Contract
> **Type**: Shared Module (Specs & Formats)

This module defines the laws of API communication to ensure Front-end and Back-end alignment.

## 📂 Structure

```
api-standards/
├── endpoints_naming.md   # 📜 Naming Conventions
├── data/                 # 💾 Standard Data Formats
│   ├── response_format.json
│   └── error_codes.csv
└── presets/              # ⚙️ Configs
```

## 🚀 Usage

### 1. Response Format

All APIs must return data wrapped in the structure defined in `data/response_format.json`.

### 2. Naming

Follow `endpoints_naming.md` (e.g., Kebab-case URLs, CamelCase JSON keys).
