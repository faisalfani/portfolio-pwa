const CACHE_NAME = "myportfolio-v4";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/script.js",
  "/img/1_RoXcbaF9lIqwpMjiXg54Vw.png",
  "/img/business-and-finance.svg",
  "/img/calendar.svg",
  "/img/code.svg",
  "/img/Icon-72.png",
  "/img/Icon-96.png",
  "/img/Icon-144.png",
  "/img/Icon-192.png",
  "/img/Icon-512.png",
  "/pages/home.html",
  "/pages/works.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/img/UI1.png",
  "/img/UI2.png",
  "/img/UI3.jpg",
  "/manifest.json",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("ServiceWorker : cache " + cacheName);
            return caches.delete(cacheName);
          }
        })  
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        console.log("ServiceWorker : Gunakan dari Cache");
        return response;
      }
      console.log(
        "Service Worker : Memuat aset dari Server :",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});
