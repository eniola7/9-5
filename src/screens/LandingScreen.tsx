import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { InsightCard, LineChartMock, MiniBars, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicHeader, PublicPageKey } from '../components/PublicHeader';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { aiRecommendations, creditGrowthSeries, demoMetrics, founderStory, roadmapItems, spendingDriftSeries, trustPillars, trustSignals } from '../data/financeMvp';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface LandingScreenProps {
  onStart: () => void;
  onDemo: () => void;
  onPresentation: () => void;
  onNavigate: (page: PublicPageKey) => void;
}

const featureSections = [
  ['Financial snapshot', 'A calm read on cash flow, credit utilization, subscriptions, runway, and spending pressure.'],
  ['Money Momentum', 'An educational signal that shows whether daily habits are making life feel steadier or tighter.'],
  ['Credit clarity', 'Statement timing, utilization, payment history, and payment actions in one readable profile.'],
  ['Spending drift', 'Behavioral analytics that catch subscription creep and convenience spending before they become stress.'],
  ['Money journal', 'Private reflections, monthly reviews, and tasteful social proof without net-worth flexing.'],
];

const whyMatters = [
  ['Immigrants with thin files', 'A stable job, rent payments, and careful habits can exist before a traditional credit file catches up.'],
  ['Students building credit', 'Early habits matter, but most tools explain credit only after mistakes become expensive.'],
  ['Early professionals with high utilization', 'A strong income can still look risky if statement timing tells the wrong story.'],
  ['Renters proving reliability', 'LOLO turns payment consistency and runway into a clearer stability narrative for housing moments.'],
  ['Families building stability', 'Progress can be slow and responsible; the system should make that visible.'],
];

export const LandingScreen = ({ onStart, onDemo, onPresentation, onNavigate }: LandingScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <PublicHeader active="landing" onNavigate={onNavigate} onDemo={onDemo} />

    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={typography.eyebrow}>A calm financial operating system for young professionals</Text>
        <Text style={styles.headline}>Financial clarity for people building real lives.</Text>
        <Text style={styles.subheadline}>
          Money is stressful enough. LOLO helps you see where you stand, where you are heading, and what small action would make next month feel more stable.
        </Text>
        <View style={styles.ctaRow}>
          <PrimaryButton label="Start with clarity" onPress={onStart} style={styles.cta} />
          <PrimaryButton label="View 60-second demo" variant="ghost" onPress={onDemo} />
          <PrimaryButton label="Read demo brief" variant="ghost" onPress={onPresentation} />
        </View>
        <View style={styles.trustRow}>
          {trustSignals.slice(0, 4).map((item) => (
            <Text key={item} style={styles.trustChip}>{item}</Text>
          ))}
        </View>
      </View>

      <Card glow style={styles.mockup}>
        <View style={styles.mockTop}>
          <View>
            <Text style={styles.mockLabel}>Money Momentum</Text>
            <Text style={styles.mockScore}>742</Text>
          </View>
          <Text style={styles.mockDelta}>+18 this month</Text>
        </View>
        <ProgressBar label="Stability trend" value={86} height={12} />
        <View style={styles.mockGrid}>
          <View style={styles.mockPanel}>
            <Text style={styles.mockPanelLabel}>Credit growth</Text>
            <LineChartMock values={creditGrowthSeries} />
          </View>
          <View style={styles.mockPanel}>
            <Text style={styles.mockPanelLabel}>Utilization</Text>
            <UtilizationRing value={38} afterValue={24} />
          </View>
        </View>
        <InsightCard {...aiRecommendations[0]} />
      </Card>
    </View>

    <Card style={styles.incomplete}>
      <SectionHeader title="Money gets complicated in real life" subtitle="Rent, commuting, credit utilization, subscriptions, and moving costs all interact. LOLO makes those patterns easier to understand without shame or noise." />
      <View style={styles.storyGrid}>
        <StoryPoint title="Credit is only one piece" body="LOLO helps you connect payment timing, cash flow stability, recurring pressure, and follow-through." />
        <StoryPoint title="Insights should be usable" body="Every major card answers: what changed, why it matters, and what to do next." />
        <StoryPoint title="Progress should feel visible" body="Moving cities, paying off a first card, or building a buffer should become part of a clear financial story." />
      </View>
    </Card>

    <SectionHeader title="Why this matters" subtitle="LOLO helps people who are building stability in expensive, imperfect, real-world conditions." />
    <View style={styles.whyGrid}>
      {whyMatters.map(([title, body]) => (
        <Card key={title} style={styles.whyCard}>
          <Text style={styles.whyTitle}>{title}</Text>
          <Text style={styles.whyBody}>{body}</Text>
        </Card>
      ))}
    </View>

    <Card glow style={styles.metrics}>
      <Text style={styles.metricsKicker}>Built for people whose financial lives are more nuanced than a single score.</Text>
      <Text style={styles.metricsNote}>Placeholder demo metrics for investor storytelling, not production claims.</Text>
      <View style={styles.metricsGrid}>
        {demoMetrics.map((metric) => (
          <View key={metric.label} style={styles.metricTile}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>
    </Card>

    <SectionHeader title="The five pillars" subtitle="A clearer way to understand money habits, credit behavior, and future pressure." />
    <View style={styles.pillarGrid}>
      {trustPillars.map((pillar) => (
        <Card key={pillar.title} style={styles.pillar}>
          <Text style={styles.pillarTitle}>{pillar.title}</Text>
          <Text style={styles.pillarValue}>{pillar.value}</Text>
          <Text style={styles.pillarWhy}>{pillar.why}</Text>
          <Text style={styles.pillarNext}>{pillar.next}</Text>
        </Card>
      ))}
    </View>

    <Card style={styles.analytics}>
      <SectionHeader title="Spending drift that feels human" subtitle="Not a scolding budget. A financial behavior layer that names patterns early." />
      <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
    </Card>

    <SectionHeader title="Product surface" subtitle="Investor-ready modules for desktop command center and Glass Wallet mobile." />
    <View style={styles.features}>
      {featureSections.map(([title, body], index) => (
        <Card key={title} glow={index === 0} style={styles.featureCard}>
          <Text style={styles.featureIndex}>0{index + 1}</Text>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureBody}>{body}</Text>
        </Card>
      ))}
    </View>

    <Card style={styles.social}>
      <SectionHeader
        title="A journal for the money moments people actually remember"
        subtitle="Milestones, monthly reviews, product notes, cities, apartments, and life decisions, kept tasteful and practical."
        eyebrow="Reflection layer"
      />
      <View style={styles.socialPreview}>
        <Text style={styles.socialTitle}>Built my first 3-month emergency fund</Text>
        <Text style={styles.socialBody}>Same life, less background noise. The win was not dramatic, just repeatable.</Text>
        <Text style={styles.socialMeta}>5.0 rating · emergency fund · 211 helpful</Text>
      </View>
    </Card>

    <Card style={styles.incomplete}>
      <SectionHeader title="Founder story" subtitle="A small, honest starting point." />
      <Text style={styles.founderBody}>{founderStory}</Text>
    </Card>

    <Card glow style={styles.finalCta}>
      <Text style={styles.finalTitle}>See where you stand. Know what to do next.</Text>
      <Text style={styles.finalBody}>Understand your spending, improve credit habits, and build stability without shame or noise.</Text>
      <PrimaryButton label="Start with clarity" onPress={onStart} style={styles.finalButton} />
      <PrimaryButton label="View 60-second demo" variant="ghost" onPress={onDemo} style={styles.demoButton} />
      <PrimaryButton label="Open demo presentation" variant="ghost" onPress={onPresentation} style={styles.demoButton} />
    </Card>

    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Roadmap</Text>
      <View style={styles.roadmapGrid}>
        {roadmapItems.map((item) => (
          <Text key={item} style={styles.roadmapItem}>{item}</Text>
        ))}
      </View>
    </View>
    <Footer onNavigate={onNavigate} onDemo={onDemo} />
  </ScrollView>
);

const StoryPoint = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.storyPoint}>
    <Text style={styles.storyTitle}>{title}</Text>
    <Text style={styles.storyBody}>{body}</Text>
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
    gap: spacing.xl,
    marginBottom: spacing.xxl,
  },
  heroCopy: {
    paddingTop: spacing.lg,
  },
  headline: {
    color: colors.textPrimary,
    fontSize: 50,
    fontWeight: '900',
    lineHeight: 56,
    marginTop: spacing.md,
    maxWidth: 860,
  },
  subheadline: {
    color: colors.textSecondary,
    fontSize: 18,
    lineHeight: 28,
    marginTop: spacing.lg,
    maxWidth: 720,
  },
  ctaRow: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cta: {
    borderColor: colors.accent,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  trustChip: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
    fontSize: 74,
    fontWeight: '900',
    lineHeight: 80,
  },
  mockDelta: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  mockGrid: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  mockPanel: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  mockPanelLabel: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  pillarGrid: {
    gap: spacing.lg,
  },
  incomplete: {
    backgroundColor: colors.card,
    marginBottom: spacing.xl,
  },
  storyGrid: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  storyPoint: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  storyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
  },
  storyBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  metrics: {
    backgroundColor: colors.card,
  },
  whyGrid: {
    gap: spacing.lg,
  },
  whyCard: {
    backgroundColor: colors.card,
  },
  whyTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  whyBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  metricsKicker: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  metricsNote: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  metricsGrid: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metricTile: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
  },
  metricLabel: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  pillar: {
    backgroundColor: colors.card,
  },
  pillarTitle: {
    color: colors.textSecondary,
    fontWeight: '900',
  },
  pillarValue: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  pillarWhy: {
    ...typography.small,
    marginTop: spacing.md,
  },
  pillarNext: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  analytics: {
    marginTop: spacing.lg,
  },
  features: {
    gap: spacing.lg,
  },
  featureCard: {
    minHeight: 160,
  },
  featureIndex: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  featureBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  social: {
    backgroundColor: colors.card,
  },
  socialPreview: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  socialTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  socialBody: {
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  socialMeta: {
    color: colors.primaryDark,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  founderBody: {
    ...typography.body,
  },
  finalCta: {
    backgroundColor: colors.card,
    marginTop: spacing.lg,
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
  demoButton: {
    marginTop: spacing.md,
  },
  footer: {
    paddingTop: spacing.xl,
  },
  footerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  roadmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roadmapItem: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textSecondary,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
