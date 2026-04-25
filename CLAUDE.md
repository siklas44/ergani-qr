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
  email, role, name?, storeIds: [string], permissions: {...}, createdAt

/stores/{storeId}
  name, address?, createdAt, createdBy

/stores/{storeId}/employees/{empId}
  name, code, createdAt, createdBy

/stores/{storeId}/clockEvents/{eventId}   (Φάση 3)
  empId, type: "in"|"out", timestamp, recordedBy
```

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
