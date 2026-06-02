# LOLO

**LOLO is financial clarity for people building real lives.**

LOLO is an early-stage Expo / React Native prototype for a financial reflection product. It is not a budgeting app. It turns demo financial data into monthly stories that help users understand:

- What changed financially
- Why it matters
- What to do next
- How their financial story evolves over time

The product thesis is simple: **financial growth should feel like a journal, not a spreadsheet.**

## Founder Story

LOLO was founded by **Mubarak (Eni) Adebayo**, an engineer who experienced firsthand how difficult it can be to build financial stability when your story does not fit neatly into traditional systems.

After moving to the United States for college and later beginning his career as an engineer, Eni found himself navigating many of the same challenges faced by millions of young professionals, immigrants, students, and first-generation wealth builders: establishing credit, managing cash flow, making major life decisions, and trying to understand whether he was actually making progress financially.

What frustrated him most was that every financial tool seemed to focus on numbers, transactions, and optimization. Apps could tell him what he spent, but they could not tell him what it meant. They could show him a credit score, but not the story behind it. They could track a budget, but not the decisions, setbacks, and milestones that shaped his financial journey.

Eni realized that financial growth is deeply personal. Behind every payment, move, promotion, debt payoff, or savings milestone is a human story. Yet no product existed to help people understand their financial lives in that way.

That insight became LOLO.

LOLO was built on a simple belief:

**Financial growth should feel like a journal, not a spreadsheet.**

Instead of focusing solely on transactions and budgets, LOLO helps people understand what changed financially, why it matters, and what to do next. Through monthly reviews, financial reflections, and personalized insights, LOLO transforms financial data into a living story that grows alongside the user.

Today, LOLO is building a future where financial wellness is not measured only by numbers, but by understanding, confidence, and progress over time, especially for the millions of people building stability in systems that were never designed with their journeys in mind.

## Who It Is For

LOLO is designed for people building stability while life is expensive, imperfect, and in motion:

- Young professionals in expensive cities
- Recent immigrants with thin U.S. credit files
- Students building early credit habits
- Renters trying to prove reliability
- Families building financial stability month by month

## Product Experience

The v2 app is organized around four core surfaces:

- **Today:** a simple read on what changed, why it matters, and what to do next.
- **Review:** the flagship monthly financial story with key metrics, changes, stress forecast, reflection prompt, and looking-ahead guidance.
- **Reflect:** personalized prompts, life event logging, goal reflections, and AI-style explanations without feeling like a generic chatbot.
- **Me:** profile context, milestones, financial biography, connected account placeholder, and privacy settings.

The main educational signal is **Money Momentum**. It is direction, not judgment.

## Demo Flow

Use the landing page CTA **View product demo**.

The demo opens a realistic frontend-only product experience:

1. See Today and the current Money Momentum signal.
2. Understand the main monthly change.
3. Open the monthly Review.
4. Reflect on a real-life money moment.
5. Check profile context, milestones, and privacy settings.
6. Take one next best action.

The demo uses generated mock data from `lolo-engine/sample_output.json`.

## Screenshots

Screenshot placeholders live in [docs/assets/screenshots](docs/assets/screenshots).

| Screen | Placeholder |
| --- | --- |
| Landing page | `docs/assets/screenshots/landing-page.png` |
| Today | `docs/assets/screenshots/today.png` |
| Review | `docs/assets/screenshots/review.png` |
| Reflect | `docs/assets/screenshots/reflect.png` |
| Me | `docs/assets/screenshots/me.png` |
| Mobile view | `docs/assets/screenshots/mobile-view.png` |

## Tech Stack

- Expo SDK 54
- React Native
- React Native Web
- TypeScript
- React Navigation
- Local JSON demo data
- Python standard library prototype engine
- Auth0-ready authentication abstraction for Expo / React Native
- MongoDB-ready helper structure for a future server runtime

The frontend intentionally stays lightweight. No production backend, Plaid integration, bureau integration, or AI API is connected yet.

## Python Engine

The Python prototype engine lives in [lolo-engine](lolo-engine).

It includes:

- `demo_users.py`: five fictional demo users
- `trust_score.py`: transparent educational scoring model from 300 to 850
- `recommendations.py`: personalized next-best-action generation
- `simulations.py`: action simulations such as card payments, spending reductions, income changes, emergency savings, missed payments, and inquiries
- `export_demo_json.py`: exports `sample_output.json` for the app

Regenerate the frontend demo data:

```bash
cd lolo-engine
python3 export_demo_json.py
```

Validate the generated JSON:

```bash
python3 -m json.tool sample_output.json
```

## Money Momentum Disclaimer

LOLO Money Momentum is an educational demo signal for product prototyping. It is not a FICO score, VantageScore, credit bureau score, underwriting model, lending decision, or financial advice.

A production scoring model would require deeper validation, compliance review, user consent, security review, fairness testing, explainability work, and partner-specific evaluation.

## Privacy And Security

Current prototype:

- Uses demo data only
- Does not store real financial data
- Does not connect to banks, Plaid, credit bureaus, payroll, lenders, or OpenAI
- Does not move money
- Does not make real credit or lending decisions

Future product:

- Financial integrations should require explicit user consent
- Users should understand what data is connected and why
- Educational Money Momentum signals must remain clearly distinct from official credit scores
- Any partner or lender layer would require compliance, privacy, and security review

## Auth And MongoDB Status

LOLO is structured for Auth0 as the authentication provider. In this Expo prototype, auth screens use Auth0-ready placeholder flows so the app remains portable without native Auth0 configuration.

MongoDB support is scaffolded for a future server/API runtime in [src/lib/mongodb.ts](src/lib/mongodb.ts). The current Expo client does not connect directly to MongoDB.

Copy `.env.example` and provide server-side values when a backend is added:

```bash
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
EXPO_PUBLIC_AUTH0_DOMAIN=
EXPO_PUBLIC_AUTH0_CLIENT_ID=
MONGODB_URI=
MONGODB_DB_NAME=lolo
```

Auth0 owns authentication. MongoDB should store only LOLO app data such as profile fields, preferences, journal entries, reviews, and financial snapshots. Do not store passwords, banking credentials, credit bureau credentials, or secrets in MongoDB.

See [docs/DATA_PERSISTENCE.md](docs/DATA_PERSISTENCE.md) for the persistence strategy.

## Run Locally

Use Node 20 LTS for Expo SDK 54. This repo includes `.nvmrc`.

```bash
nvm use
npm install
npm start
```

Run the web demo:

```bash
npm run web
```

Run checks:

```bash
npm run typecheck
npm run build
npx expo-doctor
```

`npm run build` exports the Expo web build through `npm run build:web`.

## Deployment Notes

Future deployment options:

- **Expo web:** generate a static web export for demos.
- **Vercel or Netlify:** host the exported web demo for advisors, investors, and user interviews.
- **Expo Go:** test the mobile prototype quickly on device.
- **EAS Build:** create installable iOS/Android builds later when the mobile experience stabilizes.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for build settings for Vercel, Netlify, Expo web, Expo Go, and future EAS builds.

## Current Status

LOLO is currently a demo-ready prototype:

- Frontend demo is functional
- Python engine generates realistic mock data
- Money Momentum is transparent and educational
- Recommendations are generated from fictional demo profiles
- Public marketing, auth placeholder, onboarding, and profile surfaces exist
- No real user financial data is collected
- No production integrations are connected

## Roadmap

### MVP

- Four-tab product structure: Today, Review, Reflect, Me
- Monthly financial story as the flagship experience
- Five fictional demo users generated by the Python engine
- Educational Money Momentum signal
- Privacy-first prototype disclaimers

### Demo-Ready Prototype

- Public web demo
- Polished screenshots
- Advisor and user interview script
- Stronger empty states
- More realistic monthly story scenarios

### Private Beta

- Auth0 production setup
- Authenticated user accounts
- Consent-based onboarding
- Secure profile persistence
- Mobile app testing with early users

### Data Integrations

- Plaid or similar bank-data integration
- Payroll or income verification exploration
- Rent/payment history integrations
- Subscription and cash-flow enrichment

### Real Scoring Model

- Model validation
- Compliance review
- Bias and fairness evaluation
- Explainability and user-facing reason codes
- Clear distinction from official credit scores

### Partner Layer

- Consent-based profile sharing
- Rental, lender, bank, or financial wellness pilots
- Partner-specific interpretation
- Legal, compliance, and adverse-action review

## For Investors And Advisors

LOLO is exploring a simple thesis: people need a clearer way to understand their financial lives before institutions fully understand them.

Traditional credit scores are important, but they do not explain the lived context around rent pressure, credit timing, cash flow stability, moving costs, and the small habits that make a month feel calmer or tighter.

LOLO starts as a consumer product because users need to understand and improve their own financial picture first. If the reflection layer becomes useful, the same consent-based context could later support partner and infrastructure use cases.
