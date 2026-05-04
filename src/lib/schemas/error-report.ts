import { z } from 'zod';

export const ErrorReportSchema = z.object({
  message: z.string().max(1000).optional().default('Unknown error').catch('Unknown error'),
  stack: z.string().optional(),
  component: z.string().max(255).optional(),
  url: z.string().url().optional().or(z.string().max(255).optional()),
  userAgent: z.string().max(500).optional(),
  timestamp: z.string().datetime().optional().default(() => new Date().toISOString()),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type ErrorReport = z.infer<typeof ErrorReportSchema>;
