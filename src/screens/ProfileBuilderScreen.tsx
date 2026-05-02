import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MetricBar } from '../components/MetricBar';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { publicBenchmarks } from '../data/publicBenchmarks';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';

export const ProfileBuilderScreen = () => {
  const { profile, plan, resetDemo } = useProfile();
  if (!profile) return null;

  const relevantBenchmarks = publicBenchmarks.filter((benchmark) => benchmark.appliesTo.includes(profile.persona));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
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

      <Card>
        <SectionHeader title="Readiness profile" subtitle={`Recommended LOLO track: ${profile.recommendedTrack}. Current plan: ${plan}.`} />
        <MetricBar label="Credit readiness" value={profile.creditReadinessScore} />
        <View style={styles.spacer} />
        <MetricBar label="Financial readiness" value={profile.financialReadinessScore} />
        <View style={styles.spacer} />
        <MetricBar label="Confidence meter" value={profile.confidenceScore} />
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
    </ScrollView>
  );
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
