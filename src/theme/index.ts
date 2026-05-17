import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F7FAF6',
  backgroundElevated: '#EEF6EF',
  card: '#FFFFFF',
  cardSoft: '#F1F6F2',
  surfaceLight: '#FFFFFF',
  surfaceMuted: '#E4ECE5',
  border: '#D8E4DB',
  borderSoft: 'rgba(15, 23, 18, 0.1)',
  primary: '#16A34A',
  primaryDark: '#16A34A',
  accent: '#15803D',
  secondaryGreen: '#1DB954',
  purple: '#6D5BD0',
  textPrimary: '#101914',
  textSecondary: '#44524A',
  textMuted: '#748078',
  slate: '#5E6B63',
  danger: '#EF4444',
  warning: '#EAB75C',
  success: '#16A34A',
  overlay: 'rgba(10, 20, 14, 0.42)',
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
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});

export const gradients = {
  hero: ['#F7FAF6', '#E9F8EC', '#FFFFFF'],
};
