import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { DemoUserSwitcher } from '../components/DemoUserSwitcher';
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
  spendingDriftSeries,
  upcomingBills,
} from '../data/financeMvp';
import { loloEngineDisclaimer, simulationLabels, SimulationKey } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const HomeScreen = () => {
  const { profile, resetDemo, selectedDemoUser, selectedDemoUserId, setSelectedDemoUserId, sixtySecondDemoActive, startSixtySecondDemo, endSixtySecondDemo } = useProfile();
  const [detail, setDetail] = useState<{ title: string; body: string } | null>(null);
  const [demoStep, setDemoStep] = useState(0);
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationKey>('make_payment');

  if (!profile) return null;

  const activeStep = demoSteps[demoStep];
  const simulation = selectedDemoUser.simulations[selectedSimulation];
  const primaryRecommendation = selectedDemoUser.recommendations[0];
  const trustPillars = [
    {
      title: 'Credit Health',
      value: String(selectedDemoUser.score.factor_scores.utilization_control),
      change: `${selectedDemoUser.priorUtilization}% to ${selectedDemoUser.utilization}%`,
      why: `Utilization is ${selectedDemoUser.utilization}% across ${selectedDemoUser.cards.length} card${selectedDemoUser.cards.length === 1 ? '' : 's'}.`,
      next: primaryRecommendation?.title ?? 'Keep balances low through statement close.',
    },
    {
      title: 'Cash Flow',
      value: selectedDemoUser.cashFlowLabel,
      change: selectedDemoUser.incomeLabel,
      why: `Monthly income ${selectedDemoUser.incomeLabel}, rent ${selectedDemoUser.rentLabel}, and current expense rhythm produce this demo cash-flow view.`,
      next: selectedDemoUser.cashFlow > 0 ? 'Protect this surplus before adding new fixed costs.' : 'Create one small spending adjustment this week.',
    },
    {
      title: 'Stress Forecast',
      value: selectedDemoUser.runwayLabel,
      change: selectedDemoUser.topRisk,
      why: `Emergency savings currently covers about ${selectedDemoUser.runwayLabel} of essential expenses.`,
      next: selectedDemoUser.upside.action,
    },
    {
      title: 'Next Best Action',
      value: primaryRecommendation?.urgency ?? 'Medium',
      change: primaryRecommendation?.category ?? 'Action',
      why: primaryRecommendation?.explanation ?? 'LOLO could not find a recommendation for this profile.',
      next: primaryRecommendation?.title ?? 'Review your profile.',
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="LOLO" subtitle={`Good to see you, ${profile.name}. Your trust operating view is live.`} showReset onReset={resetDemo} />
        <DemoUserSwitcher selectedId={selectedDemoUserId} onSelect={setSelectedDemoUserId} />

        <Card glow style={styles.demoCard}>
          <View style={styles.demoTop}>
            <View style={styles.demoStepBadge}>
              <Text style={styles.demoStepText}>{demoStep + 1}/6</Text>
            </View>
            <Text style={styles.demoKicker}>{sixtySecondDemoActive ? '60-second demo active' : 'Founder demo mode'}</Text>
          </View>
          <Text style={styles.demoTitle}>{activeStep.title}</Text>
          <Text style={styles.demoBody}>{activeStep.body}</Text>
          <Text style={styles.demoBody}>Demo user: {selectedDemoUser.rawUser.name}, {selectedDemoUser.rawUser.persona}. Trust Score {selectedDemoUser.trustScore}.</Text>
          <View style={styles.demoProgress}>
            {demoSteps.map((step, index) => (
              <View key={step.title} style={[styles.demoProgressDot, index <= demoStep && styles.demoProgressDotActive]} />
            ))}
          </View>
          {demoStep === demoSteps.length - 1 ? (
            <View style={styles.finalDemoPanel}>
              <Text style={styles.finalDemoTitle}>This is the trust layer traditional credit misses.</Text>
              <Text style={styles.finalDemoBody}>LOLO helps credit-invisible and credit-misunderstood users build a behavioral trust profile before traditional banks fully understand them.</Text>
            </View>
          ) : null}
          <View style={styles.demoActions}>
            <PrimaryButton label={demoStep === demoSteps.length - 1 ? 'Restart demo' : 'Next step'} onPress={() => setDemoStep((current) => current === demoSteps.length - 1 ? 0 : current + 1)} style={styles.demoButton} />
            <PrimaryButton label={sixtySecondDemoActive ? 'Exit demo' : 'Start 60-sec demo'} variant="ghost" onPress={sixtySecondDemoActive ? endSixtySecondDemo : startSixtySecondDemo} style={styles.demoButton} />
          </View>
        </Card>

        <TrustScoreCard score={selectedDemoUser.trustScore} delta={`+${selectedDemoUser.upside.points} possible`} label={`${selectedDemoUser.label} Trust Score`} />

        <Card>
          <SectionHeader title="Trust Score breakdown" subtitle="LOLO Trust Score is an educational trust signal based on payment consistency, utilization control, cash flow stability, emergency runway, and spending behavior. It is not a FICO score." />
          {selectedDemoUser.factorBreakdown.map((item) => (
            <View key={item.label} style={styles.breakdownRow}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownLabel}>{item.label}</Text>
                <Text style={styles.breakdownChange}>{item.change} pts</Text>
              </View>
              <ProgressBar label={`${item.value}/100`} value={item.value} height={10} />
              <Text style={styles.breakdownWhy}>{item.why}</Text>
              <Text style={styles.breakdownNext}>What to do next: {item.next}</Text>
            </View>
          ))}
          <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
        </Card>

        <Card style={styles.moversCard}>
          <SectionHeader title="Why the score moved this month" subtitle="LOLO separates the movement from the meaning." />
          {selectedDemoUser.whatChanged.map((change, index) => (
            <View key={change} style={styles.moverRow}>
              <Text style={styles.moverTitle}>{index === 0 ? 'What changed' : `Signal ${index + 1}`}</Text>
              <Text style={styles.moverBody}>{change}</Text>
            </View>
          ))}
          <View style={styles.moverRow}>
            <Text style={styles.moverTitle}>Upside preview</Text>
            <Text style={styles.moverBody}>+{selectedDemoUser.upside.points} points possible: {selectedDemoUser.upside.action}.</Text>
          </View>
        </Card>

        <SectionHeader title="What changed" subtitle="The five pillars that explain your financial trust profile." />
        <View style={styles.pillarGrid}>
          {trustPillars.map((pillar) => (
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
          <Text style={styles.demoBadge}>Demo data</Text>
          <Text style={styles.nextKicker}>Next Best Action</Text>
          <Text style={styles.nextTitle}>{primaryRecommendation?.title ?? 'Review your next best action.'}</Text>
          <Text style={styles.nextBody}>
            Why it matters: {primaryRecommendation?.explanation ?? 'LOLO turns financial behavior into one clear next step.'}
          </Text>
          <PrimaryButton label="Mark as scheduled" onPress={() => setDetail({ title: 'Scheduled', body: 'In the production app, this would connect to bank bill pay or create a calendar reminder.' })} style={styles.nextButton} />
        </Card>

        <View style={styles.analyticsGrid}>
          <Card style={styles.analyticsCard}>
            <SectionHeader title="Engine simulation examples" subtitle="Prepared by lolo-engine/sample_output.json" />
            <UtilizationRing value={selectedDemoUser.utilization} afterValue={Math.max(1, selectedDemoUser.utilization - Math.max(0, simulation.score_delta))} />
            <Text style={styles.simUpside}>{simulation.score_delta >= 0 ? '+' : ''}{simulation.score_delta} Trust Score points · {simulation.updated_trust_score} after simulation</Text>
            <View style={styles.scenarioRow}>
              {(['make_payment', 'reduce_category_spending', 'add_emergency_savings'] as SimulationKey[]).map((key) => (
                <PrimaryButton
                  key={key}
                  label={simulationLabels[key]}
                  variant={selectedSimulation === key ? 'primary' : 'ghost'}
                  onPress={() => setSelectedSimulation(key)}
                  style={styles.scenarioButton}
                />
              ))}
            </View>
            <Text style={styles.copy}>{simulation.explanation}</Text>
          </Card>

          <Card style={styles.analyticsCard}>
            <SectionHeader title="Spending drift" subtitle="Convenience spend is the main signal." />
            <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
          </Card>
        </View>

        <DashboardCard title="Cash flow overview" value={selectedDemoUser.cashFlowLabel} accent={selectedDemoUser.spendingDriftPercent > 0 ? `${selectedDemoUser.spendingDriftPercent}% drift` : 'stable'} icon="CF" important>
          <LineChartMock values={cashFlowSeries} />
          <Text style={styles.copy}>Income is stable. The strongest improvement came from fewer one-off transfers and cleaner bill timing.</Text>
        </DashboardCard>

        <DashboardCard title="Emergency runway / stress forecast" value={selectedDemoUser.runwayLabel} accent={selectedDemoUser.topRisk} icon="SF">
          <ProgressBar label="Runway coverage" value={Math.min(100, selectedDemoUser.runwayMonths * 25)} height={12} />
          <Text style={styles.copy}>Why it matters: runway shows how long essential expenses are covered if income gets disrupted. What to do next: {selectedDemoUser.upside.action}.</Text>
        </DashboardCard>

        <Card>
          <SectionHeader title="AI recommendations" subtitle="Calm guidance with a clear next move." />
          {selectedDemoUser.recommendations.map((recommendation) => (
            <InsightCard key={recommendation.title} title={recommendation.title} body={recommendation.explanation} action={`${recommendation.urgency} urgency · ${recommendation.estimated_impact}`} />
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
    backgroundColor: colors.card,
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
    color: colors.textPrimary,
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
  finalDemoPanel: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  finalDemoTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  finalDemoBody: {
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: spacing.sm,
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
    backgroundColor: colors.card,
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
  demoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(8, 13, 11, 0.08)',
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.md,
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  nextKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  nextTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: spacing.md,
  },
  nextBody: {
    color: colors.textSecondary,
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
  disclaimer: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.lg,
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
