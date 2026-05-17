# LOLO Data Persistence Strategy

LOLO is currently frontend-only and uses demo JSON. MongoDB support is scaffolded for a future server runtime.

## MongoDB Collections

- `users`: account identity, auth provider metadata, timestamps
- `profiles`: onboarding responses, goals, credit stage, stress level, privacy preferences
- `journal_entries`: user reflections, milestones, monthly reviews
- `product_reviews`: credit card, bank, method, housing, city, and car decision reviews
- `financial_snapshots`: educational Trust Score snapshots and derived financial summaries
- `user_preferences`: notification, privacy, community, and partner-sharing preferences

## Environment Variables

```bash
MONGODB_URI=
MONGODB_DB_NAME=lolo
```

Auth0 environment placeholders:

```bash
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

## Should Be Stored Later

- User profiles
- Onboarding responses
- Journal entries
- Product reviews
- User preferences
- Derived financial snapshots
- Consent records

## Should Not Be Stored In The Frontend

- Raw bank credentials
- Sensitive Plaid access tokens
- Credit bureau credentials
- Plaintext passwords
- Unencrypted sensitive financial data

## Auth Status

Current auth screens are Auth0-ready placeholders for demo flow only. Production auth should be handled by Auth0.

Do not store passwords in MongoDB. Use Auth0 user IDs as the stable identity key for LOLO application data.

## API Contract For Future Server Runtime

- `GET /api/me`
- `POST /api/profile`
- `PATCH /api/profile`
- `GET /api/profile`
- `POST /api/journal`
- `GET /api/journal`
- `POST /api/reviews`
- `GET /api/reviews`

All protected API routes should require an Auth0 session/user.
