import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F7F8F3',
  backgroundElevated: '#EEF3EC',
  card: '#FFFFFF',
  cardSoft: '#F2F6EF',
  surfaceLight: '#FFFFFF',
  surfaceMuted: '#E4ECE2',
  surfaceDeep: '#17211C',
  border: '#DDE6DD',
  borderSoft: 'rgba(17, 24, 20, 0.1)',
  primary: '#1F8F5F',
  primaryDark: '#176B48',
  accent: '#C9A35B',
  secondaryGreen: '#A8CBB7',
  mint: '#DDF7E8',
  blue: '#4E7DD9',
  textPrimary: '#111814',
  textSecondary: '#4F5E55',
  textMuted: '#7B877F',
  slate: '#66736A',
  danger: '#C95D4F',
  warning: '#C98A2E',
  success: '#1F8F5F',
  info: '#4E7DD9',
  white: '#FFFFFF',
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
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
};

export const typography = StyleSheet.create({
  eyebrow: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 38,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 28,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
  },
  small: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
});

export const shadows = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  soft: {
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  glow: {
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
});

export const gradients = {
  hero: ['#F7F8F3', '#EEF3EC', '#FFFFFF'],
};
