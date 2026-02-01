import http from 'http';

const PORT = process.env.MOCK_SERVER_PORT || 3001;

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

  const url = new URL(req.url, `http://localhost:${PORT}`);
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
    '/api/google-play/test-connection': async () => {
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

    '/api/google-play/config': async () => {
      await delay(1000);
      return { success: true, message: 'Configuration saved successfully!' };
    },

    '/api/google-play/webhook/test': async () => {
      await delay(1000);

      if (!data.webhookUrl?.startsWith('https://')) {
        return { success: false, message: 'Webhook URL must use HTTPS' };
      }

      return { success: true, message: 'Test event sent successfully!' };
    },

    '/api/google-play/connect': async () => {
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
  console.log(`Mock server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/google-play/test-connection');
  console.log('  POST /api/google-play/config');
  console.log('  POST /api/google-play/webhook/test');
  console.log('  POST /api/google-play/connect');
});
