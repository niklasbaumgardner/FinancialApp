"use strict";

const FILES_TO_CACHE = ["/", "/static/js/app.js", "/static/images/pig.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("finapp").then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
