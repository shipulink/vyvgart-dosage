const CACHE_NAME = 'vyvgart-cache-v2';

self.addEventListener('install', (e) => {
  const base = self.registration.scope;
  const APP_SHELL = [
    base,
    base + 'index.html',
    base + 'manifest.webmanifest',
    base + 'icons/icon-192.png',
    base + 'icons/icon-512.png',
  ];
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
