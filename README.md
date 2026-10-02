# VillaCheck V3 — Destination Explorer + Trust Map

Version 3 was rebuilt to be visually distinct from V1 and V2 while keeping the same prototype business flows.

## Visual direction
- Map-first / destination explorer
- Full-bleed photographic hero
- Floating search dock
- Split Directory: results list + trust/location map
- Villa detail uses a verification timeline + Trust Ledger
- Pricing uses a selector + detail panel instead of 5 repeated cards
- Owner/User/Admin flows remain functional but use sharper V3 styling
- Responsive mobile layout included

## Important flows
### New owner
Pricing → Register → Owner information → Add villa → Package confirmation → Pending → Owner dashboard

### Existing owner
Pricing → Existing owner login → Select villa → Package confirmation → Pending → Owner dashboard

### Public
Search/filter → Directory → Villa Trust Profile
QR scanner → Verification Result → Trust Profile
Public Report works without login

## Test accounts
- User: user@villacheck.test / User1234
- Owner: owner@villacheck.test / Owner1234
- Admin: admin@villacheck.test / Admin1234

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to Vercel
1. Push this folder to GitHub.
2. In Vercel choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

The prototype uses external Unsplash image URLs and browser camera access for QR scanning. Camera access requires HTTPS or localhost.
