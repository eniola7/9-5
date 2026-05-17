export interface Auth0User {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface Auth0Session {
  user: Auth0User;
  accessToken?: string;
}

export const auth0ConfigKeys = {
  secret: 'AUTH0_SECRET',
  baseUrl: 'AUTH0_BASE_URL',
  issuerBaseUrl: 'AUTH0_ISSUER_BASE_URL',
  clientId: 'AUTH0_CLIENT_ID',
  clientSecret: 'AUTH0_CLIENT_SECRET',
  expoDomain: 'EXPO_PUBLIC_AUTH0_DOMAIN',
  expoClientId: 'EXPO_PUBLIC_AUTH0_CLIENT_ID',
} as const;

export const createPlaceholderAuth0User = (name = 'Ava Reynolds', email = 'ava@example.com'): Auth0User => ({
  sub: `auth0|demo-${Date.now()}`,
  email,
  name,
});

export const getAuth0SetupNotes = () => [
  'This Expo prototype uses placeholder Auth0 flow objects so the build stays portable.',
  'For production Expo auth, install and configure Auth0 React Native or Auth0 Universal Login through an Expo-compatible auth session flow.',
  'Auth0 owns authentication. LOLO MongoDB should store only app/profile data, never passwords.',
];

// TODO: Replace placeholders with the official Auth0 Expo/React Native SDK setup.
// Typical implementation options:
// - react-native-auth0 with native callback URL configuration for EAS builds.
// - Auth0 Universal Login through an Expo-compatible auth session flow.
// Keep AUTH0_CLIENT_SECRET server-side only. Do not expose secrets in the client.
