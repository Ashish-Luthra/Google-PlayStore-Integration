import { describe, it, expect } from 'vitest';
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

    it('should return success with valid data (mock mode)', async () => {
      const result = await testConnection(mockFormData);
      expect(result.success).toBe(true);
      expect(result.message).toContain('Connection successful');
    });
  });

  describe('sendTestWebhook', () => {
    it('should return error for non-https URL', async () => {
      const result = await sendTestWebhook('http://example.com/webhook');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Webhook URL must use HTTPS');
    });

    it('should return success with valid https URL (mock mode)', async () => {
      const result = await sendTestWebhook('https://example.com/webhook');
      expect(result.success).toBe(true);
      expect(result.message).toContain('webhook');
    });
  });

  describe('saveConfiguration', () => {
    it('should return success with form data (mock mode)', async () => {
      const result = await saveConfiguration(mockFormData);
      expect(result.success).toBe(true);
      expect(result.message).toContain('saved');
    });
  });

  describe('connectApp', () => {
    it('should return success with form data (mock mode)', async () => {
      const result = await connectApp(mockFormData);
      expect(result.success).toBe(true);
      expect(result.message).toContain('connected');
    });
  });
});
