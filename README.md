# LOLO - Quiet Financial Intelligence

LOLO is a polished React Native / Expo MVP for a financial operating system for young professionals. It helps people understand spending, improve credit habits, track subscriptions, forecast financial stress, and reflect on their money journey without shame, noise, or finance-bro energy.

Core positioning: **Quiet financial intelligence for people building a stable life.**

## Run Locally

Use Node 20 LTS for Expo 49. This repo includes `.nvmrc`.

```bash
nvm use
npm install
npm start
```

Useful scripts:

```bash
npm run web
npm run build:web
npm run typecheck
```

## Key Features

- Landing page with hero, product preview, waitlist CTA, feature sections, social layer explanation, and roadmap.
- Guided investor demo path from the landing page with four steps: Trust Score, score movement, credit action simulation, and AI next action.
- Dashboard MVP with cash flow, spending trend, credit utilization, emergency runway, upcoming bills, subscriptions, and AI-style weekly insight.
- Trust Score breakdown across payment consistency, utilization control, cash flow stability, debt pressure, and financial behavior trend.
- Credit intelligence card with utilization, recommended payment timing, statement date, credit habit score, and simulation copy.
- Spending intelligence screen with recurring subscriptions, discretionary trend, lifestyle drift alert, and stress forecast.
- Money Journal with Letterboxd-style milestone/reflection cards, ratings, tags, and helpful counts.
- Product review cards for credit cards, banks, budgeting methods, city/apartment decisions, and car ownership.
- Dark-premium responsive styling using the existing React Native component system.

## What Is Mocked

- Onboarding profile creation
- Dashboard operating metrics
- Credit utilization simulation
- Spending and stress insights
- Subscription list
- Money journal posts
- Product reviews
- Rule-based coach responses
- Local demo persistence

The app does not call Plaid, Stripe, credit bureaus, banks, or OpenAI. All financial information in this prototype is mock data and should not be treated as financial, legal, or credit advice.

## Future Roadmap

- Plaid integration
- Credit bureau integration
- AI financial coach
- Anonymous community posts
- Subscription cancellation workflows
- Personalized credit action plans
- Financial stress forecasting
- Mobile app version

## PWA Support

The web build includes a custom PWA manifest, app icons, mobile viewport metadata, splash screen markup, and a basic service worker for offline shell caching. After running `npm run build:web`, deploy the `web-build/` folder over HTTPS so users can install LOLO with "Add to Home Screen" and open it like a native app.
