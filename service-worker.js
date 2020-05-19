const CACHE_NAME = "firstpwa-v7";
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/css/custom.css',
	'/detail.html',
	'/fav.html',
	'/navigasi.html',
	'/matches.html',
	'/push.json',
	'/js/materialize.min.js',
	'/js/api.js',
	'/js/fav.js',
	'/js/idb.js',
	'/js/DB.js',
	'/js/nav.js',
	'/js/materialize.min.js',
	'/manifest.json',
	'/image/football-512.png',
	'/image/football-192.png',
	'/image/football-144.png',
	'/image/football-96.png',
	'/image/na.png'
];

self.addEventListener("install", function(event) {
	event.waitUntil(
	  caches.open(CACHE_NAME).then(function(cache) {
		return cache.addAll(urlsToCache);
	  })
	);
  });
  
  self.addEventListener("fetch", function(event) {
	var base_url = "https://api.football-data.org/v2/";
  
	if (event.request.url.indexOf(base_url) > -1) {
	  event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
		  return fetch(event.request).then(function(response) {
			cache.put(event.request.url, response.clone());
			return response;
		  })
		})
	  );
	} else {
	  event.respondWith(
		caches.match(event.request, { ignoreSearch: true }).then(function(response) {
		  return response || fetch (event.request);
		})
	  )
	}
  });
  
  self.addEventListener("activate", function(event) {
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
		return Promise.all(
		  cacheNames.map(function(cacheName) {
			if (cacheName != CACHE_NAME) {
			  console.log("ServiceWorker: cache " + cacheName + " dihapus");
			  return caches.delete(cacheName);
			}
		  })
		);
	  })
	);
  });
  
  self.addEventListener('push', function(event) {
	var body;
	if (event.data) {
	  body = event.data.text();
	} else {
	  body = 'Push message no payload';
	}
	var options = {
	  body: body,
	  icon: 'image/football-144.png',
	  vibrate: [100, 50, 100],
	  data: {
		dateOfArrival: Date.now(),
		primaryKey: 1
	  }
	};
	event.waitUntil(
	  self.registration.showNotification('Push Notification', options)
	);
  });

