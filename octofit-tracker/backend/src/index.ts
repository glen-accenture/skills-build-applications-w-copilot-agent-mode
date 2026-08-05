import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

// Build API base URL: prefer Codespaces URL when available, otherwise localhost
const codespace = process.env.CODESPACE_NAME;
const apiBaseUrl = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'OctoFit Tracker API', version: '0.1.0', baseUrl: apiBaseUrl });
});

// Simple test endpoints for verification
app.get('/api/users', (req, res) => {
  const users = [
    { id: 'u1', name: 'Alice', email: 'alice@example.com' },
    { id: 'u2', name: 'Bob', email: 'bob@example.com' }
  ];
  res.json(users);
});

app.get('/api/activities', (req, res) => {
  const activities = [
    { id: 'a1', userId: 'u1', type: 'run', distanceKm: 5, durationMin: 30 },
    { id: 'a2', userId: 'u2', type: 'bike', distanceKm: 20, durationMin: 60 }
  ];
  res.json(activities);
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
