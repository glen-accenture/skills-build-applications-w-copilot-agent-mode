import app from './server';

const port = Number(process.env.PORT) || 8000;

// Build API base URL: prefer Codespaces URL when available, otherwise localhost
const codespace = process.env.CODESPACE_NAME;
const apiBaseUrl = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/info', (req, res) => {
  res.json({ name: 'OctoFit Tracker API', version: '0.1.0', baseUrl: apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
