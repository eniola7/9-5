import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0E1113',
  backgroundElevated: '#111618',
  card: '#161B1E',
  cardSoft: '#1D2428',
  border: '#263036',
  primary: '#22C55E',
  primaryDark: '#16A34A',
  accent: '#4ADE80',
  purple: '#A78BFA',
  textPrimary: '#E5E7EB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#22C55E',
  overlay: 'rgba(0, 0, 0, 0.72)',
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
  xl: 28,
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
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
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
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});

export const gradients = {
  hero: ['#0E1113', '#102017', '#0E1113'],
};
