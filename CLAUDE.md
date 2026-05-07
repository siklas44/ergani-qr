# Ergani QR — Project Instructions

## Σκοπός
Web εφαρμογή για διαχείριση QR codes εργαζομένων (Ψηφιακή Κάρτα Εργασίας).
Multi-store, role-based (admin / manager / cashier).

## Tech Stack
- **Frontend**: vanilla HTML/CSS/JS σε ένα `index.html` (single-page, no build step)
- **Auth**: Firebase Authentication (Email/Password)
- **DB**: Firebase Firestore
- **QR lib**: qrcodejs (CDN)
- **Hosting**: GitHub Pages
- **Repo**: `siklas44/ergani-qr`
- **Live URL**: https://siklas44.github.io/ergani-qr/
- **Firebase project**: `ergani44`

## Branches
- `main` → deployed από GitHub Pages
- `claude/build-ergani-app-grrhF` → dev branch (δουλεύουμε εδώ)
- Όταν ολοκληρώνεται κάτι: merge `claude/build-ergani-app-grrhF` → `main` με fast-forward

## Admin
- **Bootstrap admin email**: `siklas44@gmail.com`
- Όταν αυτό το email κάνει signup, αυτόματα γίνεται admin στη βάση

## Ρόλοι
| Ρόλος | Δικαιώματα |
|---|---|
| `admin` | Όλα: stores CRUD, users CRUD, employees CRUD, anywhere |
| `manager` | Διαχείριση εργαζομένων στα assigned καταστήματα |
| `cashier` | Εμφανίζει QR εργαζομένων στα assigned καταστήματα |

Δικαιώματα ανά χρήστη ορίζονται από admin (checkboxes), όχι hardcoded.

## Data Model (Firestore)
```
/users/{uid}
  email, role: "admin"|"manager"|"cashier", name?, storeIds: [string],
  permissions: {
    viewEmployees, showQR, scanQR, addEmployees, editEmployees, deleteEmployees
  },
  createdAt, createdBy

/stores/{storeId}
  name, address?, createdAt, createdBy

/stores/{storeId}/employees/{empId}
  name, code, schedule: { mon:{from,to|off}, tue:..., ..., sun:... },
  createdAt, createdBy

/stores/{storeId}/clockEvents/{eventId}   (μελλοντικό)
  empId, type: "in"|"out", timestamp, recordedBy
```

## Files
- `index.html` — main app (~2900 γραμμές)
- `firestore.rules` — security rules (apply to Firebase Console manually)
- `manifest.json` — PWA manifest για Add-to-Home-Screen
- `lib/jsQR.js` — vendored QR scanner (camera decode)
- `lib/qrcode-gen.js` — vendored QR generator (UTF-8-safe display)
- `icons/logo-1-monogram.svg` — εικονίδιο εφαρμογής (επιλεγμένο)
- `icons/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png`
- `icons/preview.html` — preview των 3 logo options
- `CLAUDE.md` — project instructions
- `STATE.md` — current progress

## Notable removals
- 2026-05-07: αφαιρέθηκαν Cloud Functions / FCM / push notifications
  (FCM επέστρεφε success αλλά browser/OS δεν εμφάνιζε τα notifications).

## Schedule data model
Per employee schedule field:
```
schedule: {
  mon: { from: "09:00", to: "17:00" } | { off: true },
  tue: ...,
  ...
  sun: ...
}
```

Per employee weekly tick boxes (auto-reset Δευτέρα):
```
weekTicks: {
  weekId: "2026-W17",   // ISO week
  days: { mon: "tick" | "x" | "" }
}
```

## Ergani import format (Excel paste)
Tab-separated rows with schedule string in one column:
```
NAME (CODE)\tEDRA\tDATE\t\tFixed\t ΔΕ HH:MM-HH:MM, ΤΡ ΑΝΑΠ, ...\tSentToErgani\t...
```
Day codes: ΔΕ→mon, ΤΡ→tue, ΤΕ→wed, ΠΕ→thu, ΠΑ→fri, ΣΑ→sat, ΚΥ→sun
Cell values: HH:MM-HH:MM (work) / ΑΝΑΠ / ΜΗ-ΕΡΓ (off)

## Conventions
- Γλώσσα UI: **Ελληνικά**
- Σχόλια κώδικα: αγγλικά, μόνο όπου χρειάζεται (γιατί, όχι τι)
- Όλος ο κώδικας σε `index.html` εκτός αν γίνει >1500 γραμμές
- Firestore rules σε `firestore.rules`
- Setup steps για χρήστη σε `README.md`
- Μικρά commits, fast-forward merges

## Workflow Reminders
- Ο χρήστης (siklas44) **δεν είναι developer** — μη γράφεις jargon
- Πάντα ενημέρωνε STATE.md μετά από κάθε σημαντικό βήμα
- Πριν μεγάλη αλλαγή: confirm με τον χρήστη
- Το σύστημα κολλάει σε μεγάλα μηνύματα → κράτα τις απαντήσεις σύντομες

## ⚡ Κανόνες χρήστη (ΥΠΟΧΡΕΩΤΙΚΟΙ)
- **«ενημέρωσε τη μνήμη»** → ενημέρωσε ΑΜΕΣΩΣ `CLAUDE.md` + `STATE.md` με ό,τι νέο έχει συζητηθεί/αποφασιστεί/αλλάξει, και κάνε commit + push.

## User-side actions (απαιτούν χειρωνακτική ενέργεια)
1. Firebase Console → Authentication → Sign-in method → Email/Password → Enable
2. Firebase Console → Firestore → Rules → paste από `firestore.rules` → Publish
3. GitHub → Settings → Pages → already enabled (main / root)
