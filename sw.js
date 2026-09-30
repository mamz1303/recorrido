// Service worker mínimo: solo permite mostrar notificaciones en Android y en iPhone (app agregada a inicio).
// No guarda copias de la página, así los cambios en GitHub se ven siempre.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      for (const c of cs) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./#panel');
    })
  );
});
