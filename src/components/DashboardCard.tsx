import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { PressableScale } from './PressableScale';

interface DashboardCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  accent?: string;
  icon?: string;
  important?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const DashboardCard = ({ title, value, subtitle, accent, icon, important, onPress, children, style }: DashboardCardProps) => {
  const content = (
    <View style={[styles.card, important && styles.important, style]}>
      <View pointerEvents="none" style={[styles.highlight, important && styles.highlightImportant]} />
      <View style={styles.topRow}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>{icon ?? '•'}</Text>
        </View>
        {accent ? <Text style={styles.accent}>{accent}</Text> : null}
      </View>
      <Text style={styles.title}>{title}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );

  if (!onPress) return content;
  return (
    <PressableScale onPress={onPress} pressedStyle={styles.pressed}>
      {content}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 88,
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
  },
  highlightImportant: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
  },
  important: {
    borderColor: colors.primary,
    backgroundColor: '#17201A',
    ...shadows.glow,
  },
  pressed: {
    borderColor: colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.14)',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  icon: {
    color: colors.accent,
    fontWeight: '900',
  },
  accent: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },
  value: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.small,
    marginTop: spacing.sm,
  },
});
