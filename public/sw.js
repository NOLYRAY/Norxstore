// Service Worker Norxstore — Push Notification & Offline Support
const CACHE_NAME = 'norxstore-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Event Push Notification (Dipicu server saat web/browser sedang ditutup)
self.addEventListener('push', (event) => {
  let payload = {
    title: '🎉 Pesanan Selesai - Norxstore',
    body: 'Layanan yang Anda pesan telah selesai dikerjakan oleh admin!',
    url: '/',
    tag: 'order-status'
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    // Pola getar HP: getar 300ms, jeda 100ms, getar 300ms, jeda 100ms, getar 400ms
    vibrate: [300, 100, 300, 100, 400],
    sound: '/notification.wav',
    tag: payload.tag || 'norxstore-notif',
    renotify: true,
    requireInteraction: true,
    data: {
      url: payload.url || '/'
    },
    actions: [
      { action: 'open_cart', title: '🛒 Lihat Pesanan' },
      { action: 'close', title: 'Tutup' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Event saat notifikasi di status bar / layar kunci HP diklik
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.postMessage({ action: 'openCart' });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
