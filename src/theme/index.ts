import { StyleSheet } from 'react-native';

export const colors = {
  background: '#080D0B',
  backgroundElevated: '#0E1412',
  card: '#161D1A',
  cardSoft: '#202923',
  surfaceLight: '#F4F6F2',
  surfaceMuted: '#DDE4DB',
  border: '#27322D',
  borderSoft: 'rgba(244, 246, 242, 0.1)',
  primary: '#42F28B',
  primaryDark: '#16A34A',
  accent: '#42F28B',
  secondaryGreen: '#1DB954',
  purple: '#A7A6FB',
  textPrimary: '#F4F6F2',
  textSecondary: '#B8C2B8',
  textMuted: '#738077',
  slate: '#9AA7A0',
  danger: '#EF4444',
  warning: '#EAB75C',
  success: '#42F28B',
  overlay: 'rgba(3, 7, 5, 0.78)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 10,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const typography = StyleSheet.create({
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  small: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});

export const shadows = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.38,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});

export const gradients = {
  hero: ['#080D0B', '#0E2118', '#080D0B'],
};
