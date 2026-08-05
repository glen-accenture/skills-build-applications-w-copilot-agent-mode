import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

// Codespaces-aware base URL (exported for use by the listener)
const codespace = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : `http://localhost:${process.env.PORT || 8000}`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'OctoFit Tracker API', version: '0.1.0', baseUrl: apiBaseUrl });
});

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

export default app;
