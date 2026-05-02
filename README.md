# LOLO — Live On. Life Optimized.

LOLO is a dark-mode React Native / Expo demo for personalized student and early-career financial guidance. It is built as a pitch-ready interactive prototype, not a production financial product.

## Run locally

Use Node 20 LTS for Expo 49. This repo includes `.nvmrc`.

```bash
nvm use
npm install
npm start
```

You can also run:

```bash
npx expo start
npm run web
npm run build:web
npm run typecheck
```

## PWA support

The web build includes a custom PWA manifest, app icons, mobile viewport metadata, splash screen markup, and a basic service worker for offline shell caching. After running `npm run build:web`, deploy the `web-build/` folder over HTTPS so users can install LOLO with “Add to Home Screen” and open it like a native app.

## What is mocked

- Onboarding profile creation
- LOLO Financial Profile scoring
- Public/internet-style benchmark data
- Persona-specific roadmap generation
- LOLO Signals risk markers
- Rule-based AI Coach responses
- Subscription upgrade state
- Local demo persistence

The app does not scrape the web, call Plaid, call Stripe, pull credit bureau data, access bank data, or call OpenAI. It uses user-entered demo inputs and clearly mocked benchmark objects.

## Future production integrations

- Supabase or Firebase backend
- Plaid for bank data
- Stripe for subscriptions
- Credit or rent reporting partner
- OpenAI API for a real guardrailed coach
- Compliance, legal, privacy, and security review

## Product wording

LOLO uses “risk signals,” “personalized guidance,” and “general public benchmark data.” It does not promise guaranteed credit score outcomes or claim to find private data about users online.
