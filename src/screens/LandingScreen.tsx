import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { InsightCard, LineChartMock, MiniBars, UtilizationRing } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { aiRecommendations, creditGrowthSeries, demoMetrics, roadmapItems, spendingDriftSeries, trustPillars } from '../data/financeMvp';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface LandingScreenProps {
  onStart: () => void;
  onDemo: () => void;
  onPresentation: () => void;
}

const featureSections = [
  ['Trust Score', 'A single calm read on credit habits, cash rhythm, runway, and financial consistency.'],
  ['AI insights', 'Personal recommendations that explain what changed, why it matters, and what to do next.'],
  ['Credit growth', 'Statement timing, utilization, payment history, and score movement in one readable profile.'],
  ['Spending drift', 'Behavioral analytics that catch pressure before it turns into a stressful month.'],
  ['Financial journal', 'Private reflections, monthly reviews, and tasteful social proof without net-worth flexing.'],
];

const whyMatters = [
  ['Immigrants with thin files', 'A stable job, rent payments, and careful habits can exist before a traditional credit file catches up.'],
  ['Students building credit', 'Early habits matter, but most tools explain credit only after mistakes become expensive.'],
  ['Early professionals with high utilization', 'A strong income can still look risky if statement timing tells the wrong story.'],
  ['Renters proving reliability', 'LOLO turns payment consistency and runway into a clearer trust narrative for housing moments.'],
  ['Families building stability', 'Progress can be slow and responsible; the system should make that visible.'],
];

export const LandingScreen = ({ onStart, onDemo, onPresentation }: LandingScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.nav}>
      <View>
        <Text style={styles.logo}>LOLO</Text>
        <Text style={styles.navSubtitle}>Personal financial trust OS</Text>
      </View>
      <View style={styles.navChips}>
        <ProgressPill label="Bank-grade privacy" status="completed" />
        <ProgressPill label="YC Demo Mode" />
      </View>
    </View>

    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={typography.eyebrow}>Apple Wallet for credit growth. Linear for financial clarity.</Text>
        <Text style={styles.headline}>The modern operating system for personal financial trust.</Text>
        <Text style={styles.subheadline}>
          LOLO helps young adults build financial trust before banks fully understand them, turning credit habits, cash rhythm, and financial behavior into clear next steps.
        </Text>
        <View style={styles.ctaRow}>
          <PrimaryButton label="Start building trust" onPress={onStart} style={styles.cta} />
          <PrimaryButton label="View 60-second demo" variant="ghost" onPress={onDemo} />
          <PrimaryButton label="Read demo brief" variant="ghost" onPress={onPresentation} />
        </View>
        <View style={styles.trustRow}>
          {['Read-only data', 'No score impact', 'Encrypted by default'].map((item) => (
            <Text key={item} style={styles.trustChip}>{item}</Text>
          ))}
        </View>
      </View>

      <Card glow style={styles.mockup}>
        <View style={styles.mockTop}>
          <View>
            <Text style={styles.mockLabel}>Trust Score</Text>
            <Text style={styles.mockScore}>742</Text>
          </View>
          <Text style={styles.mockDelta}>+18 this month</Text>
        </View>
        <ProgressBar label="Financial trust trajectory" value={86} height={12} />
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
      <SectionHeader title="Credit scores are incomplete" subtitle="They are useful, but they miss the lived reality of people building trust from thin files, new jobs, new cities, and uneven income timing." />
      <View style={styles.storyGrid}>
        <StoryPoint title="Banks see reports" body="LOLO adds behavior: payment timing, cash flow stability, recurring pressure, and follow-through." />
        <StoryPoint title="AI explains the signal" body="Instead of generic tips, every insight becomes: what changed, why it matters, what to do next." />
        <StoryPoint title="Trust grows over time" body="Renters, borrowers, immigrants, students, and early professionals need a layer that reflects progress before legacy systems catch up." />
      </View>
    </Card>

    <SectionHeader title="Why this matters" subtitle="LOLO helps credit-invisible and credit-misunderstood users build a behavioral trust profile before traditional banks fully understand them." />
    <View style={styles.whyGrid}>
      {whyMatters.map(([title, body]) => (
        <Card key={title} style={styles.whyCard}>
          <Text style={styles.whyTitle}>{title}</Text>
          <Text style={styles.whyBody}>{body}</Text>
        </Card>
      ))}
    </View>

    <Card glow style={styles.metrics}>
      <Text style={styles.metricsKicker}>Built for the next generation of credit invisible and credit misunderstood consumers</Text>
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

    <SectionHeader title="The five pillars" subtitle="Every screen answers what changed, why it matters, and what to do next." />
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
        title="Reflection becomes reputation"
        subtitle="A Notion-like money journal and Letterboxd-style review layer for milestones, products, cities, apartments, and decisions."
        eyebrow="Social trust layer"
      />
      <View style={styles.socialPreview}>
        <Text style={styles.socialTitle}>Built my first 3-month emergency fund</Text>
        <Text style={styles.socialBody}>Same life, less background noise. The win was not dramatic, just repeatable.</Text>
        <Text style={styles.socialMeta}>5.0 rating · emergency fund · 211 helpful</Text>
      </View>
    </Card>

    <Card glow style={styles.finalCta}>
      <Text style={styles.finalTitle}>Ready for demo day.</Text>
      <Text style={styles.finalBody}>A premium fintech prototype for credit growth, financial trust, AI guidance, and reflective money habits.</Text>
      <PrimaryButton label="Start building trust" onPress={onStart} style={styles.finalButton} />
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
  nav: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  logo: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
  },
  navSubtitle: {
    ...typography.small,
  },
  navChips: {
    alignItems: 'flex-end',
    gap: spacing.sm,
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
    backgroundColor: 'rgba(244, 246, 242, 0.08)',
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
    backgroundColor: '#101814',
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
    backgroundColor: '#101814',
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
    backgroundColor: '#102018',
  },
  whyGrid: {
    gap: spacing.lg,
  },
  whyCard: {
    backgroundColor: '#101814',
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
    backgroundColor: 'rgba(244, 246, 242, 0.08)',
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
    backgroundColor: '#121A16',
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
    backgroundColor: '#111714',
  },
  socialPreview: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  socialTitle: {
    color: colors.background,
    fontSize: 20,
    fontWeight: '900',
  },
  socialBody: {
    color: '#405047',
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  socialMeta: {
    color: colors.primaryDark,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  finalCta: {
    backgroundColor: '#102018',
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
