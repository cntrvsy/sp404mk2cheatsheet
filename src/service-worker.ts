/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { version } from '$app/env';
import { assets, immutable, prerendered } from '$app/manifest';

const CACHE = `sp404-cache-${version}`;
const ASSETS = [...immutable, ...assets, ...prerendered].map((item) => item.path);

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then(async (keys) => {
				for (const key of keys) {
					if (key !== CACHE) {
						await caches.delete(key);
					}
				}
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);

	// Only handle same-origin http/https requests
	if (url.origin !== self.location.origin) return;

	// For page navigation (HTML document requests): Network first, falling back to cache
	if (event.request.mode === 'navigate') {
		event.respondWith(
			(async () => {
				try {
					const networkResponse = await fetch(event.request);
					if (networkResponse && networkResponse.status === 200) {
						const cache = await caches.open(CACHE);
						cache.put(event.request, networkResponse.clone());
					}
					return networkResponse;
				} catch {
					const cachedResponse = await caches.match(event.request);
					if (cachedResponse) return cachedResponse;

					const fallback = await caches.match('/');
					if (fallback) return fallback;

					return new Response('Offline: Content unavailable', {
						status: 503,
						headers: { 'Content-Type': 'text/plain' }
					});
				}
			})()
		);
		return;
	}

	// For static assets (JS, CSS, images, JSON): Cache first, falling back to network
	event.respondWith(
		(async () => {
			const cachedResponse = await caches.match(event.request);
			if (cachedResponse) return cachedResponse;

			try {
				const networkResponse = await fetch(event.request);
				if (networkResponse && networkResponse.status === 200) {
					const cache = await caches.open(CACHE);
					cache.put(event.request, networkResponse.clone());
				}
				return networkResponse;
			} catch {
				return new Response('Asset unavailable offline', {
					status: 404,
					headers: { 'Content-Type': 'text/plain' }
				});
			}
		})()
	);
});
