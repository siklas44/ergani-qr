# STATE — Πού είμαστε

> Τελευταία ενημέρωση: 2026-04-25

## ✅ Έτοιμα
- [x] Βασική εφαρμογή `index.html` (591 γραμμές)
  - Λίστα εργαζομένων με όνομα + QR code
  - Add / Delete / Search
  - Fullscreen QR display
  - Firestore sync (real-time)
- [x] Deployed στο GitHub Pages: https://siklas44.github.io/ergani-qr/
- [x] Repo είναι **public**
- [x] CLAUDE.md + STATE.md (αυτό το αρχείο)
- [x] **Φάση 1A — Authentication base:**
  - [x] Firebase Auth SDK ενσωματώθηκε
  - [x] Login screen (email + password) με signup toggle + forgot password
  - [x] Pending view για non-admin signups
  - [x] Bootstrap admin: siklas44@gmail.com → role=admin αυτόματα
  - [x] Auth state handler δημιουργεί /users/{uid} doc
  - [x] Firestore security rules (admin-only)
  - [x] Deployed στο main → live

## 🔄 Σε εξέλιξη
**Φάση 1B — Multi-store admin dashboard**
- [ ] Tabs UI: Καταστήματα / Εργαζόμενοι
- [ ] Stores CRUD
- [ ] Employees CRUD ανά store (μετάβαση από flat /employees σε /stores/{id}/employees)
- [ ] Migration των υπαρχόντων εργαζομένων (ή deletion αν είναι junk)

## ⏳ Αναμονή ενεργειών χρήστη
- [ ] Firebase Console → Authentication → Email/Password → **Enable**
- [ ] Firebase Console → Firestore → Rules → paste `firestore.rules` → Publish (ΟΧΙ ΑΚΟΜΑ — μόλις τελειώσει η Φάση 1B)
- [ ] Test login flow στο live URL

## 📋 Επόμενα (Φάση 2)
- [ ] User management UI (admin προσθέτει managers/cashiers)
- [ ] Permission checkboxes ανά χρήστη
- [ ] Manager view (διαχείριση δικού του store)
- [ ] Cashier view (μόνο QR display)
- [ ] Επέκταση Firestore rules για managers/cashiers

## 📋 Επόμενα (Φάση 3 — Features)
- [ ] 🟢/⚪ IN/OUT indicator + tracking
- [ ] ✏️ Edit εργαζομένου
- [ ] 📋 Ιστορικό σαρώσεων
- [ ] 💾 Export QR ως PNG
- [ ] 📥 Mαζική εισαγωγή CSV
- [ ] 🌐 PWA / offline mode

## 🔑 Decisions Log
- **Auth**: Email + Password (όχι Google login) — γιατί δεν θα έχουν όλοι Gmail
- **Bootstrap admin**: hardcoded `siklas44@gmail.com` → πρώτο signup του = admin
- **Permissions**: configurable από admin (όχι hardcoded ανά ρόλο)
- **Multi-store**: stores είναι top-level collection, employees είναι subcollection
- **First admin password**: ορίζεται από τον admin στο signup
- **Old `employees` collection**: orphan data — αγνοείται, καθαρισμός μετά manually

## ⚠️ Known Issues
- Η βάση είναι αυτή τη στιγμή **ΟΡΘΑΝΗ ΑΝΟΙΧΤΗ** (no auth, no rules) — ο καθένας με το URL μπορεί να γράψει. **Φάση 1 το κλείνει.**
- Υπάρχουν άγνωστα δεδομένα στο `employees` collection (από spam ή παλιά χρήση)

## 🛠 Σημειώσεις για επόμενο session
Αν χαθεί το context, διάβασε:
1. `CLAUDE.md` για οδηγίες project
2. Αυτό το αρχείο για τρέχουσα κατάσταση
3. `index.html` για τον κώδικα
4. Συνέχισε από το πρώτο unchecked item της τρέχουσας φάσης
