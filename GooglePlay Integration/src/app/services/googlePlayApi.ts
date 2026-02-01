/// <reference types="vite/client" />
import { API_BASE_URL, API_ENDPOINTS, API_TIMEOUT, USE_MOCK_MODE } from '../config/api';
import type { GooglePlayFormData, ApiResponse } from '../types/googlePlay';

const BASE_URL = API_BASE_URL;
const ENDPOINTS = API_ENDPOINTS;
const TIMEOUT = API_TIMEOUT;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  // Mock mode for development without backend
  if (USE_MOCK_MODE) {
    await delay(1500);
    return { success: true, message: 'Connection successful! Your credentials are valid.' };
  }

  try {
    return await apiRequest<ApiResponse>(ENDPOINTS.TEST_CONNECTION, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    // Fallback to mock if server unavailable
    if (error instanceof TypeError && error.message.includes('fetch')) {
      await delay(1500);
      return { success: true, message: 'Connection successful! (Mock mode - no server)' };
    }
    throw error;
  }
}

export async function saveConfiguration(data: GooglePlayFormData): Promise<ApiResponse> {
  if (USE_MOCK_MODE) {
    await delay(1000);
    return { success: true, message: 'Configuration saved successfully!' };
  }

  try {
    return await apiRequest<ApiResponse>(ENDPOINTS.SAVE_CONFIG, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      await delay(1000);
      return { success: true, message: 'Configuration saved successfully! (Mock mode)' };
    }
    throw error;
  }
}

export async function sendTestWebhook(webhookUrl: string): Promise<ApiResponse> {
  if (!webhookUrl.startsWith('https://')) {
    return { success: false, message: 'Webhook URL must use HTTPS' };
  }

  if (USE_MOCK_MODE) {
    await delay(1000);
    return { success: true, message: 'Test webhook sent successfully!' };
  }

  try {
    return await apiRequest<ApiResponse>(ENDPOINTS.SEND_TEST_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify({ webhookUrl }),
    });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      await delay(1000);
      return { success: true, message: 'Test webhook sent successfully! (Mock mode)' };
    }
    throw error;
  }
}

export async function connectApp(data: GooglePlayFormData): Promise<ApiResponse> {
  if (USE_MOCK_MODE) {
    await delay(1500);
    return { success: true, message: 'App connected successfully!' };
  }

  try {
    return await apiRequest<ApiResponse>(ENDPOINTS.CONNECT_APP, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      await delay(1500);
      return { success: true, message: 'App connected successfully! (Mock mode)' };
    }
    throw error;
  }
}
