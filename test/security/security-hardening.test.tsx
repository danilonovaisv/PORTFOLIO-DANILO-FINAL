import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(),
  PutObjectCommand: jest.fn(),
  DeleteObjectCommand: jest.fn(),
  DeleteObjectsCommand: jest.fn(),
  CopyObjectCommand: jest.fn(),
  ListObjectsV2Command: jest.fn(),
  HeadBucketCommand: jest.fn(),
}));

import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';
import { getR2Config } from '@/lib/storage/r2';

describe('Security Hardening Test Suite', () => {
  it('HTMLVideoBlock sanitizes XSS vectors from inline snippets', () => {
    const maliciousHtml =
      '<img src="valid.jpg" onerror="alert(1)" /><svg onload="alert(2)"></svg><a href="javascript:alert(3)">evil</a>';
    const { container } = render(
      <HTMLVideoBlock html={maliciousHtml} frameless />
    );

    // onerror, onload and javascript: must be stripped
    expect(container.innerHTML).not.toContain('onerror');
    expect(container.innerHTML).not.toContain('onload');
    expect(container.innerHTML).not.toContain('javascript:');
    expect(container.innerHTML).toContain('src="valid.jpg"');
  });

  it('R2 client fails closed when account ID is missing', () => {
    const origAccountId = process.env.R2_ACCOUNT_ID;
    const origCfId = process.env.CLOUDFLARE_ACCOUNT_ID;
    delete process.env.R2_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_ACCOUNT_ID;

    try {
      const config = getR2Config();
      expect(config.accountId).toBe('');
    } finally {
      process.env.R2_ACCOUNT_ID = origAccountId;
      process.env.CLOUDFLARE_ACCOUNT_ID = origCfId;
    }
  });
});
