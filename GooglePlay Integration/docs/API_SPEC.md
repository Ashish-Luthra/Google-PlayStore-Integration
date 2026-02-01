# Backend API Spec (Google Play)

## Overview
This UI expects backend endpoints for Google Play configuration and webhook testing.
All requests are JSON over HTTPS.

## POST {VITE_TEST_CONNECTION_PATH}
Validates Google Play credentials.

### Request
```
{
  "packageName": "com.example.app",
  "serviceAccountEmail": "service@project.iam.gserviceaccount.com",
  "jsonKeyContent": "{...}"
}
```

### Success Response
```
{
  "success": true,
  "message": "Connection successful!"
}
```

### Error Response (example)
```
{ "message": "Invalid JSON key format" }
```

## POST {VITE_SAVE_CONFIG_PATH}
Saves Google Play configuration.

### Request
```
{
  "packageName": "com.example.app",
  "serviceAccountEmail": "service@project.iam.gserviceaccount.com",
  "jsonKeyContent": "{...}",
  "webhookUrl": "https://example.com/webhooks/google-play",
  "signingSecret": "optional"
}
```

### Success Response
```
{
  "success": true,
  "message": "Configuration saved successfully!"
}
```

## POST {VITE_SEND_TEST_WEBHOOK_PATH}
Sends a test webhook to the configured URL.

### Request
```
{
  "webhookUrl": "https://example.com/webhooks/google-play"
}
```

### Success Response
```
{
  "success": true,
  "message": "Test webhook sent successfully!"
}
```

## POST {VITE_CONNECT_APP_PATH}
Connects the app for ongoing data ingestion.

### Request
```
{
  "packageName": "com.example.app",
  "serviceAccountEmail": "service@project.iam.gserviceaccount.com",
  "jsonKeyContent": "{...}",
  "webhookUrl": "https://example.com/webhooks/google-play",
  "signingSecret": "optional"
}
```

### Success Response
```
{
  "success": true,
  "message": "App connected successfully!"
}
```

## Local Mock Server
- Start: `npm run mock:server`
- Required env vars:
  - `MOCK_SERVER_PORT`
  - `MOCK_SERVER_HOST`
  - `MOCK_TEST_CONNECTION_PATH`
  - `MOCK_SAVE_CONFIG_PATH`
  - `MOCK_SEND_TEST_WEBHOOK_PATH`
  - `MOCK_CONNECT_APP_PATH`
- UI config uses:
  - `VITE_API_BASE_URL`
  - `VITE_API_TIMEOUT`
  - `VITE_USE_MOCK_MODE`
  - `VITE_TEST_CONNECTION_PATH`
  - `VITE_SAVE_CONFIG_PATH`
  - `VITE_SEND_TEST_WEBHOOK_PATH`
  - `VITE_CONNECT_APP_PATH`
  - `VITE_DOCUMENTATION_URL`
