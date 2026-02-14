# FIX_PLAN: Firebase Hosting Security Headers

The following critical issues were identified in the `firebase.json` configuration and require immediate remediation:

| Priority | Issue                   | Description                                   | Recommended Fix                            |
| :------- | :---------------------- | :-------------------------------------------- | :----------------------------------------- |
| **HIGH** | Missing HSTS            | `Strict-Transport-Security` header not found. | Add `max-age=31536000; includeSubDomains`. |
| **HIGH** | Clickjacking Prevention | `X-Frame-Options` missing.                    | Add `DENY` or `SAMEORIGIN`.                |
| **HIGH** | MIME Sniffing           | `X-Content-Type-Options` missing.             | Add `nosniff`.                             |

## Proposed Configuration Change

Add the following `headers` section to `hosting` in `firebase.json`:

```json
"headers": [
  {
    "source": "**",
    "headers": [
      {
        "key": "Strict-Transport-Security",
        "value": "max-age=31536000; includeSubDomains"
      },
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "X-Frame-Options",
         "value": "DENY"
      }
    ]
  },
  {
    "source": "**/*.@(jpg|jpeg|gif|png|webp|svg|css|js)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "max-age=31536000, immutable"
      }
    ]
  }
]
```

## Next Steps

Confirm this fix to allow the orchestrator to apply it automatically.
