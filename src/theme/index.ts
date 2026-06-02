import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FAFBF6',
  backgroundElevated: '#F4F7EF',
  paper: '#F6F8EE',
  ink: '#17211C',
  inkSoft: '#526158',
  muted: '#ECF1E7',
  card: '#FFFFFF',
  cardSoft: '#F6F8EE',
  surfaceLight: '#FFFFFF',
  surfaceMuted: '#E9EFE4',
  surfaceDeep: '#17211C',
  border: '#E0E8DD',
  borderSoft: 'rgba(17, 24, 20, 0.1)',
  primary: '#1F8F5F',
  primaryDark: '#176B48',
  primaryDeep: '#176B48',
  primaryForeground: '#FBFCF7',
  accent: '#C9A35B',
  accentForeground: '#4A3512',
  secondaryGreen: '#B7CEBF',
  mint: '#E4F6EA',
  sage: '#B9D0C1',
  gold: '#D2AA5E',
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
    color: colors.primaryDeep,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 40,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 46,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  body: {
    color: colors.inkSoft,
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
  paper: {
    shadowColor: '#111814',
    shadowOpacity: 0.05,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 18 },
    elevation: 4,
  },
  card: {
    shadowColor: '#111814',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 24 },
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
    shadowColor: colors.primaryDeep,
    shadowOpacity: 0.2,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 24 },
    elevation: 8,
  },
});

export const gradients = {
  hero: ['#FAFBF6', '#F6F8EE', '#FFFFFF'],
};
