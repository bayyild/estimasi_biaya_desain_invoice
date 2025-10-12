const CACHE_NAME = "desain-cache-v1";
const BASE_PATH = "/estimasi_biaya_desain_invoice/";

const FILES_TO_CACHE = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "manifest.json",
  BASE_PATH + "icons/icon-192.png",
  BASE_PATH + "icons/icon-512.png"
];

self.addEventListener("install", event => {
  console.log("SW installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("SW activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (
            event.request.mode === "navigate" ||
            event.request.headers.get("accept")?.includes("text/html")
          ) {
            return caches.match(BASE_PATH + "index.html");
          }
        })
      );
    })
  );
});
