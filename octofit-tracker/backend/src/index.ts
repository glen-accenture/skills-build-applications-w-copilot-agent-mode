import app, { apiBaseUrl } from './server';

const port = Number(process.env.PORT) || 8000;

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
