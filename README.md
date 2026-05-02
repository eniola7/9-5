# LOLO — Live On. Life Optimized.

A React Native / Expo MVP mobile app built to feel like a fintech product for students, medical students, international students, and early professionals.

## What’s included

- Expo + TypeScript mobile app
- Bottom tab navigation with Home, Roadmap, Pro, Coach, Alerts
- Onboarding flow for profile choice
- Mock dashboard with credit health, balance, bills, spending cards
- Roadmap progress and checklist statuses
- Premium LOLO Pro pricing page
- Guardrailed AI Coach chat UI with hardcoded responses
- Alerts / predictive signal cards
- Mock data only; no real banking integrations

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo app:
   ```bash
   npm start
   ```
3. Open on your phone with Expo Go or run on simulator.

## Future production notes

- `src/services/placeholders.ts` contains placeholder comments for:
  - Plaid integration
  - Stripe checkout
  - Rent reporting partner
  - Credit score provider
  - OpenAI coach API
- `src/services/storage.ts` provides secure local persistence for selected user profile.

## Mock data files

- `src/data/mockProfiles.ts`
- `src/data/mockRoadmap.ts`
- `src/data/mockAlerts.ts`
- `src/data/mockSubscriptions.ts`
- `src/data/mockChat.ts`

## Notes

This app uses only mock data for all financial content. It is designed as a polished UI prototype for LOLO, not a production banking or credit service.
