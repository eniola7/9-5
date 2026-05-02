import React from 'react';
import { View, Text, StyleSheet, DimensionValue } from 'react-native';
import { colors, radii, spacing } from '../theme';

interface MetricBarProps {
  label: string;
  value: number;
  suffix?: string;
}

export const MetricBar = ({ label, value, suffix = '%' }: MetricBarProps) => {
  const width = `${Math.max(4, Math.min(100, value))}%` as DimensionValue;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}{suffix}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  value: {
    color: colors.accent,
    fontWeight: '900',
  },
  track: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.sm,
    height: 10,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    height: '100%',
  },
});
