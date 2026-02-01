// Form Defaults
export const FORM_DEFAULTS = {
  PACKAGE_NAME: '',
  SERVICE_ACCOUNT_EMAIL: '',
  JSON_KEY_CONTENT: '',
  WEBHOOK_URL: '',
  SIGNING_SECRET: '',
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  PACKAGE_NAME: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  HTTPS_URL: /^https:\/\/.+/,
} as const;
