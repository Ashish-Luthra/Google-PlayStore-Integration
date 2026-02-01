export interface GooglePlayFormData {
  packageName: string;
  serviceAccountEmail: string;
  jsonKeyContent: string;
  webhookUrl: string;
  signingSecret: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export type ConnectionStatus = 'idle' | 'success' | 'error';

export interface LoadingStates {
  isTestingConnection: boolean;
  isSaving: boolean;
  isSendingTest: boolean;
  isConnecting: boolean;
}

export interface GooglePlayIntegrationState extends LoadingStates {
  connectionStatus: ConnectionStatus;
  selectedFile: File | null;
}
