import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from '../AnimatedNumber';
import { ProgressBar } from '../ProgressBar';
import { colors, radii, spacing, typography } from '../../theme';

export const MomentumDial = ({ score, delta, title = 'Stable, with one watch area' }: { score: number; delta: number; title?: string }) => (
  <View style={styles.wrap}>
    <View style={styles.dial}>
      <AnimatedNumber value={score} style={styles.score} />
      <Text style={styles.outOf}>/ 850</Text>
    </View>
    <View style={styles.copy}>
      <Text style={typography.eyebrow}>Money Momentum</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.deltaPill}>
        <View style={styles.deltaDot} />
        <Text style={styles.deltaText}>+{delta} this month</Text>
      </View>
      <ProgressBar label="Direction" value={Math.min(100, Math.round((score / 850) * 100))} height={8} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xl,
  },
  dial: {
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: 72,
    borderWidth: 1,
    height: 132,
    justifyContent: 'center',
    width: 132,
  },
  score: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 42,
    fontWeight: '400',
    lineHeight: 48,
  },
  outOf: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 26,
    lineHeight: 31,
  },
  deltaPill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  deltaDot: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 7,
    width: 7,
  },
  deltaText: {
    color: colors.primaryDeep,
    fontSize: 12,
    fontWeight: '700',
  },
});
