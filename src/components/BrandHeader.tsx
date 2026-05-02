import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  onReset?: () => void;
}

export const BrandHeader = ({ title = 'LOLO', subtitle = 'Live On. Life Optimized.', showReset, onReset }: BrandHeaderProps) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.brand}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <View style={styles.actions}>
      <View style={styles.demoBadge}>
        <Text style={styles.demoText}>Demo Mode</Text>
      </View>
      {showReset ? (
        <Pressable style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  brand: {
    ...typography.title,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  actions: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  demoBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  demoText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
  },
  resetButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  resetText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
});
