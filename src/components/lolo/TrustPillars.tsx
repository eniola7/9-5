import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { trustPillars } from '../../data/financeMvp';
import { colors, radii, shadows, spacing } from '../../theme';

export const TrustPillars = () => (
  <View style={styles.grid}>
    {trustPillars.map((pillar) => (
      <View key={pillar.title} style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>{pillar.title}</Text>
          <Text style={styles.change}>{pillar.change}</Text>
        </View>
        <Text style={styles.value}>{pillar.value}</Text>
        <Text style={styles.why}>{pillar.why}</Text>
        <Text style={styles.next}>Next · {pillar.next}</Text>
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
  row: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    color: colors.ink,
    flex: 1,
    fontFamily: 'Georgia',
    fontSize: 22,
  },
  change: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: '800',
  },
  value: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 42,
    lineHeight: 46,
    marginTop: spacing.md,
  },
  why: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.lg,
  },
  next: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginTop: spacing.lg,
    textTransform: 'uppercase',
  },
});
