import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
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
