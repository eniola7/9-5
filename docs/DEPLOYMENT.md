# LOLO Deployment Notes

LOLO is currently a frontend-only Expo / React Native Web demo with local JSON data. There are no required production secrets for the current prototype.

## Production Build

From the repo root:

```bash
npm install
npm run typecheck
npm run build
```

The production web export is written to:

```text
dist/
```

## Environment Placeholders

See `.env.example`.

The current demo does not require environment variables. Future deployments may use `EXPO_PUBLIC_*` variables for API endpoints, analytics, or integration environments.

## Vercel

Recommended setup:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Framework preset: Other

Vercel is a good option for a quick public web demo with custom domain support.

## Netlify

Recommended setup:

- Build command: `npm run build`
- Publish directory: `dist`

Netlify is also suitable for static demo hosting and preview URLs.

## Expo Options

- `npm run web` for local browser demos
- Expo Go for quick mobile testing during development
- EAS Build later for installable iOS and Android builds

## Custom Domain Readiness

Before using a custom domain:

- Add final screenshots to `docs/assets/screenshots`
- Confirm README and public copy are current
- Confirm the Money Momentum disclaimer is visible in the product
- Confirm no real user data or private keys are included
- Run `npm run typecheck` and `npm run build`

## Current Constraints

- Uses demo data only
- No backend API
- No real financial integrations
- No official credit score or lender decisioning
- No production analytics configured
