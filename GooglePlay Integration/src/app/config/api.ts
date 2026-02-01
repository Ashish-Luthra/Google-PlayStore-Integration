import { requireEnv } from './env';

export const API_BASE_URL = requireEnv('VITE_API_BASE_URL');
export const API_TIMEOUT = Number(requireEnv('VITE_API_TIMEOUT'));
export const USE_MOCK_MODE = requireEnv('VITE_USE_MOCK_MODE') === 'true';

export const API_ENDPOINTS = {
  TEST_CONNECTION: requireEnv('VITE_TEST_CONNECTION_PATH'),
  SAVE_CONFIG: requireEnv('VITE_SAVE_CONFIG_PATH'),
  SEND_TEST_WEBHOOK: requireEnv('VITE_SEND_TEST_WEBHOOK_PATH'),
  CONNECT_APP: requireEnv('VITE_CONNECT_APP_PATH'),
} as const;
