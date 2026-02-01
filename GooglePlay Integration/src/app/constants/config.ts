// UI Layout Constants (per Project Standards)
export const UI_SPECS = {
  FRAME_WIDTH: 1440,
  LEFT_NAV_EXPANDED: 240,
  LEFT_NAV_COLLAPSED: 80,
  PAGE_GUTTER: 24,
  PAGE_PADDING_VERTICAL: 32,
  CONTENT_MAX_WIDTH: 1120,
} as const;

// API Configuration - uses environment variables (per Project Standards)
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  ENDPOINTS: {
    TEST_CONNECTION: '/api/google-play/test-connection',
    SAVE_CONFIG: '/api/google-play/config',
    SEND_TEST_WEBHOOK: '/api/google-play/webhook/test',
    CONNECT_APP: '/api/google-play/connect',
  },
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
} as const;

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

// External Links
export const EXTERNAL_LINKS = {
  DOCUMENTATION: 'https://developer.android.com/google/play/billing',
} as const;
