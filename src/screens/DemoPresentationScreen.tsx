import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { InsightCard, LineChartMock, MiniBars, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicHeader, PublicPageKey } from '../components/PublicHeader';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { aiRecommendations, creditGrowthSeries, spendingDriftSeries } from '../data/financeMvp';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface DemoPresentationScreenProps {
  onLaunchDemo: () => void;
  onBack: () => void;
  onNavigate?: (page: PublicPageKey) => void;
}

const measuredSignals = [
  'Payment consistency',
  'Utilization control',
  'Cash flow stability',
  'Emergency runway',
  'Spending behavior',
];

const journeys = [
  ['Recent immigrant', 'Builds a U.S. trust profile before credit age reflects reliability.'],
  ['College student', 'Learns which habits matter before credit mistakes become expensive.'],
  ['Early professional', 'Uses payment timing to make utilization tell a fairer story.'],
];

export const DemoPresentationScreen = ({ onLaunchDemo, onBack, onNavigate }: DemoPresentationScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    {onNavigate ? <PublicHeader active="presentation" onNavigate={onNavigate} onDemo={onLaunchDemo} /> : null}
    <View style={styles.badgeRow}>
      <ProgressPill label="Educational demo" status="completed" />
      <ProgressPill label="Behavioral trust signals" />
      <ProgressPill label="Financial wellness insights" />
      <ProgressPill label="Privacy-first architecture" />
    </View>

    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={typography.eyebrow}>Founder / advisor overview</Text>
        <Text style={styles.headline}>A behavioral trust profile before traditional credit catches up.</Text>
        <Text style={styles.subheadline}>
          LOLO helps credit-invisible and credit-misunderstood users understand, improve, and communicate financial reliability through educational trust signals.
        </Text>
        <View style={styles.ctaRow}>
          <PrimaryButton label="Launch 60-second demo" onPress={onLaunchDemo} />
          <PrimaryButton label="Back to landing" variant="ghost" onPress={onBack} />
        </View>
      </View>

      <Card glow style={styles.mockup}>
        <View style={styles.mockTop}>
          <View>
            <Text style={styles.mockLabel}>Demo Trust Score</Text>
            <Text style={styles.mockScore}>742</Text>
          </View>
          <Text style={styles.mockDelta}>+18 possible</Text>
        </View>
        <LineChartMock values={creditGrowthSeries} />
        <InsightCard {...aiRecommendations[0]} />
      </Card>
    </View>

    <SectionHeader title="The problem" subtitle="Official credit scores are important, but they can miss context for people whose financial reliability is still becoming visible." />
    <View style={styles.grid}>
      <ExplainerCard title="Thin files" body="New-to-credit consumers may have stable behavior before enough history exists in a bureau file." />
      <ExplainerCard title="Misread signals" body="A stable income can still look risky when utilization reports at the wrong moment." />
      <ExplainerCard title="No behavior layer" body="Traditional scores rarely explain cash rhythm, emergency runway, and habit momentum in user-friendly language." />
    </View>

    <Card style={styles.lightCard}>
      <Text style={styles.lightKicker}>What LOLO measures</Text>
      <View style={styles.signalGrid}>
        {measuredSignals.map((signal) => (
          <Text key={signal} style={styles.signalChip}>{signal}</Text>
        ))}
      </View>
      <Text style={styles.lightBody}>
        LOLO Trust Score is an educational signal based on these behaviors. It is not a FICO score, VantageScore, credit bureau score, or lending decision.
      </Text>
    </Card>

    <SectionHeader title="How the Trust Score works" subtitle="The Python prototype engine creates fictional users, scores transparent factors, generates recommendations, and exports JSON for the app." />
    <View style={styles.twoUp}>
      <Card>
        <Text style={styles.cardTitle}>Behavior to score</Text>
        <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Action to delta</Text>
        <UtilizationRing value={38} afterValue={24} />
        <Text style={styles.cardBody}>Prepared simulations show score delta, changed factors, and plain-English explanations.</Text>
      </Card>
    </View>

    <Card style={styles.founder}>
      <SectionHeader title="Founder story" subtitle="LOLO comes from a simple frustration: people can be financially reliable before traditional systems know how to see them." />
      <Text style={styles.founderBody}>
        The product explores behavioral finance and trust as a user-first layer: help people understand what builds reliability, show progress earlier, and eventually let users share that trust profile with consent.
      </Text>
    </Card>

    <SectionHeader title="Example user journeys" subtitle="The current demo includes five fictional profiles generated by the local Python engine." />
    <View style={styles.grid}>
      {journeys.map(([title, body]) => (
        <ExplainerCard key={title} title={title} body={body} />
      ))}
    </View>

    <Card glow style={styles.finalCta}>
      <Text style={styles.finalTitle}>Ready to view the product.</Text>
      <Text style={styles.finalBody}>Launch the guided demo to see the selected user, Trust Score, score movement, simulation, and AI next-best-action.</Text>
      <PrimaryButton label="Launch 60-second demo" onPress={onLaunchDemo} style={styles.finalButton} />
    </Card>
    {onNavigate ? <Footer onNavigate={onNavigate} onDemo={onLaunchDemo} /> : null}
  </ScrollView>
);

const ExplainerCard = ({ title, body }: { title: string; body: string }) => (
  <Card style={styles.explainer}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardBody}>{body}</Text>
  </Card>
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
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  hero: {
    gap: spacing.xl,
    marginBottom: spacing.xxl,
  },
  heroCopy: {
    paddingTop: spacing.lg,
  },
  headline: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 54,
    marginTop: spacing.md,
  },
  subheadline: {
    color: colors.textSecondary,
    fontSize: 18,
    lineHeight: 28,
    marginTop: spacing.lg,
  },
  ctaRow: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  mockup: {
    backgroundColor: colors.card,
    ...shadows.glow,
  },
  mockTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  mockLabel: {
    color: colors.textSecondary,
    fontWeight: '900',
  },
  mockScore: {
    color: colors.textPrimary,
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 78,
  },
  mockDelta: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  grid: {
    gap: spacing.lg,
  },
  twoUp: {
    gap: spacing.lg,
  },
  explainer: {
    backgroundColor: colors.card,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 26,
  },
  cardBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  lightCard: {
    backgroundColor: colors.surfaceLight,
  },
  lightKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  signalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  signalChip: {
    backgroundColor: 'rgba(8, 13, 11, 0.08)',
    borderRadius: radii.pill,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  lightBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.lg,
  },
  founder: {
    backgroundColor: colors.card,
  },
  founderBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  finalCta: {
    backgroundColor: colors.card,
    marginTop: spacing.xl,
  },
  finalTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
  },
  finalBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  finalButton: {
    marginTop: spacing.xl,
  },
});
