import { API_CONFIG } from '../constants/config';
import type { GooglePlayFormData, ApiResponse } from '../types/googlePlay';

const { BASE_URL, ENDPOINTS, TIMEOUT } = API_CONFIG;

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function testConnection(data: GooglePlayFormData): Promise<ApiResponse> {
  // Validate JSON key format client-side first
  if (data.jsonKeyContent) {
    try {
      JSON.parse(data.jsonKeyContent);
    } catch {
      return { success: false, message: 'Invalid JSON key format' };
    }
  }

  if (!data.packageName || !data.serviceAccountEmail) {
    return { success: false, message: 'Missing required fields' };
  }

  return apiRequest<ApiResponse>(ENDPOINTS.TEST_CONNECTION, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function saveConfiguration(data: GooglePlayFormData): Promise<ApiResponse> {
  return apiRequest<ApiResponse>(ENDPOINTS.SAVE_CONFIG, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function sendTestWebhook(webhookUrl: string): Promise<ApiResponse> {
  if (!webhookUrl.startsWith('https://')) {
    return { success: false, message: 'Webhook URL must use HTTPS' };
  }

  return apiRequest<ApiResponse>(ENDPOINTS.SEND_TEST_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({ webhookUrl }),
  });
}

export async function connectApp(data: GooglePlayFormData): Promise<ApiResponse> {
  return apiRequest<ApiResponse>(ENDPOINTS.CONNECT_APP, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
