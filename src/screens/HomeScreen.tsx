import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MetricBar } from '../components/MetricBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';
import { Signal } from '../types';

export const HomeScreen = () => {
  const { profile, roadmap, signals, plan, resetDemo } = useProfile();
  const [detail, setDetail] = useState<{ title: string; body: string } | null>(null);
  const progress = useMemo(() => {
    if (!roadmap.length) return 0;
    return Math.round((roadmap.filter((item) => item.completed).length / roadmap.length) * 100);
  }, [roadmap]);

  if (!profile) return null;

  const nextAction = roadmap.find((item) => !item.completed);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <BrandHeader title="LOLO" subtitle={`Hi ${profile.name}. ${profile.persona}`} showReset onReset={resetDemo} />

      <Card glow>
        <View style={styles.heroRow}>
          <View style={styles.heroCopy}>
            <Text style={typography.eyebrow}>Financial readiness</Text>
            <Text style={styles.bigScore}>{profile.financialReadinessScore}</Text>
            <Text style={styles.copy}>Based on your inputs and general student financial benchmarks.</Text>
          </View>
          <ProgressPill label={`${plan} Track`} risk={profile.riskLevel} />
        </View>
        <MetricBar label="Confidence meter" value={profile.confidenceScore} />
      </Card>

      <View style={styles.grid}>
        <Pressable style={styles.gridItem} onPress={() => setDetail({ title: 'Credit improvement tips', body: 'Keep utilization low, avoid unnecessary applications, and protect on-time payments. LOLO does not guarantee credit score changes.' })}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>Credit health</Text>
            <Text style={styles.metricValue}>{profile.creditReadinessScore}</Text>
          </Card>
        </Pressable>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Cash buffer</Text>
          <Text style={styles.metricValue}>{profile.cashBufferMonths} mo</Text>
        </Card>
      </View>

      <Pressable onPress={() => nextAction && setDetail({ title: nextAction.title, body: `${nextAction.description}\n\nWhy this matters: ${nextAction.whyItMatters}` })}>
        <Card>
          <SectionHeader title="Next best action" subtitle={nextAction?.description ?? 'Your core roadmap is complete.'} />
          <PrimaryButton label={nextAction ? 'View action detail' : 'Review profile'} onPress={() => nextAction && setDetail({ title: nextAction.title, body: nextAction.whyItMatters })} />
        </Card>
      </Pressable>

      <Card>
        <SectionHeader title="Roadmap progress" subtitle={`${progress}% complete`} />
        <MetricBar label="Completion" value={progress} />
      </Card>

      <Card>
        <SectionHeader title="Upcoming bills" subtitle="Demo cash-flow reminders." />
        <BillRow label="Rent" value={`$${profile.answers.monthlyRent.toLocaleString()}`} />
        <BillRow label="Student loan planning" value={profile.answers.studentLoanAmount > 0 ? 'Review' : 'No loan added'} />
      </Card>

      <SectionHeader title="LOLO Signals" subtitle="Rule-based risk signals, not predictions." />
      {signals.slice(0, 3).map((signal) => (
        <SignalCard key={signal.id} signal={signal} onPress={() => setDetail({ title: signal.title, body: `${signal.whyItMatters}\n\nSuggested action: ${signal.suggestedAction}` })} />
      ))}

      <DetailModal detail={detail} onClose={() => setDetail(null)} />
    </ScrollView>
  );
};

const SignalCard = ({ signal, onPress }: { signal: Signal; onPress: () => void }) => (
  <Pressable onPress={onPress}>
    <Card>
      <View style={styles.row}>
        <Text style={styles.signalTitle}>{signal.title}</Text>
        <ProgressPill label={signal.riskLevel} risk={signal.riskLevel} />
      </View>
      <Text style={styles.copy}>{signal.suggestedAction}</Text>
    </Card>
  </Pressable>
);

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
    paddingBottom: spacing.xxl,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroCopy: {
    flex: 1,
  },
  bigScore: {
    color: colors.textPrimary,
    fontSize: 58,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  copy: {
    ...typography.body,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  gridItem: {
    flex: 1,
  },
  metricCard: {
    flex: 1,
    minHeight: 116,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  metricValue: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  signalTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
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
