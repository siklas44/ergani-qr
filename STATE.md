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

## 🔄 Σε εξέλιξη
**Φάση 1 — Authentication & Admin** (ξεκίνημα)
- [ ] Login screen (email + password)
- [ ] Bootstrap admin για `siklas44@gmail.com`
- [ ] Admin dashboard με tabs: Καταστήματα / Εργαζόμενοι
- [ ] Stores CRUD (add/edit/delete)
- [ ] Employees CRUD ανά store
- [ ] Firestore security rules (admin-only για Φάση 1)
- [ ] README.md με βήματα setup για χρήστη
- [ ] Merge → main → deploy

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
