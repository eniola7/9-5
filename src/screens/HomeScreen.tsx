import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { StorySection } from '../components/StorySection';
import { Sparkline, MiniBars } from '../components/lolo/Charts';
import { MetricGrid } from '../components/lolo/MetricGrid';
import { MomentumDial } from '../components/lolo/Momentum';
import { SubscriptionsList } from '../components/lolo/SubscriptionsList';
import { TrustPillars } from '../components/lolo/TrustPillars';
import { cashFlowSeries, spendingDriftSeries } from '../data/financeMvp';
import { loloEngineDisclaimer } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const HomeScreen = () => {
  const { profile, selectedDemoUser } = useProfile();
  const [expanded, setExpanded] = useState(false);

  if (!profile) return null;

  const recommendation = selectedDemoUser.recommendations[0];
  const primaryChange = selectedDemoUser.whatChanged[0] ?? 'Your financial picture stayed mostly steady this month.';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StorySection style={styles.hero}>
        <Text style={typography.eyebrow}>Today · What changed</Text>
        <Text style={styles.title}>The five signals that make a month make sense.</Text>
        <Text style={styles.subtitle}>
          LOLO opens with the shape of the month before asking you to read a transaction feed.
        </Text>
      </StorySection>

      <StorySection delay={80}>
        <Card style={styles.momentumCard}>
          <MomentumDial score={selectedDemoUser.trustScore} delta={selectedDemoUser.upside.points} />
          <Text style={styles.change}>{primaryChange}</Text>
        </Card>
      </StorySection>

      <StorySection delay={150}>
        <Card style={styles.actionCard}>
          <Text style={styles.kicker}>One next best action</Text>
          <Text style={styles.actionTitle}>{recommendation?.title ?? selectedDemoUser.upside.action}</Text>
          <Text style={styles.actionBody}>
            {recommendation?.explanation ?? 'This is the highest leverage action LOLO found in the demo profile.'}
          </Text>
          <View style={styles.actionButtons}>
            <PrimaryButton label="See why" onPress={() => setExpanded(true)} style={styles.actionButton} />
            <PrimaryButton label="Mark planned" variant="ghost" onPress={() => setExpanded(true)} style={styles.actionButton} />
          </View>
        </Card>
      </StorySection>

      <StorySection delay={220}>
        <MetricGrid />
      </StorySection>

      <StorySection delay={290}>
        <View style={styles.chartGrid}>
          <Card>
            <Text style={styles.chartKicker}>Cash flow · 6 months</Text>
            <Text style={styles.chartValue}>{selectedDemoUser.cashFlowLabel}/mo</Text>
            <Sparkline values={cashFlowSeries} />
          </Card>
          <Card>
            <Text style={styles.chartKicker}>Spending drift · 6 months</Text>
            <Text style={styles.chartValue}>{selectedDemoUser.spendingDriftPercent}%</Text>
            <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
          </Card>
        </View>
      </StorySection>

      <StorySection delay={360}>
        <Card style={styles.dark}>
          <Text style={[typography.eyebrow, styles.gold]}>Why it matters</Text>
          <Text style={styles.darkTitle}>Patterns, not shame.</Text>
          <Text style={styles.darkBody}>
            Your emergency runway improved by 18 days this quarter, but dining, commuting, and convenience spending rose 18% over 3 months. At the current pace, your savings buffer may dip below 2 months in August.
          </Text>
        </Card>
      </StorySection>

      <StorySection delay={430}>
        <SectionHeader title="Calm spine" subtitle="The operating signals underneath this month." />
        <TrustPillars />
      </StorySection>

      <StorySection delay={500}>
        <SubscriptionsList />
      </StorySection>

      <Modal transparent visible={expanded} animationType="fade">
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>The useful move is small.</Text>
            <Text style={styles.modalBody}>
              Paying before statement close could lower reported utilization and make next month’s credit picture calmer without changing your entire budget.
            </Text>
            <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
            <PrimaryButton label="Close" onPress={() => setExpanded(false)} style={styles.closeButton} />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 3,
  },
  hero: {
    paddingTop: spacing.md,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 42,
    lineHeight: 47,
    marginTop: spacing.md,
  },
  subtitle: {
    color: colors.inkSoft,
    fontSize: 16,
    lineHeight: 25,
    marginTop: spacing.md,
  },
  momentumCard: {
    backgroundColor: colors.card,
  },
  change: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.xl,
  },
  actionCard: {
    backgroundColor: colors.paper,
  },
  kicker: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  actionTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 32,
    lineHeight: 38,
    marginTop: spacing.md,
  },
  actionBody: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  chartGrid: {
    gap: spacing.md,
  },
  chartKicker: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  chartValue: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 34,
    marginTop: spacing.sm,
  },
  dark: {
    backgroundColor: colors.ink,
  },
  gold: {
    color: colors.gold,
  },
  darkTitle: {
    color: colors.background,
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 40,
    marginTop: spacing.md,
  },
  darkBody: {
    color: 'rgba(250, 251, 246, 0.72)',
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: radii.xl,
  },
  modalTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 30,
    lineHeight: 36,
  },
  modalBody: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.lg,
  },
  closeButton: {
    marginTop: spacing.lg,
  },
});
