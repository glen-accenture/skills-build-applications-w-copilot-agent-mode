import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.get('/api/info', (req, res) => {
  res.json({ name: 'OctoFit Tracker API', version: '0.1.0' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});
