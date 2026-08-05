import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const codespaceUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : null;

const allowedOrigins = [
  `http://localhost:5173`,
  `http://127.0.0.1:5173`,
];
if (codespaceUrl) allowedOrigins.push(codespaceUrl);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl, servers, or same-origin requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy: origin not allowed'));
    },
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.get('/api/info', (req, res) => {
  const baseUrl = codespaceUrl || `http://localhost:${port}`;
  res.json({ name: 'OctoFit Tracker API', version: '0.1.0', baseUrl });
});

// Lightweight mock endpoints for verification
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
});

app.get('/api/activities', (req, res) => {
  res.json([
    { id: 1, userId: 1, type: 'run', durationMinutes: 30 },
    { id: 2, userId: 2, type: 'bike', durationMinutes: 45 },
  ]);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  if (codespaceUrl) console.log(`Codespaces URL: ${codespaceUrl}`);
  else console.log(`Local URL: http://localhost:${port}`);
});
