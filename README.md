# Greyson Institute — Website v0.1

A clean-slate Next.js website for Greyson Institute / Real Estate Education.

## Brand system frozen
- Name: Greyson Institute
- Descriptor: Real Estate Education
- Palette: ink, deep slate, bronze accent, soft cream
- Visual language: editorial / institutional / architectural
- GI mark: full G + classical column as the I
- No roofs, keys, houses, palms, skylines, or extra slogans

## What is intentionally NOT final yet
The CE Shop meeting has not happened yet, so this build deliberately avoids making unsupported claims about:
- course-provider status
- pricing
- commission or affiliate model
- FREC approval attribution
- certificates / state reporting
- student accounts
- refunds
- course support responsibilities

Those pieces should be wired in after the partner terms are confirmed.

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Deploy
Recommended: GitHub -> Vercel. Use `greysoninstitute.com` as the primary domain and redirect `greysoninstitute.org` to the .com.

## Pre-launch checklist
1. Confirm Greyson Institute name / DBA clearance.
2. Confirm CE Shop partner model and required disclosure language.
3. Replace instructor placeholder with final photo, name, credentials, and approved bio.
4. Add exact course pages, prices, outbound enrollment URLs, and provider disclosures.
5. Finalize Privacy / Terms based on actual analytics, advertising, forms, and provider data flow.
6. Export final production logo assets (SVG + transparent PNG) and replace CSS-drawn monogram if desired.
7. Connect domain in Vercel and redirect .org -> .com.
