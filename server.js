import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import pushPublicKeyHandler from './api/push-public-key.js';
import pushSubscribeHandler from './api/push-subscribe.js';
import sendAdminOrderPushHandler from './api/send-admin-order-push.js';
import sendOrderPushHandler from './api/send-order-push.js';
import paymentConfigHandler from './api/payment-config.js';
import createPaymentHandler from './api/create-payment.js';
import paymentStatusHandler from './api/payment-status.js';
import paymentWebhookHandler from './api/payment-webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable Gzip/Deflate compression for all responses (reduces HTML/payloads by 85% for instant mobile load)
app.use(compression({
  threshold: 1024,
  level: 6
}));

app.use(express.json());

// Special headers for Service Worker and Manifest
app.get('/sw.js', (req, res) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(__dirname, 'sw.js'));
});

app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Static assets with smart caching: long cache for images/fonts/audio, fresh for HTML
app.use(express.static(__dirname, {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else if (/\.(jpg|jpeg|png|gif|svg|ico|webp|wav|mp3|woff2?|ttf)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  }
}));

// Shared Web Push endpoints (identical on localhost and Vercel Serverless)
app.all('/api/push-public-key', (req, res) => pushPublicKeyHandler(req, res));
app.all('/api/push-subscribe', (req, res) => pushSubscribeHandler(req, res));
app.all('/api/send-admin-order-push', (req, res) => sendAdminOrderPushHandler(req, res));
app.all('/api/send-order-push', (req, res) => sendOrderPushHandler(req, res));

// Shared Payment Gateway API endpoints (Xendit & Midtrans)
app.all('/api/payment-config', (req, res) => paymentConfigHandler(req, res));
app.all('/api/create-payment', (req, res) => createPaymentHandler(req, res));
app.all('/api/payment-status', (req, res) => paymentStatusHandler(req, res));
app.all('/api/payment-webhook', (req, res) => paymentWebhookHandler(req, res));

// WhatsApp Channel Info & Follower Count Resolver
app.get('/api/whatsapp-channel-info', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing url parameter' });
  }

  let cleanUrl = targetUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    const parsed = new URL(cleanUrl);
    if (!parsed.hostname.includes('whatsapp.com')) {
      return res.status(400).json({ success: false, error: 'URL harus berupa link saluran whatsapp.com yang valid' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const resp = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    clearTimeout(timeoutId);

    const html = await resp.text();

    let title = '';
    let desc = '';
    let followers = '';

    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                         html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
      const rawT = ogTitleMatch[1].replace(/\|.*$/,'').replace(/- WhatsApp$/i,'').trim();
      if (rawT && rawT !== 'WhatsApp Channel') title = rawT;
    }

    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    if (ogDescMatch && ogDescMatch[1]) {
      const rawD = ogDescMatch[1].trim();
      if (rawD && !rawD.includes('Follow this WhatsApp Channel')) desc = rawD;
    }

    const followerMatches = [
      /([0-9]+[0-9,.]*\s*(?:[KkMmBb]|rb|jt)?)\s*(?:pengikut|followers|subscribers)/i,
      /"followers_count":\s*([0-9]+)/i,
      /"subscriber_count":\s*([0-9]+)/i,
      /([0-9]+[0-9,.]*\s*[KkMm]?)\s*followers/i
    ];

    for (const rx of followerMatches) {
      const m = html.match(rx);
      if (m && m[1]) {
        followers = m[1].trim();
        break;
      }
    }

    if (!followers && desc) {
      const descMatch = desc.match(/([0-9]+[0-9,.]*\s*(?:[KkMmBb]|rb|jt)?)\s*(?:pengikut|followers)/i);
      if (descMatch && descMatch[1]) {
        followers = descMatch[1].trim();
      }
    }

    let formattedFollowers = null;
    if (followers) {
      formattedFollowers = (followers.toLowerCase().includes('pengikut') || followers.toLowerCase().includes('follower'))
        ? followers
        : `${followers} Pengikut`;
    }

    res.json({
      success: true,
      url: cleanUrl,
      title: title || null,
      desc: desc || null,
      followers: formattedFollowers
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'Tidak dapat mengambil info otomatis langsung dari WhatsApp. Silakan sesuaikan jumlah pengikut secara langsung.',
      followers: null
    });
  }
});

app.get('/download-zip', (req, res) => {
  res.download(path.join(__dirname, 'norxstore.zip'), 'norxstore.zip');
});

app.get('/download-html', (req, res) => {
  res.download(path.join(__dirname, 'index.html'), 'index.html');
});

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
