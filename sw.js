const CACHE_NAME = 'agenda-obrigacoes-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// A página envia uma mensagem { type: 'notify', title, body, tag } para disparar uma notificação local
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'notify') {
    self.registration.showNotification(data.title || 'Agenda de Obrigações', {
      body: data.body || '',
      tag: data.tag,
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      vibrate: [100, 50, 100],
      renotify: !!data.tag,
      data: { url: './index.html' }
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./index.html');
    })
  );
});

// Verificação periódica em segundo plano (suportada apenas em Chrome/Android com o app instalado e uso frequente)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-obligations') {
    event.waitUntil(checkObligationsInBackground());
  }
});

async function checkObligationsInBackground() {
  // O service worker não tem acesso direto ao localStorage da página.
  // Pedimos a um cliente aberto que reavalie e dispare as notificações necessárias.
  const clientsArr = await self.clients.matchAll({ type: 'window' });
  if (clientsArr.length > 0) {
    clientsArr[0].postMessage({ type: 'check-now' });
  }
}
