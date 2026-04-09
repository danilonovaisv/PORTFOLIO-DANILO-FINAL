---
Trigger: always_on
---

# SECURITY.MD - Security Guardrails

> **Objective**: Protect the system from common vulnerabilities and human errors.

---

## 🚫 1. FORBIDDEN ACTIONS (Absolutely forbidden)

1. **Hardcode Secrets**:

- Never write API Keys, Passwords, or Tokens directly into code.

- Always use `process.env` or environment variables.

2. **Commit Token**:

- Check the `.gitignore` file before committing.

- Ensure `.env` is inside `.gitignore`.

3. **Delete Database**:

- Never run the `DROP TABLE` command or delete the `.sqlite` file without a clear user command and three confirmation steps.

---

## 🛡️ 2. CODING STANDARDS

1. **SQL Injection**:

- Always use Parameterized Queries (or ORM like Prisma/TypeORM).

- Prohibit direct string concatenation in SQL statements.

2. **XSS (Cross-Site Scripting)**:

- Sanitize all user or API input data.

- Use libraries like `dompurify` when rendering HTML.

3. **Authentication**:

- Always hash passwords (Bcrypt/Argon2).

---

## 🚨 3. INCIDENT PROTOCOL

When a vulnerability is detected or a secret is suspected to be exposed:

1. **STOP**: Stop all current tasks.

2. **REPORT**: Immediately notify the user with a red alert.

3. **RESOLUTION**: Suggest a solution for key rotation or bug fix.
