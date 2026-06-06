# STATE — Πού είμαστε

> Τελευταία ενημέρωση: 2026-06-06

## 🆕 Πρόσφατο (2026-06-06)
- Fix race στο sorting εργαζομένων: αν το frozen-order cache είχε
  παγώσει με κενή λίστα πριν φτάσει το Firestore snapshot, τώρα γίνεται
  πλήρης αλφαβητική + ticked-today ταξινόμηση μόλις έρθουν τα δεδομένα.
  Διορθώνει hard refresh, αλλαγή store, initial auto-select.


- Soft-delete εργαζομένων (αρχείο) με `archived: true` + `archivedAt`
  αντί για διαγραφή του document.
- Νέο per-store toggle «📦 Αρχείο» στο tab Εργαζόμενοι — λίστα
  αρχειοθετημένων με «↩️ Επαναφορά».
- Duplicate-prevention στο σκανάρισμα: αν υπάρχει ενεργός με ίδιο `code`
  → skip. Αν υπάρχει στο αρχείο → confirm για επαναφορά.
- `firestore.rules` ενημερώθηκαν: chairs με `deleteEmployees` permission
  μπορούν να κάνουν archive/restore (μόνο πεδία `archived`/`archivedAt`).
  **User action**: republish rules στο Firebase Console.

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

### Φάση 3 — Employee features + tracking
- [x] Detail view (tap κάρτα): avatar, όνομα, ωράριο, κωδικός
- [x] **Δομημένο εβδομαδιαίο πρόγραμμα** (Δευ-Κυρ + ώρες + Ρεπό checkbox)
- [x] QR display μόνο μέσω 📱 button (ξεχωριστό από detail)
- [x] Backwards-compat για παλιά string schedule
- [x] **7 weekly tick boxes** ανά εργαζόμενο (κάτω από κάθε γραμμή)
- [x] Tri-state ticks: empty → ✓ μπλε → ✗ κόκκινο → empty
- [x] Auto-reset κάθε Δευτέρα (ISO week-id check)
- [x] Permission `tickDays` για cashiers (Firestore rule allows weekTicks-only update)
- [x] **Ωράρια εμφανείς μέσα στα κουτάκια** (10-18 / ΡΕΠ) — ώρες παραμένουν ορατές με tick
- [x] Νέο tab «📋 Όλοι» admin: όλοι οι εργαζόμενοι όλων των καταστημάτων με headers ανά store
- [x] **Εισαγωγή ωραρίων από Εργάνη** (paste από Excel) — desktop only, hidden on mobile
- [x] Parser για Ergani format `ΔΕ X, ΤΡ Y, ...` με `ΑΝΑΠ`/`ΜΗ-ΕΡΓ` mapping
- [x] Match by name (case-insensitive, two word orders), preview πριν εφαρμογή
- [x] Skip παλιών εργαζομένων που δεν είναι στη βάση
- [x] Edit + Delete actions μετακινήθηκαν μέσα στο detail card
- [x] Auto-select store on first load αν υπάρχει 1 μόνο
- [x] Hide search/buttons όταν δεν έχει επιλεγεί κατάστημα

### Logo & PWA
- [x] 3 SVG λογότυπα designed (icons/logo-1-monogram.svg κλπ)
- [x] Επιλέχθηκε **#1: ΕQ Monogram** (μπλε→μωβ gradient)
- [x] manifest.json για PWA install
- [x] PNG sizes: 192/512/180 (apple-touch) + 32 favicon — via rsvg-convert
- [x] Add-to-Home-Screen δουλεύει σε iPhone Safari + Android Chrome

### Firestore Security Rules
- [x] `firestore.rules` deployed (admin/manager/cashier path)
- [x] Helpers: hasStore, hasPermission, isAdmin, isBootstrapAdmin
- [x] User must republish στο Firebase Console όποτε αλλάζουν

## 🧹 Αφαιρέθηκαν (2026-05-07)
- ❌ **Push notifications / FCM / Cloud Functions** — αποτελέσματα FCM `sent=1` αλλά τα notifications δεν έφταναν στον χρήστη (browser/OS layer).
  Αφαιρέθηκαν: `functions/`, `firebase.json`, `.firebaserc`, `firebase-messaging-sw.js`,
  `.github/workflows/deploy-functions.yml`, καμπανάκι, FCM client setup, per-store
  recipients UI, σχετικοί Firestore rules.
- Αν χρειαστεί ποτέ ξανά: ο user μπορεί να καθαρίσει manually:
  - Firebase Console → Functions → delete `scheduleReminders`
  - Cloud Scheduler → delete `firebase-schedule-...`
  - GitHub → Secrets → delete `FIREBASE_SERVICE_ACCOUNT`
  - Firebase plan → downgrade σε Spark (αν θέλει)

## 📋 Επόμενα candidates
- [ ] Bookmarklet «1-click extract» από Εργάνη σελίδα
- [ ] Direct Ergani API integration (μεγάλο project, χρειάζεται backend)
- [ ] Templates ωραρίων (πρωί/απόγευμα/πλήρες)
- [ ] Μαζική εφαρμογή ωραρίου (σε πολλούς ταυτόχρονα)
- [ ] 🟢/⚪ IN/OUT clock-in tracking με Firestore clockEvents
- [ ] 💾 Export QR ως PNG για εκτύπωση
- [ ] 🌐 PWA / offline service worker
- [ ] 📊 Στατιστικά εβδομάδας (πόσοι σκαναρίστηκαν, παρουσίες)
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
- **Tick boxes**: tri-state + ώρες ορατές, auto-reset Δευ via ISO weekId
- **Schedule import**: paste από Εργάνη Excel (tab-separated), match by name, desktop only
- **Logo**: SVG bundled + PNG via rsvg-convert για apple-touch-icon
- **Mobile**: schedule import κρυμμένο, χειροκίνητη επεξεργασία στην καρτέλα εργαζομένου

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
