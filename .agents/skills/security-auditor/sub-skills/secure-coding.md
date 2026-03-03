# 🛡️ Secure Coding Patterns

## 🎯 Purpose

Proactive defense against OWSAP Top 10 vulnerabilities during development.

## 🚫 Anti-Patterns vs ✅ Secure Patterns

### 1. SQL Injection (A03:2021)

❌ **Bad**: Concatenating strings.

```javascript
const query = 'SELECT * FROM users WHERE id = ' + req.params.id;
```

✅ **Good**: Parameterized Queries (Prepared Statements).

```javascript
const query = 'SELECT * FROM users WHERE id = $1';
const values = [req.params.id];
```

> **Rule**: Never trust user input. Always sanitize and validate at the boundary.

### 2. XSS (Cross-Site Scripting)

❌ **Bad**: `dangerouslySetInnerHTML` in React without sanitization.
✅ **Good**: Use library `dompurify` or framework's default escaping.

```javascript
import DOMPurify from 'dompurify';
return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dirty) }} />;
```

### 3. Broken Access Control (IDOR)

❌ **Bad**: Trusting ID from request directly.
✅ **Good**: Check ownership relative to `currentUser.id`.

```javascript
if (record.ownerId !== currentUser.id) throw new ForbiddenError();
```

## 📜 Checklist

- [ ] Input Validation (Zod/Joi)
- [ ] Output Encoding
- [ ] Authentication (JWT/Session)
- [ ] Authorization (RBAC/ABAC)
