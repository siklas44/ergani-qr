// Cloud Functions for Εργάνη QR
//
// Scheduled function checks every 5 minutes for employee shifts that
// are about to start or end (±10 minutes window) and sends an FCM push
// notification to the users assigned to that store as recipients.
//
// Data model expected:
//   /stores/{storeId} { name, notifyUserIds: [uid] }
//   /stores/{storeId}/employees/{empId} { name, schedule: { mon:{from,to|off}, ... } }
//   /users/{uid} { fcmToken, notificationsEnabled, storeIds }

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger }     = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore }  = require("firebase-admin/firestore");
const { getMessaging }  = require("firebase-admin/messaging");

initializeApp();
const db  = getFirestore();
const fcm = getMessaging();

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; // JS getDay() index

// Window in minutes either side of the shift boundary that triggers a reminder.
const WINDOW_MIN = 10;

// Athens-local "now" parts (a basic implementation; assumes Europe/Athens TZ on the function)
function localParts(d) {
  return {
    weekday: DAY_KEYS[d.getDay()],
    hh: d.getHours(),
    mm: d.getMinutes(),
  };
}

function diffMinutes(targetH, targetM, nowH, nowM) {
  return (targetH * 60 + targetM) - (nowH * 60 + nowM);
}

async function sendPush(tokens, title, body, data) {
  if (!tokens || tokens.length === 0) return { success: 0, failure: 0 };
  const messages = tokens.map((t) => ({
    token: t,
    notification: { title, body },
    data: data || {},
    webpush: {
      notification: { icon: "/icons/icon-192.png", badge: "/icons/icon-192.png" },
    },
  }));
  const res = await fcm.sendEach(messages);
  return { success: res.successCount, failure: res.failureCount };
}

exports.scheduleReminders = onSchedule(
  {
    schedule: "every 5 minutes",
    timeZone: "Europe/Athens",
    region: "europe-west1",
    memory: "256MiB",
  },
  async () => {
    const now = new Date();
    const { weekday, hh, mm } = localParts(now);
    logger.info(`tick @ ${now.toISOString()} → weekday=${weekday} ${hh}:${mm}`);

    // 1) Load all stores that have at least one notify recipient
    const storesSnap = await db.collection("stores").get();
    let totalSent = 0;
    let totalScanned = 0;

    for (const storeDoc of storesSnap.docs) {
      const store = storeDoc.data();
      const recipients = Array.isArray(store.notifyUserIds) ? store.notifyUserIds : [];
      if (recipients.length === 0) continue;

      // 2) Resolve recipient FCM tokens (skip disabled / missing)
      const tokens = [];
      for (const uid of recipients) {
        const userSnap = await db.collection("users").doc(uid).get();
        if (!userSnap.exists) continue;
        const u = userSnap.data();
        if (u.notificationsEnabled === false) continue;
        if (!u.fcmToken) continue;
        tokens.push(u.fcmToken);
      }
      if (tokens.length === 0) continue;

      // 3) Walk this store's employees, check their schedule for today
      const empsSnap = await db.collection("stores").doc(storeDoc.id).collection("employees").get();
      for (const empDoc of empsSnap.docs) {
        totalScanned++;
        const emp = empDoc.data();
        const sched = emp.schedule && emp.schedule[weekday];
        if (!sched || sched.off || !sched.from || !sched.to) continue;

        const [fH, fM] = sched.from.split(":").map(Number);
        const [tH, tM] = sched.to.split(":").map(Number);

        const startDelta = diffMinutes(fH, fM, hh, mm);
        const endDelta   = diffMinutes(tH, tM, hh, mm);

        // Send when we're WINDOW_MIN minutes before start or before end
        // (cron runs every 5 min; we trigger if delta is in [WINDOW_MIN-2, WINDOW_MIN+2])
        const fires = (delta) => delta >= WINDOW_MIN - 2 && delta <= WINDOW_MIN + 2;

        if (fires(startDelta)) {
          const r = await sendPush(
            tokens,
            "⏰ Έναρξη σε " + WINDOW_MIN + " λεπτά",
            (emp.name || "Εργαζόμενος") + " ξεκινά στο " + (store.name || "κατάστημα") +
              " στις " + sched.from,
            { type: "shift-start", storeId: storeDoc.id, empId: empDoc.id }
          );
          totalSent += r.success;
          logger.info("start reminder " + (emp.name || "?") + " sent=" + r.success);
        }
        if (fires(endDelta)) {
          const r = await sendPush(
            tokens,
            "⏰ Λήξη σε " + WINDOW_MIN + " λεπτά",
            (emp.name || "Εργαζόμενος") + " τελειώνει στο " + (store.name || "κατάστημα") +
              " στις " + sched.to,
            { type: "shift-end", storeId: storeDoc.id, empId: empDoc.id }
          );
          totalSent += r.success;
          logger.info("end reminder " + (emp.name || "?") + " sent=" + r.success);
        }
      }
    }

    logger.info(`done — scanned ${totalScanned} employees, sent ${totalSent} pushes`);
    return null;
  }
);
