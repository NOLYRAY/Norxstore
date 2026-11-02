import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import webpush from 'web-push';

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

// Load or generate VAPID keys
let vapid = {
  publicKey: 'BLffVdmZ4HwgMMKNL9w8vNY3uatXjCeraP4TiEtlHKQRrEE6D00Ff7yDvICWMfNZAmho0EjqaPBVOLbvNtETG8Y',
  privateKey: 'EcGmKricXU-QMgfcZ04XcfN682OZGm4wHqRKAFqq7j0'
};
try {
  const vPath = path.join(__dirname, 'vapid.json');
  if (fs.existsSync(vPath)) {
    vapid = JSON.parse(fs.readFileSync(vPath, 'utf8'));
  }
} catch (e) {
  console.error('Error reading vapid.json:', e);
}

webpush.setVapidDetails(
  'mailto:norxstore.support@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

// File persistence for push subscriptions
const SUBS_FILE = path.join(__dirname, 'push_subscriptions.json');
let subscriptions = [];
try {
  if (fs.existsSync(SUBS_FILE)) {
    subscriptions = JSON.parse(fs.readFileSync(SUBS_FILE, 'utf8'));
  }
} catch (e) {
  subscriptions = [];
}

function saveSubscriptions() {
  try {
    fs.writeFileSync(SUBS_FILE, JSON.stringify(subscriptions, null, 2));
  } catch (e) {
    console.error('Error saving subscriptions:', e);
  }
}

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

// Public key endpoint for front-end push registration
app.get('/api/push-public-key', (req, res) => {
  res.json({ publicKey: vapid.publicKey });
});

// Register a push subscription from client
app.post('/api/push-subscribe', (req, res) => {
  const { subscription, orderIds, deviceId } = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }

  const existingIdx = subscriptions.findIndex(s => s.subscription && s.subscription.endpoint === subscription.endpoint);
  const incomingIds = Array.isArray(orderIds) ? orderIds : [];
  
  if (existingIdx > -1) {
    const mergedIds = Array.from(new Set([...subscriptions[existingIdx].orderIds, ...incomingIds]));
    subscriptions[existingIdx].orderIds = mergedIds;
    subscriptions[existingIdx].updatedAt = Date.now();
  } else {
    subscriptions.push({
      subscription,
      orderIds: incomingIds,
      deviceId: deviceId || 'anonymous',
      createdAt: Date.now()
    });
  }

  if (subscriptions.length > 2000) subscriptions = subscriptions.slice(-2000);
  saveSubscriptions();

  res.json({ success: true, count: subscriptions.length });
});

// Trigger push notification from admin or backend
app.post('/api/send-order-push', async (req, res) => {
  const { orderId, status, estimate, itemName, title, body } = req.body;
  if (!orderId && !title) {
    return res.status(400).json({ error: 'Missing orderId or title' });
  }

  let notifTitle = title;
  let notifBody = body;

  if (!notifTitle) {
    if (status === 'done') {
      notifTitle = '🎉 Pesanan Selesai - Norxstore';
      notifBody = `Layanan "${itemName || 'Pesanan Anda'}" telah selesai dikerjakan! Silakan cek keranjang.`;
    } else if (status === 'processing') {
      notifTitle = '⚡ Pesanan Diproses - Norxstore';
      notifBody = `Layanan "${itemName || 'Pesanan Anda'}" sedang diproses.${estimate ? ' Estimasi: ' + estimate : ''}`;
    } else {
      notifTitle = '📦 Update Pesanan - Norxstore';
      notifBody = `Status pesanan Anda telah diperbarui: ${status}`;
    }
  }

  const payload = JSON.stringify({
    title: notifTitle,
    body: notifBody,
    url: '/',
    tag: 'order-' + (orderId || 'update')
  });

  const targets = subscriptions.filter(s => {
    if (!orderId) return true;
    return s.orderIds && s.orderIds.includes(orderId);
  });

  const staleEndpoints = new Set();
  let sentCount = 0;

  for (const target of targets) {
    try {
      await webpush.sendNotification(target.subscription, payload);
      sentCount++;
    } catch (err) {
      if (err.statusCode === 404 || err.statusCode === 410) {
        staleEndpoints.add(target.subscription.endpoint);
      } else {
        console.error('Push error for target:', err.message);
      }
    }
  }

  if (staleEndpoints.size > 0) {
    subscriptions = subscriptions.filter(s => !staleEndpoints.has(s.subscription.endpoint));
    saveSubscriptions();
  }

  res.json({ success: true, sent: sentCount, targetCount: targets.length });
});

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
