import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/download-zip', (req, res) => {
  res.download(path.join(__dirname, 'norxstore.zip'), 'norxstore.zip');
});

app.get('/download-html', (req, res) => {
  res.download(path.join(__dirname, 'index.html'), 'index.html');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
