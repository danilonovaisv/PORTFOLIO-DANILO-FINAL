# CSS Sanitization Guidelines

## Problem
Invalid CSS classes like `bg-[.4!]` and `bg-[f7...]` are generated when dynamic content from databases or user inputs is used directly in Tailwind class names without proper validation.

## Solution
Always sanitize dynamic values before using them in Tailwind classes:

```typescript
import { sanitizeTailwindValue } from '@/lib/utils';

// ✅ Good: Sanitize dynamic values
const sanitizedColor = sanitizeTailwindValue(dynamicColor);
const className = `bg-[${sanitizedColor}]`;

// ❌ Bad: Direct usage without sanitization
const className = `bg-[${dynamicColor}]`;
```

## Prevention
1. Validate all dynamic content coming from:
   - Database queries
   - User inputs
   - External APIs
   - CMS content

2. Use the `sanitizeTailwindValue` utility function to clean values before using them in class names.

3. Implement server-side validation for content that will be used in class names.