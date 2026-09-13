const APP_VERSION = new URL(self.location.href).searchParams.get('v') || `${Date.now()}`;
const CACHE_NAME = `music-share-${APP_VERSION}`;
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './config.js',
  './manifest.webmanifest',
  './favicon.svg',
  './assets/videos/Blue.mp4',
  './assets/videos/I%20fall%20into%20you.mp4',
  './assets/videos/We%20go%20up.MP4',
];

const NETWORK_FIRST_PATHS = ['/', '/index.html', '/styles.css', '/app.js', '/config.js', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(APP_SHELL.map((url) =>
        cache.add(new Request(url, { cache: 'reload' })).catch((error) => {
          console.warn(`App shell resource was not cached: ${url}`, error);
        })
      )))

  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('music-share-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    event.ports[0]?.postMessage({ cacheName: CACHE_NAME });
    return;
  }

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const isAppShellRequest =
    request.mode === 'navigate' ||
    NETWORK_FIRST_PATHS.includes(url.pathname) ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'manifest';

  if (isAppShellRequest) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => cached || Response.error());
    })
  );
});
