import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

export const UtilizationRing = ({ value, afterValue }: { value: number; afterValue?: number }) => {
  const rotation = `${Math.min(360, Math.max(0, value * 3.6))}deg`;

  return (
    <View style={styles.ringWrap}>
      <View style={styles.ring}>
        <View style={[styles.ringArc, { transform: [{ rotate: rotation }] }]} />
        <View style={styles.ringInner}>
          <Text style={styles.ringValue}>{value}%</Text>
          <Text style={styles.ringLabel}>utilized</Text>
        </View>
      </View>
      {afterValue ? <Text style={styles.ringNote}>{afterValue}% after recommended payment</Text> : null}
    </View>
  );
};

export const MiniBars = ({ values, labels }: { values: number[]; labels?: string[] }) => (
  <View style={styles.chart}>
    {values.map((value, index) => (
      <View key={`${value}-${index}`} style={styles.barColumn}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { height: `${Math.max(12, value)}%` }]} />
        </View>
        {labels ? <Text style={styles.barLabel}>{labels[index]}</Text> : null}
      </View>
    ))}
  </View>
);

export const LineChartMock = ({ values }: { values: number[] }) => (
  <View style={styles.lineChart}>
    {values.map((value, index) => (
      <View key={`${value}-${index}`} style={styles.linePointColumn}>
        <View style={[styles.linePoint, { marginTop: 86 - value }]} />
        {index > 0 ? <View style={styles.lineConnector} /> : null}
      </View>
    ))}
  </View>
);

export const InsightCard = ({ title, body, action }: { title: string; body: string; action: string }) => (
  <View style={styles.insight}>
    <Text style={styles.insightKicker}>AI Recommendation</Text>
    <Text style={styles.insightTitle}>{title}</Text>
    <Text style={styles.insightBody}>{body}</Text>
    <Text style={styles.insightAction}>{action}</Text>
  </View>
);

const styles = StyleSheet.create({
  ringWrap: {
    alignItems: 'center',
    gap: spacing.md,
  },
  ring: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: 78,
    borderWidth: 1,
    height: 156,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 156,
  },
  ringArc: {
    backgroundColor: 'rgba(22, 163, 74, 0.18)',
    height: 156,
    left: 78,
    position: 'absolute',
    top: 0,
    transformOrigin: 'left center',
    width: 78,
  },
  ringInner: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.borderSoft,
    borderRadius: 58,
    borderWidth: 1,
    height: 116,
    justifyContent: 'center',
    width: 116,
  },
  ringValue: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
  },
  ringLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  ringNote: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '800',
    textAlign: 'center',
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    height: 132,
    marginTop: spacing.lg,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  barTrack: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 108,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%',
  },
  barFill: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    minHeight: 12,
    width: '100%',
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  lineChart: {
    flexDirection: 'row',
    height: 110,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  linePointColumn: {
    flex: 1,
    position: 'relative',
  },
  linePoint: {
    backgroundColor: colors.primary,
    borderColor: colors.surfaceLight,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    width: 10,
  },
  lineConnector: {
    backgroundColor: 'rgba(22, 163, 74, 0.32)',
    height: 2,
    left: -30,
    position: 'absolute',
    top: 48,
    width: 58,
  },
  insight: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  insightKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  insightTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
  },
  insightBody: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  insightAction: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
    marginTop: spacing.md,
  },
});
