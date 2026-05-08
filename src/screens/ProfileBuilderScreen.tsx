import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { LineChartMock, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { creditFactors, creditGrowthSeries, creditIntelligence, paymentHistory } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const ProfileBuilderScreen = () => {
  const { profile, resetDemo } = useProfile();
  const [simulatedPayment, setSimulatedPayment] = useState(320);
  const [modalVisible, setModalVisible] = useState(false);

  if (!profile) return null;

  const simulatedUtilization = simulatedPayment >= 500 ? 18 : simulatedPayment >= 320 ? 24 : 31;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="Credit Profile" subtitle="What changed, why it matters, and what to do next." showReset onReset={resetDemo} />

        <Card glow style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={typography.eyebrow}>Credit Health</Text>
              <Text style={styles.heroScore}>82</Text>
            </View>
            <ProgressPill label="Strengthening" status="completed" />
          </View>
          <Text style={styles.heroBody}>
            Your credit foundation is healthy. The next unlock is timing payments before statement close so your reported balance matches your actual habits.
          </Text>
          <LineChartMock values={creditGrowthSeries} />
        </Card>

        <View style={styles.grid}>
          <Card>
            <SectionHeader title="Utilization simulator" subtitle={`Payment scenario: $${simulatedPayment}`} />
            <UtilizationRing value={simulatedUtilization} afterValue={creditIntelligence.afterPayment} />
            <View style={styles.buttonRow}>
              {[180, 320, 500].map((amount) => (
                <PrimaryButton
                  key={amount}
                  label={`$${amount}`}
                  variant={simulatedPayment === amount ? 'primary' : 'ghost'}
                  onPress={() => setSimulatedPayment(amount)}
                  style={styles.amountButton}
                />
              ))}
            </View>
          </Card>

          <DashboardCard title="Recommended action" value="$320" accent="before May 18" icon="NA" important>
            <Text style={styles.copy}>{creditIntelligence.insight}</Text>
            <PrimaryButton label="Create reminder" onPress={() => setModalVisible(true)} style={styles.cardButton} />
          </DashboardCard>
        </View>

        <Card>
          <SectionHeader title="Payment history" subtitle="Consistency is the strongest reputation signal." />
          <View style={styles.historyRow}>
            {paymentHistory.map((item) => (
              <View key={item.month} style={styles.historyItem}>
                <View style={styles.historyDot} />
                <Text style={styles.historyMonth}>{item.month}</Text>
                <Text style={styles.historyStatus}>{item.status}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.factorGrid}>
          <FactorCard title="Helping your profile" items={creditFactors.helping} good />
          <FactorCard title="Holding it back" items={creditFactors.hurting} />
        </View>

        <DashboardCard title="Credit action plan" icon="AP">
          <ActionRow title="This week" body="Schedule $320 before statement close." />
          <ActionRow title="This month" body="Keep new purchases under $240 until the balance reports." />
          <ActionRow title="Next month" body="Split spend across cash/debit and the card so one product does not carry the story." />
        </DashboardCard>

        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <Card glow>
              <Text style={styles.modalTitle}>Reminder mocked</Text>
              <Text style={styles.copy}>Production LOLO would create a calendar reminder or connect to bill pay after user permission.</Text>
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
    backgroundColor: '#102018',
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
    backgroundColor: '#102018',
  },
  watchCard: {
    backgroundColor: '#1C1914',
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
