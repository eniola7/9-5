import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { InsightCard, LineChartMock, MiniBars, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { TrustScoreCard } from '../components/TrustScoreCard';
import {
  aiRecommendations,
  cashFlowSeries,
  creditGrowthSeries,
  creditIntelligence,
  demoSteps,
  scoreBreakdown,
  scoreMovers,
  spendingDriftSeries,
  trustPillars,
  upcomingBills,
} from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const HomeScreen = () => {
  const { profile, resetDemo } = useProfile();
  const [detail, setDetail] = useState<{ title: string; body: string } | null>(null);
  const [demoStep, setDemoStep] = useState(0);
  const [paymentScenario, setPaymentScenario] = useState(320);

  if (!profile) return null;

  const projectedUtilization = paymentScenario >= 500 ? 18 : paymentScenario >= 320 ? 24 : 31;
  const projectedUpside = paymentScenario >= 500 ? '+22 points possible' : paymentScenario >= 320 ? '+18 points possible' : '+9 points possible';
  const activeStep = demoSteps[demoStep];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="LOLO" subtitle={`Good to see you, ${profile.name}. Your trust operating view is live.`} showReset onReset={resetDemo} />

        <Card glow style={styles.demoCard}>
          <View style={styles.demoTop}>
            <View style={styles.demoStepBadge}>
              <Text style={styles.demoStepText}>{demoStep + 1}/4</Text>
            </View>
            <Text style={styles.demoKicker}>Guided investor demo</Text>
          </View>
          <Text style={styles.demoTitle}>{activeStep.title}</Text>
          <Text style={styles.demoBody}>{activeStep.body}</Text>
          <View style={styles.demoProgress}>
            {demoSteps.map((step, index) => (
              <View key={step.title} style={[styles.demoProgressDot, index <= demoStep && styles.demoProgressDotActive]} />
            ))}
          </View>
          <View style={styles.demoActions}>
            <PrimaryButton label={demoStep === demoSteps.length - 1 ? 'Restart demo' : 'Next step'} onPress={() => setDemoStep((current) => current === demoSteps.length - 1 ? 0 : current + 1)} style={styles.demoButton} />
            <PrimaryButton label="Open context" variant="ghost" onPress={() => setDetail({ title: activeStep.title, body: activeStep.body })} style={styles.demoButton} />
          </View>
        </Card>

        <TrustScoreCard score={742} />

        <Card>
          <SectionHeader title="Trust Score breakdown" subtitle="What changed, why it matters, and what to do next." />
          {scoreBreakdown.map((item) => (
            <View key={item.label} style={styles.breakdownRow}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownLabel}>{item.label}</Text>
                <Text style={styles.breakdownChange}>{item.change}</Text>
              </View>
              <ProgressBar label={`${item.value}/100`} value={item.value} height={10} />
              <Text style={styles.breakdownWhy}>{item.why}</Text>
              <Text style={styles.breakdownNext}>Next: {item.next}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.moversCard}>
          <SectionHeader title="Why the score moved this month" subtitle="LOLO separates the movement from the meaning." />
          {scoreMovers.map((mover) => (
            <View key={mover.title} style={styles.moverRow}>
              <Text style={styles.moverTitle}>{mover.title}</Text>
              <Text style={styles.moverBody}>{mover.body}</Text>
            </View>
          ))}
        </Card>

        <SectionHeader title="What changed" subtitle="The five pillars that explain your financial trust profile." />
        <View style={styles.pillarGrid}>
          {trustPillars.slice(1).map((pillar) => (
            <DashboardCard
              key={pillar.title}
              title={pillar.title}
              value={pillar.value}
              accent={pillar.change}
              subtitle={pillar.why}
              icon={pillar.title.slice(0, 2).toUpperCase()}
              onPress={() => setDetail({ title: pillar.title, body: `${pillar.why}\n\nNext: ${pillar.next}` })}
            />
          ))}
        </View>

        <Card glow style={styles.nextAction}>
          <Text style={styles.nextKicker}>Next Best Action</Text>
          <Text style={styles.nextTitle}>Pay $320 before your statement closes.</Text>
          <Text style={styles.nextBody}>
            Why it matters: this could lower reported utilization from 38% to 24%, improving the credit-health part of your Trust Score.
          </Text>
          <PrimaryButton label="Mark as scheduled" onPress={() => setDetail({ title: 'Scheduled', body: 'In the production app, this would connect to bank bill pay or create a calendar reminder.' })} style={styles.nextButton} />
        </Card>

        <View style={styles.analyticsGrid}>
          <Card style={styles.analyticsCard}>
            <SectionHeader title="Credit utilization simulator" subtitle={`Scenario: pay $${paymentScenario} before May 18`} />
            <UtilizationRing value={projectedUtilization} afterValue={creditIntelligence.afterPayment} />
            <Text style={styles.simUpside}>{projectedUpside}</Text>
            <View style={styles.scenarioRow}>
              {[180, 320, 500].map((amount) => (
                <PrimaryButton
                  key={amount}
                  label={`$${amount}`}
                  variant={paymentScenario === amount ? 'primary' : 'ghost'}
                  onPress={() => setPaymentScenario(amount)}
                  style={styles.scenarioButton}
                />
              ))}
            </View>
          </Card>

          <Card style={styles.analyticsCard}>
            <SectionHeader title="Spending drift" subtitle="Convenience spend is the main signal." />
            <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
          </Card>
        </View>

        <DashboardCard title="Cash flow overview" value="+$860" accent="14% saved" icon="CF" important>
          <LineChartMock values={cashFlowSeries} />
          <Text style={styles.copy}>Income is stable. The strongest improvement came from fewer one-off transfers and cleaner bill timing.</Text>
        </DashboardCard>

        <DashboardCard title="Emergency runway / stress forecast" value="2.7 mo" accent="July watch" icon="SF">
          <ProgressBar label="Runway coverage" value={68} height={12} />
          <Text style={styles.copy}>Travel and insurance renewal could pull runway below 2 months unless $240 moves into buffer before June 1.</Text>
        </DashboardCard>

        <Card>
          <SectionHeader title="AI recommendations" subtitle="Calm guidance with a clear next move." />
          {aiRecommendations.map((recommendation) => (
            <InsightCard key={recommendation.title} {...recommendation} />
          ))}
        </Card>

        <DashboardCard title="Upcoming money events" icon="ME">
          {upcomingBills.map((bill) => (
            <BillRow key={bill.name} label={bill.name} value={bill.amount} meta={`${bill.due} · ${bill.status}`} />
          ))}
        </DashboardCard>

        <DetailModal detail={detail} onClose={() => setDetail(null)} />
      </ScreenFade>
    </ScrollView>
  );
};

const BillRow = ({ label, value, meta }: { label: string; value: string; meta: string }) => (
  <View style={styles.billRow}>
    <View style={styles.billCopy}>
      <Text style={styles.billLabel}>{label}</Text>
      <Text style={styles.billMeta}>{meta}</Text>
    </View>
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
    gap: spacing.sm,
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  pillarGrid: {
    gap: spacing.lg,
  },
  demoCard: {
    backgroundColor: '#101814',
  },
  demoTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  demoStepBadge: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  demoStepText: {
    color: colors.background,
    fontWeight: '900',
  },
  demoKicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  demoTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
    marginTop: spacing.lg,
  },
  demoBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  demoProgress: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  demoProgressDot: {
    backgroundColor: colors.cardSoft,
    borderRadius: radii.pill,
    flex: 1,
    height: 6,
  },
  demoProgressDotActive: {
    backgroundColor: colors.primary,
  },
  demoActions: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  demoButton: {
    flex: 1,
  },
  breakdownRow: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    paddingVertical: spacing.lg,
  },
  breakdownHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  breakdownLabel: {
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '900',
  },
  breakdownChange: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  breakdownWhy: {
    ...typography.small,
    marginTop: spacing.sm,
  },
  breakdownNext: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  moversCard: {
    backgroundColor: '#111714',
  },
  moverRow: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  moverTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  moverBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  nextAction: {
    backgroundColor: colors.surfaceLight,
  },
  nextKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  nextTitle: {
    color: colors.background,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: spacing.md,
  },
  nextBody: {
    color: '#405047',
    fontSize: 15,
    lineHeight: 23,
    marginTop: spacing.md,
  },
  nextButton: {
    marginTop: spacing.xl,
  },
  analyticsGrid: {
    gap: spacing.lg,
  },
  analyticsCard: {
    minHeight: 260,
  },
  simUpside: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  scenarioRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  scenarioButton: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.md,
  },
  billRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  billCopy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  billLabel: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  billMeta: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  billValue: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
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
