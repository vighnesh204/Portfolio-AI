import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }
  if (env.GEMINI_MODEL) {
    process.env.GEMINI_MODEL = env.GEMINI_MODEL;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const parsedUrl = req.url ? req.url.split('?')[0] : '';
            if (parsedUrl === '/api/ask-vighnesh') {
              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  req.body = bodyStr ? JSON.parse(bodyStr) : {};
                } catch {
                  req.body = {};
                }
                res.status = function (code) {
                  res.statusCode = code;
                  return this;
                };
                res.json = function (obj) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(obj));
                  return this;
                };
                try {
                  const { default: handler } = await import('./api/ask-vighnesh.js');
                  await handler(req, res);
                } catch (err) {
                  console.error('Local API Error:', err);
                  res.status(500).json({ error: 'Internal server error' });
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
  };
});