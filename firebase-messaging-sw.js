// Service Worker for Firebase Cloud Messaging (background notifications).
// Must live at the site root so the browser can register it for the entire scope.
//
// Loaded outside the page, runs in its own context — uses importScripts.

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBcppiaXQJ9lrbFQNAZjdKBlixmYngoHZ8",
  authDomain: "ergani44.firebaseapp.com",
  projectId: "ergani44",
  storageBucket: "ergani44.firebasestorage.app",
  messagingSenderId: "454602675440",
  appId: "1:454602675440:web:123d3d079687e112eede35"
});

const messaging = firebase.messaging();

// Background messages: show notification using SW
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || "Εργάνη QR";
  const options = {
    body:  (payload.notification && payload.notification.body)  || "",
    icon:  "/ergani-qr/icons/icon-192.png",
    badge: "/ergani-qr/icons/icon-192.png",
    data:  payload.data || {},
  };
  return self.registration.showNotification(title, options);
});

// Tap on the notification → focus or open the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const clientsArr = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clientsArr) {
      if (client.url.includes("siklas44.github.io/ergani-qr")) {
        return client.focus();
      }
    }
    return clients.openWindow("https://siklas44.github.io/ergani-qr/");
  })());
});
