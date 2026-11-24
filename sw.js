// Farm R&A: offline support. The app shell is cached so it opens without a connection.
// Records and receipt photos are never cached here; the app keeps its own copy on the phone.
// Other apps on brass91.github.io share this cache storage, so only farm-ra-* caches are ever cleared.
const VERSION = 'farm-ra-1.2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './vendor/supabase-2.45.4.js', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => (k.startsWith('farm-ra-') && k !== VERSION) || k.startsWith('farm-journal')).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('supabase.co')) return; // data, sign-in, photos, live updates
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('./index.html', copy)); return res; }).catch(() => caches.match('./index.html')));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(VERSION).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  if (url.origin === self.location.origin) event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
