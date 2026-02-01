import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { GooglePlayFormData, ConnectionStatus } from '../types/googlePlay';
import { FORM_DEFAULTS, VALIDATION_PATTERNS } from '../constants/config';
import * as api from '../services/googlePlayApi';

export function useGooglePlayIntegration() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');

  const form = useForm<GooglePlayFormData>({
    defaultValues: {
      packageName: FORM_DEFAULTS.PACKAGE_NAME,
      serviceAccountEmail: FORM_DEFAULTS.SERVICE_ACCOUNT_EMAIL,
      jsonKeyContent: FORM_DEFAULTS.JSON_KEY_CONTENT,
      webhookUrl: FORM_DEFAULTS.WEBHOOK_URL,
      signingSecret: FORM_DEFAULTS.SIGNING_SECRET,
    },
  });

  const formData = form.watch();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast.error('Please select a valid JSON file');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        JSON.parse(content);
        form.setValue('jsonKeyContent', content);
        setSelectedFile(file);
        toast.success('JSON key file loaded successfully');
      } catch {
        toast.error('Invalid JSON file format');
        setSelectedFile(null);
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read file');
      setSelectedFile(null);
    };

    reader.readAsText(file);
  }, [form]);

  const handleTestConnection = useCallback(async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      const result = await api.testConnection(formData);

      if (result.success) {
        setConnectionStatus('success');
        toast.success(result.message);
      } else {
        setConnectionStatus('error');
        toast.error(result.message);
      }
    } catch (error) {
      setConnectionStatus('error');
      toast.error(error instanceof Error ? error.message : 'Connection test failed');
    } finally {
      setIsTestingConnection(false);
    }
  }, [formData]);

  const handleSaveConfiguration = useCallback(async () => {
    if (!formData.packageName || !formData.serviceAccountEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.jsonKeyContent) {
      toast.error('Please upload or paste the JSON key content');
      return;
    }

    setIsSaving(true);

    try {
      const result = await api.saveConfiguration(formData);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const handleSendTestEvent = useCallback(async () => {
    if (!formData.webhookUrl) {
      toast.error('Please enter a webhook URL');
      return;
    }

    setIsSendingTest(true);

    try {
      const result = await api.sendTestWebhook(formData.webhookUrl);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send test event');
    } finally {
      setIsSendingTest(false);
    }
  }, [formData.webhookUrl]);

  const handleConnectApp = useCallback(async () => {
    if (!formData.packageName || !formData.serviceAccountEmail || !formData.jsonKeyContent || !formData.webhookUrl) {
      toast.error('Please fill in all required fields before connecting');
      return;
    }

    setIsConnecting(true);

    try {
      const result = await api.connectApp(formData);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect app');
    } finally {
      setIsConnecting(false);
    }
  }, [formData]);

  return {
    form,
    formData,
    selectedFile,
    connectionStatus,
    loadingStates: {
      isTestingConnection,
      isSaving,
      isSendingTest,
      isConnecting,
    },
    validationPatterns: VALIDATION_PATTERNS,
    handlers: {
      handleFileSelect,
      handleTestConnection,
      handleSaveConfiguration,
      handleSendTestEvent,
      handleConnectApp,
    },
  };
}
