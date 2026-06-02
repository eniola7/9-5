import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicPageKey } from '../components/PublicHeader';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { DemoCard } from '../components/lolo/DemoCard';
import { SiteNav } from '../components/lolo/SiteNav';
import { MiniBars } from '../components/lolo/Charts';
import { founderStory, spendingDriftSeries, stockScenes, trustSignals } from '../data/financeMvp';
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
  ['Moving to a new city', 'Rent looked manageable until transit, parking, setup costs, and late rideshares became a pattern.'],
  ['Paying off a first card', 'A pre-statement payment lowers utilization and makes credit progress feel less mysterious.'],
  ['Building a 3-month buffer', 'Small automatic transfers turn stability into something visible and repeatable.'],
];

const demoWalkthrough = [
  'Create a profile',
  'Open Today',
  'Understand what changed',
  'Read the monthly review',
  'Reflect on the money moment',
  'Check stress and credit pressure',
  'Take the next best action',
];

export const DemoPresentationScreen = ({ onLaunchDemo, onBack, onNavigate }: DemoPresentationScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    {onNavigate ? <SiteNav active="presentation" onNavigate={onNavigate} onDemo={onLaunchDemo} /> : null}
    <View style={styles.badgeRow}>
      <ProgressPill label="Educational demo" status="completed" />
      <ProgressPill label="Behavioral money signals" />
      <ProgressPill label="Financial wellness insights" />
      <ProgressPill label="Privacy-first architecture" />
    </View>

    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={typography.eyebrow}>Product demo</Text>
        <Text style={styles.headline}>Your financial story, one month at a time.</Text>
        <Text style={styles.subheadline}>
          LOLO helps young professionals understand what changed financially, why it matters, and what to do next without turning money into a spreadsheet.
        </Text>
        <View style={styles.ctaRow}>
          <PrimaryButton label="Open product demo" onPress={onLaunchDemo} />
          <PrimaryButton label="Back to landing" variant="ghost" onPress={onBack} />
        </View>
      </View>

      <DemoCard />
    </View>

    <SectionHeader title="The problem" subtitle="Most financial tools show numbers. LOLO explains the lived pattern behind them." />
    <View style={styles.grid}>
      <ExplainerCard title="Expensive cities distort normal life" body="Rent, commuting, deposits, subscriptions, and social spending can make responsible people feel behind." />
      <ExplainerCard title="Credit is hard to read" body="A stable income can still look risky when utilization reports at the wrong moment." />
      <ExplainerCard title="Advice is often too loud" body="LOLO keeps guidance calm: one clear insight, one reason it matters, one next step." />
    </View>

    <SectionHeader title="Demo walkthrough" subtitle="A story-driven flow around Today, Review, Reflect, and Me." />
    <Card style={styles.lightCard}>
      {demoWalkthrough.map((step, index) => (
        <View key={step} style={styles.walkthroughRow}>
          <Text style={styles.walkthroughStep}>{index + 1}</Text>
          <Text style={styles.walkthroughText}>{step}</Text>
        </View>
      ))}
    </Card>

    <Card style={styles.lightCard}>
      <Text style={styles.lightKicker}>What LOLO measures</Text>
      <View style={styles.signalGrid}>
        {measuredSignals.map((signal) => (
          <Text key={signal} style={styles.signalChip}>{signal}</Text>
        ))}
      </View>
      <Text style={styles.lightBody}>
        LOLO Money Momentum is an educational signal based on these behaviors. It is not a FICO score, VantageScore, credit bureau score, or lending decision.
      </Text>
    </Card>

    <SectionHeader title="How Money Momentum works" subtitle="The Python prototype engine creates fictional users, scores transparent factors, generates recommendations, and exports JSON for the app." />
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
      <SectionHeader title="Founder story" subtitle="A humble starting point." />
      {founderStory.map((paragraph) => (
        <Text key={paragraph} style={styles.founderBody}>{paragraph}</Text>
      ))}
    </Card>

    <Card>
      <SectionHeader title="Trust and privacy" subtitle="The prototype is designed to be clear about what it does and does not do." />
      <View style={styles.signalGrid}>
        {trustSignals.map((signal) => (
          <Text key={signal} style={styles.signalChip}>{signal}</Text>
        ))}
      </View>
    </Card>

    <SectionHeader title="Example user journeys" subtitle="The current demo includes five fictional profiles generated by the local Python engine." />
    <Card style={styles.sceneFeature}>
      <Image source={{ uri: stockScenes[1].imageUrl }} style={styles.sceneImage} />
      <View style={styles.sceneCopy}>
        <Text style={styles.sceneKicker}>Life event context</Text>
        <Text style={styles.sceneTitle}>{stockScenes[1].title}</Text>
        <Text style={styles.sceneBody}>{stockScenes[1].body}</Text>
        <Text style={styles.sceneCredit}>{stockScenes[1].credit}</Text>
      </View>
    </Card>
    <View style={styles.grid}>
      {journeys.map(([title, body]) => (
        <ExplainerCard key={title} title={title} body={body} />
      ))}
    </View>

    <Card glow style={styles.finalCta}>
      <Text style={styles.finalTitle}>Ready to view the product.</Text>
      <Text style={styles.finalBody}>Open the demo to see Today, the monthly review, Reflect, and the private profile layer working together.</Text>
      <PrimaryButton label="Open product demo" onPress={onLaunchDemo} style={styles.finalButton} />
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
  walkthroughRow: {
    alignItems: 'center',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  walkthroughStep: {
    backgroundColor: colors.cardSoft,
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  walkthroughText: {
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '900',
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
  sceneFeature: {
    overflow: 'hidden',
    padding: 0,
  },
  sceneImage: {
    backgroundColor: colors.backgroundElevated,
    height: 240,
    width: '100%',
  },
  sceneCopy: {
    padding: spacing.xl,
  },
  sceneKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  sceneTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
    marginTop: spacing.sm,
  },
  sceneBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  sceneCredit: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
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
