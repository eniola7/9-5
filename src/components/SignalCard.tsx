import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Signal } from '../types';
import { DashboardCard } from './DashboardCard';
import { PrimaryButton } from './PrimaryButton';
import { ProgressPill } from './ProgressPill';

interface SignalCardProps {
  signal: Signal;
  compact?: boolean;
  onPress?: () => void;
}

export const SignalCard = ({ signal, compact, onPress }: SignalCardProps) => (
  <DashboardCard
    title={signal.title}
    icon={getSignalIcon(signal.type)}
    accent={`${signal.riskLevel} risk`}
    important={signal.riskLevel === 'High'}
    onPress={onPress}
  >
    <View style={styles.row}>
      <Text style={styles.body}>{compact ? signal.suggestedAction : signal.whyItMatters}</Text>
      <ProgressPill label={signal.riskLevel} risk={signal.riskLevel} />
    </View>
    {!compact ? <Text style={styles.action}>Suggested action: {signal.suggestedAction}</Text> : null}
    {!compact && onPress ? <PrimaryButton label={signal.ctaLabel} onPress={onPress} style={styles.button} /> : null}
  </DashboardCard>
);

const getSignalIcon = (type: Signal['type']) => {
  const icons: Record<Signal['type'], string> = {
    credit: 'CR',
    rent: 'RT',
    cash: '$',
    subscriptions: 'SB',
    residency: 'MV',
    international: 'ID',
    loans: 'LN',
  };
  return icons[type];
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  body: {
    ...typography.body,
    flex: 1,
  },
  action: {
    color: colors.accent,
    fontWeight: '800',
    lineHeight: 20,
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
  },
});
