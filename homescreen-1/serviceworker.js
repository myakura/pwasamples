const CACHE_VERSION = 1;
const CACHE_NAME = `my-cache-v${CACHE_VERSION}`;

const urlToCache = [
  // just need to put something in the cache
  `/homescreen-1/images/icon-192.png`,
]


self.oninstall = (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log(`Opened Cache: ${CACHE_NAME}`);
      console.log(`adding URLs to the Cache:`, urlToCache);
      return cache.addAll(urlToCache);
    }).catch(error => {
      console.error(`Something's wrong with the Sache:`);
      console.dir(error);
    })
  );
}


self.onfetch = (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // files in the cache storage
      // (currently files in the urlToCache only)
      if (response) {
        return response;
      }
      // just fetch and return
      // don't put it in the cache
      else {
        return fetch(event.request);
      }
    }).catch(error => {
      console.error(`Something's wrong with responding to the fetch:`);
      console.dir(error);
      console.log(`URL: ${event.request.url}`);
    })
  );
}
