import http from 'http';

const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const PORT = Number(requireEnv('MOCK_SERVER_PORT'));
const HOST = requireEnv('MOCK_SERVER_HOST');
const ENDPOINTS = {
  TEST_CONNECTION: requireEnv('MOCK_TEST_CONNECTION_PATH'),
  SAVE_CONFIG: requireEnv('MOCK_SAVE_CONFIG_PATH'),
  SEND_TEST_WEBHOOK: requireEnv('MOCK_SEND_TEST_WEBHOOK_PATH'),
  CONNECT_APP: requireEnv('MOCK_CONNECT_APP_PATH'),
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

async function handleRequest(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const path = url.pathname;

  // Parse body for POST requests
  let body = '';
  if (req.method === 'POST') {
    for await (const chunk of req) {
      body += chunk;
    }
  }

  const data = body ? JSON.parse(body) : {};

  // Route handlers
  const routes = {
    [ENDPOINTS.TEST_CONNECTION]: async () => {
      await delay(1500);

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

      return { success: true, message: 'Connection successful!' };
    },

    [ENDPOINTS.SAVE_CONFIG]: async () => {
      await delay(1000);
      return { success: true, message: 'Configuration saved successfully!' };
    },

    [ENDPOINTS.SEND_TEST_WEBHOOK]: async () => {
      await delay(1000);

      if (!data.webhookUrl?.startsWith('https://')) {
        return { success: false, message: 'Webhook URL must use HTTPS' };
      }

      return { success: true, message: 'Test event sent successfully!' };
    },

    [ENDPOINTS.CONNECT_APP]: async () => {
      await delay(1500);
      return { success: true, message: 'App connected successfully!' };
    },
  };

  const handler = routes[path];

  if (handler && req.method === 'POST') {
    try {
      const result = await handler();
      res.writeHead(200, corsHeaders);
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(500, corsHeaders);
      res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
    }
  } else {
    res.writeHead(404, corsHeaders);
    res.end(JSON.stringify({ success: false, message: 'Not found' }));
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Mock server running at http://${HOST}:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  POST ${ENDPOINTS.TEST_CONNECTION}`);
  console.log(`  POST ${ENDPOINTS.SAVE_CONFIG}`);
  console.log(`  POST ${ENDPOINTS.SEND_TEST_WEBHOOK}`);
  console.log(`  POST ${ENDPOINTS.CONNECT_APP}`);
});
