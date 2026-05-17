import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { DemoUserSwitcher } from '../components/DemoUserSwitcher';
import { LineChartMock, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { creditGrowthSeries } from '../data/financeMvp';
import { loloEngineDisclaimer, simulationLabels, SimulationKey } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const ProfileBuilderScreen = () => {
  const { profile, resetDemo, selectedDemoUser, selectedDemoUserId, setSelectedDemoUserId } = useProfile();
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationKey>('make_payment');
  const [modalVisible, setModalVisible] = useState(false);

  if (!profile) return null;

  const simulation = selectedDemoUser.simulations[selectedSimulation];
  const recommended = selectedDemoUser.recommendations[0];
  const helping = selectedDemoUser.factorBreakdown.filter((factor) => factor.value >= 80).map((factor) => `${factor.label}: ${factor.next}`);
  const hurting = selectedDemoUser.factorBreakdown.filter((factor) => factor.value < 75).map((factor) => `${factor.label}: ${factor.next}`);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="Credit Profile" subtitle="What changed, why it matters, and what to do next." showReset onReset={resetDemo} />
        <DemoUserSwitcher selectedId={selectedDemoUserId} onSelect={setSelectedDemoUserId} />

        <Card glow style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={typography.eyebrow}>Credit Health</Text>
              <Text style={styles.heroScore}>{selectedDemoUser.score.factor_scores.utilization_control}</Text>
            </View>
            <ProgressPill label={selectedDemoUser.topStrength} status="completed" />
          </View>
          <Text style={styles.heroBody}>
            {selectedDemoUser.rawUser.persona}: utilization is {selectedDemoUser.utilizationLabel}, credit age is {selectedDemoUser.rawUser.credit_age_months} months, and the top risk is {selectedDemoUser.topRisk}.
          </Text>
          <LineChartMock values={creditGrowthSeries} />
        </Card>

        <View style={styles.grid}>
          <Card>
            <SectionHeader title="Simulation from engine output" subtitle={simulationLabels[selectedSimulation]} />
            <UtilizationRing value={selectedDemoUser.utilization} afterValue={Math.max(1, selectedDemoUser.utilization - Math.max(0, simulation.score_delta))} />
            <Text style={styles.simDelta}>{simulation.score_delta >= 0 ? '+' : ''}{simulation.score_delta} Money Momentum points · new signal {simulation.updated_trust_score}</Text>
            <View style={styles.buttonRow}>
              {(['make_payment', 'reduce_category_spending', 'add_emergency_savings'] as SimulationKey[]).map((key) => (
                <PrimaryButton
                  key={key}
                  label={simulationLabels[key]}
                  variant={selectedSimulation === key ? 'primary' : 'ghost'}
                  onPress={() => setSelectedSimulation(key)}
                  style={styles.amountButton}
                />
              ))}
            </View>
            <Text style={styles.copy}>{simulation.explanation}</Text>
          </Card>

          <DashboardCard title="Recommended action" value={recommended?.urgency ?? 'Medium'} accent={recommended?.category ?? 'Credit'} icon="NA" important>
            <Text style={styles.copy}>{recommended?.title}</Text>
            <Text style={styles.copy}>{recommended?.explanation}</Text>
            <PrimaryButton label="Create reminder" onPress={() => setModalVisible(true)} style={styles.cardButton} />
          </DashboardCard>
        </View>

        <Card>
          <SectionHeader title="Payment history" subtitle="Consistency is the strongest reputation signal." />
          <View style={styles.historyRow}>
            {selectedDemoUser.paymentHistory.map((item) => (
              <View key={item.month} style={styles.historyItem}>
                <View style={styles.historyDot} />
                <Text style={styles.historyMonth}>{item.month}</Text>
                <Text style={styles.historyStatus}>{item.status}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.factorGrid}>
          <FactorCard title="Helping your profile" items={helping.length ? helping : [`${selectedDemoUser.topStrength}: strongest current stability signal.`]} good />
          <FactorCard title="Holding it back" items={hurting.length ? hurting : [`${selectedDemoUser.topRisk}: watch this factor next.`]} />
        </View>

        <DashboardCard title="Credit action plan" icon="AP">
          {selectedDemoUser.recommendations.slice(0, 3).map((item) => (
            <ActionRow key={item.title} title={item.category} body={`${item.title}. ${item.estimated_impact}`} />
          ))}
          <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
        </DashboardCard>

        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <Card glow>
              <Text style={styles.modalTitle}>Reminder mocked</Text>
              <Text style={styles.copy}>Production LOLO would create a calendar reminder or connect to bill pay after user permission. Demo source: lolo-engine/sample_output.json.</Text>
              <PrimaryButton label="Close" onPress={() => setModalVisible(false)} style={styles.cardButton} />
            </Card>
          </View>
        </Modal>
      </ScreenFade>
    </ScrollView>
  );
};

const FactorCard = ({ title, items, good }: { title: string; items: string[]; good?: boolean }) => (
  <Card style={good ? styles.goodCard : styles.watchCard}>
    <Text style={styles.factorTitle}>{title}</Text>
    {items.map((item) => (
      <View key={item} style={styles.factorRow}>
        <Text style={good ? styles.goodMarker : styles.watchMarker}>{good ? '+' : '!'}</Text>
        <Text style={styles.factorText}>{item}</Text>
      </View>
    ))}
  </Card>
);

const ActionRow = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.actionRow}>
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  hero: {
    backgroundColor: colors.card,
  },
  heroTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroScore: {
    color: colors.textPrimary,
    fontSize: 78,
    fontWeight: '900',
    lineHeight: 84,
    marginTop: spacing.sm,
  },
  heroBody: {
    ...typography.body,
    marginTop: spacing.lg,
  },
  grid: {
    gap: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  amountButton: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.md,
  },
  simDelta: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  disclaimer: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
  cardButton: {
    marginTop: spacing.lg,
  },
  historyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  historyItem: {
    alignItems: 'center',
    flex: 1,
  },
  historyDot: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    height: 18,
    marginBottom: spacing.sm,
    width: 18,
  },
  historyMonth: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '900',
  },
  historyStatus: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  factorGrid: {
    gap: spacing.lg,
  },
  goodCard: {
    backgroundColor: colors.card,
  },
  watchCard: {
    backgroundColor: colors.cardSoft,
  },
  factorTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  factorRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  goodMarker: {
    color: colors.accent,
    fontWeight: '900',
    width: 18,
  },
  watchMarker: {
    color: colors.warning,
    fontWeight: '900',
    width: 18,
  },
  factorText: {
    ...typography.small,
    flex: 1,
  },
  actionRow: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  actionTitle: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  actionBody: {
    color: colors.textPrimary,
    fontWeight: '800',
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
  },
});
