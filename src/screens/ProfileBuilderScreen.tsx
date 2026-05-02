import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { LoloInsightCard } from '../components/LoloInsightCard';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { publicBenchmarks } from '../data/publicBenchmarks';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';

export const ProfileBuilderScreen = () => {
  const { profile, plan, resetDemo, roadmap, signals } = useProfile();
  if (!profile) return null;

  const relevantBenchmarks = publicBenchmarks.filter((benchmark) => benchmark.appliesTo.includes(profile.persona));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="LOLO Profile" subtitle="Your generated financial profile." showReset onReset={resetDemo} />

      <Card glow>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={typography.eyebrow}>{profile.persona}</Text>
            <Text style={styles.title}>{profile.financialStage}</Text>
          </View>
          <ProgressPill label={profile.riskLevel} risk={profile.riskLevel} />
        </View>
        <Text style={styles.copy}>{profile.summary}</Text>
        <Text style={styles.disclaimer}>Based on your inputs and general student financial benchmarks.</Text>
      </Card>

      <LoloInsightCard profile={profile} nextAction={roadmap.find((item) => !item.completed)} signal={signals[0]} />

      <DashboardCard title="LOLO sees you as..." icon="ID" important>
        <Text style={styles.analysisTitle}>{getPersonaInsight(profile.persona)}</Text>
        <Text style={styles.copy}>
          LOLO is weighting your credit setup, rent burden, loan timing, and current goal to generate a practical readiness profile.
        </Text>
      </DashboardCard>

      <Card>
        <SectionHeader title="Readiness profile" subtitle={`Recommended LOLO track: ${profile.recommendedTrack}. Current plan: ${plan}.`} />
        <ProgressBar label="Credit readiness" value={profile.creditReadinessScore} />
        <View style={styles.spacer} />
        <ProgressBar label="Financial readiness" value={profile.financialReadinessScore} />
        <View style={styles.spacer} />
        <ProgressBar label="Confidence meter" value={profile.confidenceScore} />
        <Text style={styles.confidenceNote}>
          Confidence reflects how complete and stable your demo profile appears. It is not a credit guarantee.
        </Text>
      </Card>

      <Card>
        <SectionHeader title="Top 3 priorities" />
        {profile.topPriorities.map((priority, index) => (
          <View key={priority} style={styles.priorityRow}>
            <Text style={styles.priorityIndex}>{index + 1}</Text>
            <Text style={styles.priorityText}>{priority}</Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Mock benchmark context" subtitle="Clearly mocked, public/internet-style benchmarks for this demo." />
        {relevantBenchmarks.map((benchmark) => (
          <Card key={benchmark.id}>
            <Text style={styles.benchmarkLabel}>{benchmark.label}</Text>
            <Text style={styles.benchmarkValue}>{benchmark.value}</Text>
            <Text style={styles.copy}>{benchmark.insight}</Text>
          </Card>
        ))}
      </ScreenFade>
    </ScrollView>
  );
};

const getPersonaInsight = (persona: string) => {
  if (persona === 'Med Student') return 'a future high-earning professional with a near-term relocation and housing window.';
  if (persona === 'International Student') return 'a student building a U.S. financial identity while avoiding unnecessary credit friction.';
  if (persona === 'Law Student' || persona === 'MBA Student') return 'a professional student balancing delayed income with high planning stakes.';
  if (persona === 'Young Professional') return 'an early-career builder ready to turn cash flow into a repeatable system.';
  return 'a student credit builder who benefits most from simple habits and predictable payments.';
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.md,
  },
  analysisTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
    marginTop: spacing.md,
  },
  confidenceNote: {
    ...typography.small,
    color: colors.accent,
    marginTop: spacing.lg,
  },
  disclaimer: {
    color: colors.accent,
    marginTop: spacing.md,
    fontWeight: '800',
    fontSize: 12,
  },
  spacer: {
    height: spacing.lg,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  priorityIndex: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '900',
    width: 28,
  },
  priorityText: {
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '800',
  },
  benchmarkLabel: {
    color: colors.textPrimary,
    fontWeight: '900',
    fontSize: 16,
  },
  benchmarkValue: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
});
