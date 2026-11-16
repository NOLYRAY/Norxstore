// Service Worker Norxstore — Auto-Update Webview + Push & Order Notification
const CACHE_NAME = 'norxstore-cache-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Network-First untuk halaman HTML agar APK PWABuilder otomatis memuat update web terbaru
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (!req || req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(new Request(req.url, { cache: 'no-store' }))
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  if (url.pathname === '/notification.wav' || url.pathname === '/icon-192.png' || url.pathname === '/icon-512.png') {
    event.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
  }
});

// Event Push Notification dari Server
self.addEventListener('push', (event) => {
  let payload = {
    title: '🛎️ Pesanan Baru / Update - NORXSTORE',
    body: 'Ada pembaruan pesanan terbaru di NORXSTORE!',
    url: '/',
    tag: 'norxstore-order'
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const isAdminNotif = String(payload.tag || '').startsWith('admin-');
  const options = {
    body: payload.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [350, 120, 350, 120, 500],
    sound: '/notification.wav',
    tag: payload.tag || 'norxstore-notif',
    renotify: true,
    requireInteraction: true,
    data: {
      url: payload.url || '/',
      targetAction: isAdminNotif ? 'openAdminOrders' : 'openCart',
      serviceType: payload.serviceType || ''
    },
    actions: isAdminNotif
      ? [
          { action: 'open_admin', title: '⚡ Buka Panel Admin' },
          { action: 'close', title: 'Tutup' }
        ]
      : [
          { action: 'open_cart', title: '🛒 Lihat Pesanan' },
          { action: 'close', title: 'Tutup' }
        ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Pesan langsung dari halaman Aplikasi Web (Realtime Firebase -> Android Tray Notification)
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.type !== 'APP_ORDER_NOTIFY') return;
  const options = {
    body: data.body || 'Ada pesanan masuk baru di NORXSTORE!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [350, 120, 350, 120, 500],
    sound: '/notification.wav',
    tag: data.tag || ('norxstore-app-' + Date.now()),
    renotify: true,
    requireInteraction: true,
    data: {
      url: '/',
      targetAction: data.targetAction || 'openAdminOrders',
      serviceType: data.serviceType || ''
    },
    actions: [
      { action: data.targetAction === 'openCart' ? 'open_cart' : 'open_admin', title: data.targetAction === 'openCart' ? '🛒 Lihat Pesanan' : '⚡ Proses di Admin' },
      { action: 'close', title: 'Tutup' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || '🛎️ Pesanan Baru - NORXSTORE', options)
  );
});

// Event saat notifikasi di status bar / layar kunci HP diklik
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  const data = event.notification.data || {};
  const actionType = (event.action === 'open_admin' || data.targetAction === 'openAdminOrders')
    ? 'openAdminOrders'
    : 'openCart';
  const targetUrl = data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.postMessage({ action: actionType, serviceType: data.serviceType || '' });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
