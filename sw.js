// Farm R&A moved into the R&A app. Clear this address's old offline copies and step aside so the redirect loads.
// (Journal records saved on the phone are kept; the R&A app's Farm picks them up.)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys(); await Promise.all(keys.filter((k) => k.startsWith('farm-ra-') || k.startsWith('farm-journal')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const all = await self.clients.matchAll({ type: 'window' }); all.forEach((c) => c.navigate(c.url));
  })());
});
