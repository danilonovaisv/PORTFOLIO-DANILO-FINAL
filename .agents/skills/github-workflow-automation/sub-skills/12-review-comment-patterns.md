# 1.2 Review Comment Patterns

````markdown
# AI Review Structure

## 📋 Summary

Brief description of what this PR does.

## ✅ What looks good

- Well-structured code
- Good test coverage
- Clear naming conventions

## ⚠️ Potential Issues

1. **Line 42**: Possible null pointer exception
   ```javascript
   // Current
   user.profile.name;
   // Suggested
   user?.profile?.name ?? 'Unknown';
   ```
````

2. **Line 78**: Consider error handling
   ```javascript
   // Add try-catch or .catch()
   ```

## 💡 Suggestions

- Consider extracting the validation logic into a separate function
- Add JSDoc comments for public methods

## 🔒 Security Notes

- No sensitive data exposure detected
- API key handling looks correct

```

```
