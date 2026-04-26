# STATE — Πού είμαστε

> Τελευταία ενημέρωση: 2026-04-26

## ✅ Έτοιμα

### Βάση & Deploy
- [x] `index.html` single-page app, deployed στο GitHub Pages
- [x] Live URL: https://siklas44.github.io/ergani-qr/
- [x] Repo public, branch flow: `claude/build-ergani-app-grrhF` → `main` (ff)
- [x] CLAUDE.md + STATE.md (project docs)

### Φάση 1A — Authentication
- [x] Firebase Auth (email + password)
- [x] Login screen με signup toggle + forgot password
- [x] Bootstrap admin: `siklas44@gmail.com` → role=admin αυτόματα
- [x] **Άλλαξε:** Δεν αυτο-δημιουργεί πια pending docs. Όποιος δεν έχει user doc και δεν είναι bootstrap → sign-out + μήνυμα «Λογαριασμός δεν είναι ενεργός»

### Φάση 1B — Multi-store admin
- [x] Tabs: 🏪 Καταστήματα / 👷 Εργαζόμενοι / 👥 Χρήστες (admin only)
- [x] Stores CRUD (cascade delete εργαζομένων)
- [x] Employees CRUD ανά store
- [x] Tap κατάστημα → πάει στους εργαζομένους
- [x] **UI hide:** Όταν δεν έχει επιλεγεί κατάστημα → κρύβονται search + κουμπιά
- [x] Camera QR scanner (jsQR + native BarcodeDetector fallback)
- [x] QR display fullscreen (qrcode-generator, σωστό UTF-8)
- [x] Hidden manual add + bulk import (τα κρύψαμε — μόνο scanner ορατό)
- [x] **Local libs:** `lib/jsQR.js` + `lib/qrcode-gen.js` (no external CDN)

### Φάση 2A — User management (admin)
- [x] Tab «👥 Χρήστες» μόνο για admin
- [x] Add/edit/delete users με ρόλο + καταστήματα + δικαιώματα (checkboxes)
- [x] Secondary Firebase app για να μπορεί ο admin να δημιουργεί χρήστες χωρίς να βγαίνει
- [x] Auto-generated password + 🎲 button
- [x] **Recovery flow:** Αν admin ξανα-δημιουργήσει email που υπάρχει στο Auth → fallback σε sign-in + reset link
- [x] **Inline error display** στο user modal (όχι μόνο toast — δεν χάνεται)

### Φάση 2B — Manager/Cashier views
- [x] Non-admin: μόνο tab Εργαζόμενοι
- [x] Filter στα assigned καταστήματα
- [x] Auto-select αν 1 κατάστημα
- [x] Permission gating: εμφάνιση/απόκρυψη κουμπιών (📷, ✏️, 🗑️, 📱) με βάση δικαιώματα

### Φάση 3 — Employee features
- [x] Detail view (tap κάρτα): avatar, όνομα, ωράριο, κωδικός
- [x] **Δομημένο εβδομαδιαίο πρόγραμμα** (Δευ-Κυρ + ώρες + Ρεπό checkbox)
- [x] QR display μόνο μέσω 📱 button (ξεχωριστό από detail)
- [x] Backwards-compat για παλιά string schedule

### Firestore Security Rules
- [x] `firestore.rules` deployed (admin/manager/cashier path)
- [x] Helpers: hasStore, hasPermission, isAdmin, isBootstrapAdmin
- [x] User must republish στο Firebase Console όποτε αλλάζουν

## 📋 Επόμενα candidates (Φάση 3+)
- [ ] **Καθολικό weekly schedule dashboard** (όλοι οι εργαζόμενοι σε ένα grid)
- [ ] Templates ωραρίων (πρωί/απόγευμα/πλήρες)
- [ ] Μαζική εφαρμογή ωραρίου (σε πολλούς ταυτόχρονα)
- [ ] 🟢/⚪ IN/OUT indicator + ιστορικό σαρώσεων
- [ ] 💾 Export QR ως PNG για εκτύπωση
- [ ] 🌐 PWA / offline mode
- [ ] 📊 Στατιστικά (πόσοι σκαναρίστηκαν σήμερα)
- [ ] Επανα-ενεργοποίηση μαζικής εισαγωγής CSV (αν χρειαστεί)

## 🔑 Decisions Log
- **Auth**: Email + Password (όχι Google login)
- **Bootstrap admin**: hardcoded `siklas44@gmail.com`
- **Permissions**: configurable από admin (όχι hardcoded ανά ρόλο)
- **Multi-store**: stores top-level collection, employees subcollection
- **No pending state**: όποιος δεν έχει user doc και δεν είναι bootstrap → sign-out
- **Schedule**: δομημένο object `{ mon: {from,to|off}, ... }` ανά εργαζόμενο
- **QR libraries**: vendored locally (lib/) — user network δεν έφτανε σε jsdelivr/unpkg
- **QR generator**: qrcode-generator (Kazuhiko Arase) λόγω UTF-8 bug στο qrcodejs
- **Old `employees` flat collection**: orphan junk — αγνοείται

## ⚠️ User-side actions
- [x] Firebase Console → Authentication → Email/Password → Enable
- [x] Firebase Console → Firestore → Rules → Publish (νεότερη έκδοση)
- [x] GitHub Pages enabled στο main / root

## 🛠 Σημειώσεις για επόμενο session
Αν χαθεί το context, διάβασε:
1. `CLAUDE.md` για οδηγίες project
2. Αυτό το αρχείο για τρέχουσα κατάσταση
3. `index.html` για τον κώδικα (~2700 γραμμές)
4. `firestore.rules` για security rules
5. `lib/` για bundled libraries
6. Συνέχισε από τα «Επόμενα candidates»
