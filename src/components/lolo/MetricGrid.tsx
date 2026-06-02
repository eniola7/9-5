import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { operatingMetrics } from '../../data/financeMvp';
import { colors, radii, shadows, spacing } from '../../theme';

export const MetricGrid = () => (
  <View style={styles.grid}>
    {operatingMetrics.map((metric) => (
      <View key={metric.title} style={[styles.card, metric.important && styles.important]}>
        <View style={styles.row}>
          <Text style={styles.icon}>{metric.icon}</Text>
          <Text style={styles.accent}>{metric.accent}</Text>
        </View>
        <Text style={styles.value}>{metric.value}</Text>
        <Text style={styles.title}>{metric.title}</Text>
        <Text style={styles.subtitle}>{metric.subtitle}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
    ...shadows.paper,
  },
  important: {
    borderColor: 'rgba(31, 143, 95, 0.4)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  accent: {
    color: colors.textMuted,
    fontFamily: 'Courier',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 40,
    marginTop: spacing.lg,
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.inkSoft,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
});
