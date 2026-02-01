import { describe, it, expect } from 'vitest';
import {
  sanitizeString,
  sanitizeEmail,
  sanitizeUrl,
  sanitizePackageName,
  sanitizeJson,
  escapeHtml,
} from './sanitize';

describe('sanitizeString', () => {
  it('should remove angle brackets', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
  });

  it('should trim whitespace', () => {
    expect(sanitizeString('  hello world  ')).toBe('hello world');
  });

  it('should handle non-string input', () => {
    expect(sanitizeString(null as unknown as string)).toBe('');
    expect(sanitizeString(undefined as unknown as string)).toBe('');
    expect(sanitizeString(123 as unknown as string)).toBe('');
  });

  it('should limit length to 10000 characters', () => {
    const longString = 'a'.repeat(20000);
    expect(sanitizeString(longString).length).toBe(10000);
  });
});

describe('sanitizeEmail', () => {
  it('should lowercase email', () => {
    expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
  });

  it('should trim whitespace', () => {
    expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
  });

  it('should limit length to 254 characters', () => {
    const longEmail = 'a'.repeat(300) + '@example.com';
    expect(sanitizeEmail(longEmail).length).toBe(254);
  });

  it('should handle non-string input', () => {
    expect(sanitizeEmail(null as unknown as string)).toBe('');
  });
});

describe('sanitizeUrl', () => {
  it('should accept valid https URLs', () => {
    expect(sanitizeUrl('https://example.com/path')).toBe('https://example.com/path');
  });

  it('should reject http URLs', () => {
    expect(sanitizeUrl('http://example.com')).toBe('');
  });

  it('should reject non-URL strings', () => {
    expect(sanitizeUrl('not a url')).toBe('');
  });

  it('should reject javascript: URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(sanitizeUrl(null as unknown as string)).toBe('');
  });
});

describe('sanitizePackageName', () => {
  it('should lowercase package name', () => {
    expect(sanitizePackageName('Com.Example.App')).toBe('com.example.app');
  });

  it('should remove invalid characters', () => {
    expect(sanitizePackageName('com.example.app-test!')).toBe('com.example.apptest');
  });

  it('should allow dots and underscores', () => {
    expect(sanitizePackageName('com.example.my_app')).toBe('com.example.my_app');
  });

  it('should handle non-string input', () => {
    expect(sanitizePackageName(null as unknown as string)).toBe('');
  });
});

describe('sanitizeJson', () => {
  it('should validate and return valid JSON', () => {
    const input = '{"key": "value"}';
    const result = sanitizeJson(input);
    expect(result.valid).toBe(true);
    expect(result.sanitized).toBe('{"key":"value"}');
  });

  it('should reject invalid JSON', () => {
    const result = sanitizeJson('not json');
    expect(result.valid).toBe(false);
    expect(result.sanitized).toBe('');
  });

  it('should handle non-string input', () => {
    const result = sanitizeJson(null as unknown as string);
    expect(result.valid).toBe(false);
    expect(result.sanitized).toBe('');
  });
});

describe('escapeHtml', () => {
  it('should escape HTML entities', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('should escape ampersands', () => {
    expect(escapeHtml('foo & bar')).toBe('foo &amp; bar');
  });

  it('should escape single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#39;s');
  });

  it('should handle non-string input', () => {
    expect(escapeHtml(null as unknown as string)).toBe('');
  });
});
