import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { DemoUserSwitcher } from '../components/DemoUserSwitcher';
import { InsightCard, MiniBars } from '../components/MetricWidgets';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { spendingDriftSeries } from '../data/financeMvp';
import { loloEngineDisclaimer } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';

export const AlertsScreen = () => {
  const { selectedDemoUser, selectedDemoUserId, setSelectedDemoUserId } = useProfile();
  const drift = selectedDemoUser.spendingDriftPercent;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="Financial Insights" subtitle="Spending behavior, cash pressure, and stress forecast." />
        <DemoUserSwitcher selectedId={selectedDemoUserId} onSelect={setSelectedDemoUserId} />

      <Card glow style={styles.hero}>
        <Text style={styles.heroKicker}>What changed</Text>
        <Text style={styles.heroTitle}>{selectedDemoUser.label}: spending drift is {drift >= 0 ? 'up' : 'down'} {Math.abs(drift)}%.</Text>
        <Text style={styles.heroBody}>Why it matters: this signal comes from the Python engine and connects behavior changes to cash-flow stability and runway.</Text>
        <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
      </Card>

      {selectedDemoUser.whatChanged.map((change, index) => (
        <DashboardCard
          key={change}
          title={index === 0 ? 'Engine signal' : `Behavior signal ${index + 1}`}
          value={index === 0 ? selectedDemoUser.topRisk : 'Pattern'}
          subtitle={change}
          icon={index === 0 ? 'LD' : index === 1 ? 'SF' : 'DT'}
          important={index === 0}
        />
      ))}

      <DashboardCard title="Stress forecast" value={selectedDemoUser.runwayLabel} accent={selectedDemoUser.topRisk} icon="SF">
        <ProgressBar label="Emergency runway coverage" value={Math.min(100, selectedDemoUser.runwayMonths * 25)} height={12} />
        <Text style={styles.copy}>What to do next: {selectedDemoUser.upside.action}</Text>
      </DashboardCard>

      <Card>
        <SectionHeader title="Recurring subscriptions" subtitle="Small charges kept visible enough to act on." />
        {selectedDemoUser.subscriptions.map((subscription) => (
          <View key={subscription.name} style={styles.subscriptionRow}>
            <View style={styles.subscriptionCopy}>
              <Text style={styles.subscriptionName}>{subscription.name}</Text>
              <Text style={styles.subscriptionMeta}>Monthly recurring charge</Text>
            </View>
            <Text style={styles.subscriptionAmount}>${subscription.amount.toFixed(2)}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.recs}>
        <SectionHeader title="What to do next" subtitle="LOLO keeps recommendations specific and humane." />
        {selectedDemoUser.recommendations.map((recommendation) => (
          <InsightCard key={recommendation.title} title={recommendation.title} body={recommendation.explanation} action={`${recommendation.difficulty} difficulty · ${recommendation.estimated_impact}`} />
        ))}
        <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
      </Card>
    </ScreenFade>
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
    paddingBottom: spacing.xxl * 2,
  },
  hero: {
    backgroundColor: '#101814',
  },
  heroKicker: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: spacing.md,
  },
  heroBody: {
    ...typography.body,
    marginTop: spacing.md,
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
  subscriptionRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  subscriptionCopy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  subscriptionName: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  subscriptionMeta: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  subscriptionAmount: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  recs: {
    backgroundColor: '#111714',
  },
});
