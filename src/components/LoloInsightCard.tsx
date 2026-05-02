import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { RoadmapItem, Signal, UserProfile } from '../types';
import { DashboardCard } from './DashboardCard';
import { PrimaryButton } from './PrimaryButton';

interface LoloInsightCardProps {
  profile: UserProfile;
  nextAction?: RoadmapItem;
  signal?: Signal;
  onPress?: () => void;
}

export const LoloInsightCard = ({ profile, nextAction, signal, onPress }: LoloInsightCardProps) => {
  const riskWindow = getRiskWindow(profile, signal);

  return (
    <DashboardCard title="LOLO Insight" icon="AI" accent="Generated analysis" important onPress={onPress}>
      <Text style={styles.headline}>LOLO sees you as a {profile.persona.toLowerCase()} managing {profile.financialStage.toLowerCase()}.</Text>
      <Text style={styles.body}>
        Your upcoming risk window: {riskWindow}. The clearest action is {nextAction?.title.toLowerCase() ?? profile.topPriorities[0].toLowerCase()}.
      </Text>
      <View style={styles.panel}>
        <Text style={styles.panelLabel}>Why now</Text>
        <Text style={styles.panelText}>{signal?.suggestedAction ?? 'Your profile is stable enough to focus on one high-leverage habit at a time.'}</Text>
      </View>
      {onPress ? <PrimaryButton label="Open next action" onPress={onPress} style={styles.button} /> : null}
    </DashboardCard>
  );
};

const getRiskWindow = (profile: UserProfile, signal?: Signal) => {
  if (signal?.type === 'residency' || profile.persona === 'Med Student') return 'the residency or relocation planning window';
  if (signal?.type === 'international' || profile.persona === 'International Student') return 'the U.S. credit setup window';
  if (signal?.type === 'rent') return 'the next rent and apartment readiness cycle';
  if (signal?.type === 'cash') return 'the next cash-buffer squeeze';
  return 'the next 30 days of credit and cash-flow decisions';
};

const styles = StyleSheet.create({
  headline: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  body: {
    ...typography.body,
    marginTop: spacing.md,
  },
  panel: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  panelLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  panelText: {
    ...typography.small,
    color: colors.textPrimary,
  },
  button: {
    marginTop: spacing.lg,
  },
});
