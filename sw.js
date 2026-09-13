// Service worker mínimo — só existe para permitir "Adicionar à tela inicial"
// e abrir em tela cheia (sem barra do navegador) quando instalado.
const CACHE = 'galeria-ia-v1';
const CORE_ASSETS = ['./index.html', './css/style.css', './js/app.js', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
