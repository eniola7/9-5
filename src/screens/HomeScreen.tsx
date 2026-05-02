import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { LoloInsightCard } from '../components/LoloInsightCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { SignalCard } from '../components/SignalCard';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const HomeScreen = () => {
  const { profile, roadmap, signals, plan, resetDemo } = useProfile();
  const [detail, setDetail] = useState<{ title: string; body: string } | null>(null);
  const progress = useMemo(() => {
    if (!roadmap.length) return 0;
    return Math.round((roadmap.filter((item) => item.completed).length / roadmap.length) * 100);
  }, [roadmap]);

  if (!profile) return null;

  const nextAction = roadmap.find((item) => !item.completed);
  const biggestRisk = signals.find((signal) => signal.riskLevel === 'High') ?? signals[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="LOLO" subtitle={`Good to see you, ${profile.name}. ${profile.persona}`} showReset onReset={resetDemo} />

      <Card glow style={styles.commandCenter}>
        <View style={styles.commandTop}>
          <View style={styles.visualIndicator}>
            <Text style={styles.visualText}>LI</Text>
          </View>
          <ProgressPill label={`${plan} Track`} risk={profile.riskLevel} />
        </View>

        <Text style={typography.eyebrow}>Command center</Text>
        <View style={styles.scoreRow}>
          <View>
            <Text style={styles.score}>{profile.financialReadinessScore}</Text>
            <Text style={styles.scoreLabel}>readiness score</Text>
          </View>
          <View style={styles.riskPanel}>
            <Text style={styles.riskLabel}>Risk summary</Text>
            <Text style={styles.riskValue}>{profile.riskLevel}</Text>
            <Text style={styles.riskBody}>{biggestRisk?.title ?? 'No urgent risk signals'}</Text>
          </View>
        </View>

        <View style={styles.biggestRisk}>
          <Text style={styles.biggestRiskLabel}>Biggest risk</Text>
          <Text style={styles.biggestRiskText}>{biggestRisk?.suggestedAction ?? 'Keep following your roadmap and preserve your cash buffer.'}</Text>
        </View>

        <ProgressBar label="Confidence meter" value={profile.confidenceScore} height={12} />
        <PrimaryButton
          label={nextAction ? `Next: ${nextAction.title}` : 'Review profile'}
          onPress={() => setDetail({
            title: nextAction?.title ?? 'Profile review',
            body: nextAction ? `${nextAction.description}\n\nWhy this matters: ${nextAction.whyItMatters}` : profile.summary,
          })}
          style={styles.heroButton}
        />
      </Card>

      <LoloInsightCard
        profile={profile}
        nextAction={nextAction}
        signal={biggestRisk}
        onPress={() => nextAction && setDetail({ title: nextAction.title, body: nextAction.whyItMatters })}
      />

      <View style={styles.metricGrid}>
        <DashboardCard
          title="Credit health"
          value={`${profile.creditReadinessScore}`}
          subtitle="Low utilization and payment rhythm matter most."
          icon="CR"
          onPress={() => setDetail({ title: 'Credit improvement tips', body: 'Keep utilization low, avoid unnecessary applications, and protect on-time payments. LOLO does not guarantee credit score changes.' })}
        />
        <DashboardCard
          title="Cash buffer"
          value={`${profile.cashBufferMonths} mo`}
          subtitle={`Rent burden: ${profile.rentBurdenPercent}%`}
          icon="$"
        />
      </View>

      <DashboardCard title="Roadmap progress" icon="RM" accent={`${progress}% complete`}>
        <ProgressBar label="Completion" value={progress} height={12} />
      </DashboardCard>

      <SectionHeader title="Signals surfaced now" subtitle="The dashboard shows the highest-leverage LOLO Signals directly." />
      {signals.slice(0, 2).map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          compact
          onPress={() => setDetail({ title: signal.title, body: `${signal.whyItMatters}\n\nSuggested action: ${signal.suggestedAction}` })}
        />
      ))}

      <DashboardCard title="Upcoming bills" icon="BI">
        <BillRow label="Rent" value={`$${profile.answers.monthlyRent.toLocaleString()}`} />
        <BillRow label="Student loan planning" value={profile.answers.studentLoanAmount > 0 ? 'Review' : 'No loan added'} />
      </DashboardCard>

        <DetailModal detail={detail} onClose={() => setDetail(null)} />
      </ScreenFade>
    </ScrollView>
  );
};

const BillRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.billRow}>
    <Text style={styles.billLabel}>{label}</Text>
    <Text style={styles.billValue}>{value}</Text>
  </View>
);

const DetailModal = ({ detail, onClose }: { detail: { title: string; body: string } | null; onClose: () => void }) => (
  <Modal transparent visible={!!detail} animationType="fade">
    <View style={styles.modalOverlay}>
      <Card style={styles.modalCard} glow>
        <Text style={styles.modalTitle}>{detail?.title}</Text>
        <Text style={styles.copy}>{detail?.body}</Text>
        <PrimaryButton label="Close" onPress={onClose} style={styles.modalButton} />
      </Card>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
    gap: spacing.sm,
  },
  commandCenter: {
    padding: spacing.xxl,
    backgroundColor: '#111A14',
  },
  commandTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  visualIndicator: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  visualText: {
    color: colors.accent,
    fontWeight: '900',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  score: {
    color: colors.textPrimary,
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 78,
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  riskPanel: {
    flex: 1,
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  riskLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  riskValue: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  riskBody: {
    ...typography.small,
    marginTop: spacing.sm,
  },
  biggestRisk: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    paddingLeft: spacing.md,
    marginBottom: spacing.xl,
  },
  biggestRiskLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  biggestRiskText: {
    color: colors.textPrimary,
    fontWeight: '800',
    lineHeight: 20,
  },
  heroButton: {
    marginTop: spacing.xl,
  },
  metricGrid: {
    gap: spacing.lg,
  },
  copy: {
    ...typography.body,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  billLabel: {
    color: colors.textSecondary,
  },
  billValue: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    borderRadius: radii.xl,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  modalButton: {
    marginTop: spacing.xl,
  },
});
