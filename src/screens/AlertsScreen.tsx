import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { InsightCard, MiniBars } from '../components/MetricWidgets';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { aiRecommendations, spendingDriftSeries, spendingInsights, subscriptions } from '../data/financeMvp';
import { colors, radii, spacing, typography } from '../theme';

export const AlertsScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <ScreenFade>
      <BrandHeader title="Financial Insights" subtitle="Spending behavior, cash pressure, and stress forecast." />

      <Card glow style={styles.hero}>
        <Text style={styles.heroKicker}>What changed</Text>
        <Text style={styles.heroTitle}>Discretionary spend is up 18% while savings rate is down 9%.</Text>
        <Text style={styles.heroBody}>Why it matters: this is the exact pattern that turns a stable month into a tight one before anything looks urgent.</Text>
        <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
      </Card>

      {spendingInsights.map((insight, index) => (
        <DashboardCard
          key={insight.title}
          title={insight.title}
          value={insight.tone}
          subtitle={insight.body}
          icon={index === 0 ? 'LD' : index === 1 ? 'SF' : 'DT'}
          important={index === 1}
        />
      ))}

      <DashboardCard title="Stress forecast" value="2.7 mo" accent="runway" icon="SF">
        <ProgressBar label="Coverage after July pressure" value={58} height={12} />
        <Text style={styles.copy}>What to do next: set a $160 weekly flex cap and move $240 into buffer before June 1.</Text>
      </DashboardCard>

      <Card>
        <SectionHeader title="Recurring subscriptions" subtitle="Small charges kept visible enough to act on." />
        {subscriptions.map((subscription) => (
          <View key={subscription.name} style={styles.subscriptionRow}>
            <View style={styles.subscriptionCopy}>
              <Text style={styles.subscriptionName}>{subscription.name}</Text>
              <Text style={styles.subscriptionMeta}>{subscription.cadence} · {subscription.note}</Text>
            </View>
            <Text style={styles.subscriptionAmount}>{subscription.amount}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.recs}>
        <SectionHeader title="What to do next" subtitle="LOLO keeps recommendations specific and humane." />
        {aiRecommendations.slice(1).map((recommendation) => (
          <InsightCard key={recommendation.title} {...recommendation} />
        ))}
      </Card>
    </ScreenFade>
  </ScrollView>
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
