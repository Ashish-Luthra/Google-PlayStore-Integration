import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { testConnection, saveConfiguration, sendTestWebhook, connectApp } from './googlePlayApi';
import type { GooglePlayFormData } from '../types/googlePlay';

const mockFormData: GooglePlayFormData = {
  packageName: 'com.example.app',
  serviceAccountEmail: 'test@project.iam.gserviceaccount.com',
  jsonKeyContent: '{"type": "service_account"}',
  webhookUrl: 'https://example.com/webhook',
  signingSecret: 'secret123',
};

describe('googlePlayApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('testConnection', () => {
    it('should return error for invalid JSON key', async () => {
      const result = await testConnection({
        ...mockFormData,
        jsonKeyContent: 'invalid json',
      });
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid JSON key format');
    });

    it('should return error for missing package name', async () => {
      const result = await testConnection({
        ...mockFormData,
        packageName: '',
      });
      expect(result.success).toBe(false);
      expect(result.message).toBe('Missing required fields');
    });

    it('should return error for missing service account email', async () => {
      const result = await testConnection({
        ...mockFormData,
        serviceAccountEmail: '',
      });
      expect(result.success).toBe(false);
      expect(result.message).toBe('Missing required fields');
    });

    it('should call API with valid data', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Connected' }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const result = await testConnection(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/google-play/test-connection'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockFormData),
        })
      );
      expect(result.success).toBe(true);
    });
  });

  describe('sendTestWebhook', () => {
    it('should return error for non-https URL', async () => {
      const result = await sendTestWebhook('http://example.com/webhook');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Webhook URL must use HTTPS');
    });

    it('should call API with valid https URL', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Sent' }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const result = await sendTestWebhook('https://example.com/webhook');

      expect(mockFetch).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('saveConfiguration', () => {
    it('should call API with form data', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Saved' }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const result = await saveConfiguration(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/google-play/config'),
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(result.success).toBe(true);
    });
  });

  describe('connectApp', () => {
    it('should call API with form data', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Connected' }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const result = await connectApp(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/google-play/connect'),
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(result.success).toBe(true);
    });
  });
});
