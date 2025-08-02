const CACHE_NAME = 'bjl-cinematic-universe-v1';
// Die Dateien, die für die App-Shell wichtig sind.
const urlsToCache = [
  '/',
  '/index.html'
  // Wenn du separate CSS- oder JS-Dateien hättest, würden sie hier auch stehen.
];

// Installation: Cache öffnen und die App-Shell-Dateien hinzufügen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch-Anfragen abfangen: Zuerst im Cache suchen, dann im Netzwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Wenn die Anfrage im Cache gefunden wird, diese zurückgeben
        if (response) {
          return response;
        }
        // Ansonsten die Anfrage ans Netzwerk senden
        return fetch(event.request);
      })
  );
});

// Alte Caches löschen, wenn eine neue Version des Service Workers aktiv wird
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});