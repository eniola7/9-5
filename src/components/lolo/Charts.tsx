import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../../theme';

export const Sparkline = ({ values, color = colors.primary }: { values: number[]; color?: string }) => {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <View style={styles.sparkline}>
      {values.map((value, index) => {
        const normalized = (value - min) / Math.max(1, max - min);
        return (
          <View key={`${value}-${index}`} style={styles.sparkColumn}>
            <View style={[styles.sparkPoint, { backgroundColor: color, marginTop: 54 - normalized * 48 }]} />
            {index > 0 ? <View style={[styles.sparkConnector, { backgroundColor: color }]} /> : null}
          </View>
        );
      })}
    </View>
  );
};

export const MiniBars = ({ values, labels }: { values: number[]; labels?: string[] }) => {
  const max = Math.max(...values);

  return (
    <View style={styles.bars}>
      {values.map((value, index) => (
        <View key={`${value}-${index}`} style={styles.barColumn}>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { height: `${Math.max(12, (value / max) * 100)}%` }]} />
          </View>
          {labels ? <Text style={styles.barLabel}>{labels[index]}</Text> : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sparkline: {
    flexDirection: 'row',
    height: 72,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  sparkColumn: {
    flex: 1,
    position: 'relative',
  },
  sparkPoint: {
    borderColor: colors.card,
    borderRadius: radii.pill,
    borderWidth: 2,
    height: 10,
    width: 10,
  },
  sparkConnector: {
    height: 2,
    left: -28,
    opacity: 0.28,
    position: 'absolute',
    top: 38,
    width: 54,
  },
  bars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    height: 106,
    marginTop: spacing.md,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  barTrack: {
    backgroundColor: colors.muted,
    borderRadius: radii.md,
    height: 82,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%',
  },
  barFill: {
    backgroundColor: colors.sage,
    borderTopLeftRadius: radii.md,
    borderTopRightRadius: radii.md,
    minHeight: 12,
    width: '100%',
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
});
