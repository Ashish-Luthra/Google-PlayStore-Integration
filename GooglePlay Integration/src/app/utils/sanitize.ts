/**
 * Input sanitization utilities for security
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent XSS
    .slice(0, 10000); // Limit length to prevent DoS
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  return email
    .trim()
    .toLowerCase()
    .slice(0, 254); // Max email length per RFC 5321
}

/**
 * Sanitize URL input
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';

  const trimmed = url.trim();

  // Only allow https URLs
  if (!trimmed.startsWith('https://')) {
    return '';
  }

  try {
    const parsed = new URL(trimmed);
    // Only allow https protocol
    if (parsed.protocol !== 'https:') {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Sanitize package name (Android format)
 */
export function sanitizePackageName(packageName: string): string {
  if (typeof packageName !== 'string') return '';

  return packageName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '') // Only allow valid package name chars
    .slice(0, 255);
}

/**
 * Validate and sanitize JSON string
 */
export function sanitizeJson(jsonString: string): { valid: boolean; sanitized: string } {
  if (typeof jsonString !== 'string') {
    return { valid: false, sanitized: '' };
  }

  const trimmed = jsonString.trim();

  try {
    // Parse and re-stringify to ensure valid JSON
    const parsed = JSON.parse(trimmed);
    return {
      valid: true,
      sanitized: JSON.stringify(parsed)
    };
  } catch {
    return { valid: false, sanitized: '' };
  }
}

/**
 * Escape HTML entities to prevent XSS
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
