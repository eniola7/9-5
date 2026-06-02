import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { InsightCard, LineChartMock, MiniBars } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicHeader, PublicPageKey } from '../components/PublicHeader';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { StorySection } from '../components/StorySection';
import { aiRecommendations, creditGrowthSeries, founderStory, journalPosts, spendingDriftSeries, stockScenes, trustSignals } from '../data/financeMvp';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface LandingScreenProps {
  onStart: () => void;
  onDemo: () => void;
  onPresentation: () => void;
  onNavigate: (page: PublicPageKey) => void;
}

const howItWorks = [
  {
    title: 'Connect the story',
    body: 'Start with a profile or demo financial snapshot: income, rent, credit habits, savings, subscriptions, and real-life pressure points.',
  },
  {
    title: 'Open your monthly review',
    body: 'LOLO explains what changed financially, why it matters, and what action would make next month steadier.',
  },
  {
    title: 'Reflect without shame',
    body: 'Save short notes about moving cities, paying down a first card, subscription creep, or building a real emergency buffer.',
  },
];

const audiences = [
  'Young professionals in expensive cities',
  'Immigrants and people with thin credit files',
  'Students building early credit habits',
  'Renters trying to prove reliability',
  'Families building stability month by month',
];

const faqs = [
  {
    q: 'Is LOLO a budgeting app?',
    a: 'No. LOLO is a financial reflection platform. It helps you understand the story behind your month, not micromanage every dollar.',
  },
  {
    q: 'Is Money Momentum a credit score?',
    a: 'No. It is an educational demo signal based on behavior patterns. It is not a FICO score or credit bureau score.',
  },
  {
    q: 'Does LOLO move money?',
    a: 'No. The prototype is read-only and uses mock data unless a user connects data in the future with clear consent.',
  },
];

export const LandingScreen = ({ onStart, onDemo, onPresentation, onNavigate }: LandingScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <PublicHeader active="landing" onNavigate={onNavigate} onDemo={onDemo} />

    <StorySection>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={typography.eyebrow}>Financial growth should feel like a journal, not a spreadsheet.</Text>
          <Text style={styles.headline}>Your financial story, one month at a time.</Text>
          <Text style={styles.subheadline}>
            LOLO turns financial data into calm monthly stories so you can understand what changed, why it matters, and what to do next.
          </Text>
          <View style={styles.ctaRow}>
            <PrimaryButton label="Join the waitlist" onPress={onStart} style={styles.cta} />
            <PrimaryButton label="View product demo" variant="ghost" onPress={onDemo} />
          </View>
          <Text style={styles.audienceText}>
            Built for young professionals, immigrants, renters, students, and people building stability in real life.
          </Text>
        </View>

        <Card glow style={styles.preview}>
          <View style={styles.previewTop}>
            <View>
              <Text style={styles.previewKicker}>May Review</Text>
              <Text style={styles.previewTitle}>Stable, with one watch area</Text>
            </View>
            <View style={styles.monthBadge}>
              <Text style={styles.monthBadgeText}>Demo</Text>
            </View>
          </View>
          <View style={styles.momentumRow}>
            <View>
              <Text style={styles.momentumLabel}>Money Momentum</Text>
              <AnimatedNumber value={742} style={styles.momentumScore} />
            </View>
            <Text style={styles.delta}>+18 this month</Text>
          </View>
          <ProgressBar label="Month opened" value={82} height={12} />
          <View style={styles.previewPanels}>
            <View style={styles.panel}>
              <Text style={styles.panelLabel}>Credit rhythm</Text>
              <LineChartMock values={creditGrowthSeries} />
            </View>
            <View style={styles.panel}>
              <Text style={styles.panelLabel}>Spending drift</Text>
              <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
            </View>
          </View>
          <InsightCard {...aiRecommendations[2]} />
        </Card>
      </View>
    </StorySection>

    <StorySection delay={100}>
      <Card style={styles.statement}>
        <Text style={styles.statementTitle}>Money is stressful enough.</Text>
        <Text style={styles.statementBody}>
          LOLO is for the month after you move apartments, the week rent and a card payment land together, the quiet win of paying off a first balance,
          and the moment you realize subscription creep is not a personality flaw. It is context.
        </Text>
      </Card>
    </StorySection>

    <StorySection delay={160}>
      <SectionHeader title="How LOLO works" subtitle="Three calm loops: see the month, understand the pattern, save the lesson." />
      <View style={styles.workGrid}>
        {howItWorks.map((item, index) => (
          <Card key={item.title} style={styles.workCard}>
            <Text style={styles.index}>0{index + 1}</Text>
            <Text style={styles.workTitle}>{item.title}</Text>
            <Text style={styles.workBody}>{item.body}</Text>
          </Card>
        ))}
      </View>
    </StorySection>

    <StorySection delay={220}>
      <Card glow style={styles.reviewFeature}>
        <Text style={styles.featureKicker}>The flagship experience</Text>
        <Text style={styles.featureTitle}>A monthly review that unfolds like a financial story.</Text>
        <View style={styles.chapterList}>
          {['Month cover', 'AI-style summary', 'Key metrics', 'What changed', 'Stress forecast', 'Reflection prompt', 'Looking ahead'].map((chapter) => (
            <View key={chapter} style={styles.chapter}>
              <View style={styles.chapterDot} />
              <Text style={styles.chapterText}>{chapter}</Text>
            </View>
          ))}
        </View>
      </Card>
    </StorySection>

    <StorySection delay={280}>
      <SectionHeader title="Real life, not perfect spreadsheets" subtitle="LOLO is designed for the places where money decisions are emotional, practical, and connected." />
      <View style={styles.audienceGrid}>
        {audiences.map((audience) => (
          <Text key={audience} style={styles.audiencePill}>{audience}</Text>
        ))}
      </View>
    </StorySection>

    <StorySection delay={310}>
      <View style={styles.sceneGrid}>
        {stockScenes.map((scene) => (
          <Card key={scene.title} style={styles.sceneCard}>
            <Image source={{ uri: scene.imageUrl }} style={styles.sceneImage} />
            <View style={styles.sceneCopy}>
              <Text style={styles.sceneTitle}>{scene.title}</Text>
              <Text style={styles.sceneBody}>{scene.body}</Text>
              <Text style={styles.sceneCredit}>{scene.credit}</Text>
            </View>
          </Card>
        ))}
      </View>
    </StorySection>

    <StorySection delay={340}>
      <Card style={styles.journalCard}>
        <SectionHeader title="A reflection layer for money moments" subtitle="Tasteful, private by default, and grounded in real decisions rather than flexing." />
        {journalPosts.slice(0, 3).map((post) => (
          <View key={post.title} style={styles.journalItem}>
            <Text style={styles.journalTitle}>{post.title}</Text>
            <Text style={styles.journalBody}>{post.reflection}</Text>
            <Text style={styles.journalMeta}>{post.rating} rating · {post.tags.join(' · ')} · {post.helpful} helpful</Text>
          </View>
        ))}
      </Card>
    </StorySection>

    <StorySection delay={400}>
      <Card>
        <SectionHeader title="Trust and privacy" subtitle="Financial clarity only works if the user feels safe." />
        <View style={styles.trustGrid}>
          {trustSignals.map((item) => (
            <Text key={item} style={styles.trustChip}>{item}</Text>
          ))}
        </View>
        <Text style={styles.disclaimer}>LOLO is an early prototype. Not financial advice. No credit score impact. Mock data only unless connected by the user.</Text>
      </Card>
    </StorySection>

    <StorySection delay={460}>
      <Card style={styles.founderCard}>
        <SectionHeader title="Founder story" subtitle="A simple reason to exist." />
        {founderStory.map((paragraph) => (
          <Text key={paragraph} style={styles.founderBody}>{paragraph}</Text>
        ))}
      </Card>
    </StorySection>

    <StorySection delay={520}>
      <SectionHeader title="Questions people ask first" />
      <View style={styles.faqGrid}>
        {faqs.map((faq) => (
          <Card key={faq.q} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </Card>
        ))}
      </View>
    </StorySection>

    <StorySection delay={580}>
      <Card glow style={styles.finalCta}>
        <Text style={styles.finalTitle}>Open the month. Understand the story.</Text>
        <Text style={styles.finalBody}>A calmer way to see spending, credit habits, stress, and progress without shame or noise.</Text>
        <PrimaryButton label="Join the waitlist" onPress={onStart} style={styles.finalButton} />
        <PrimaryButton label="Read the product brief" variant="ghost" onPress={onPresentation} style={styles.demoButton} />
      </Card>
    </StorySection>

    <Footer onNavigate={onNavigate} onDemo={onDemo} />
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
    gap: spacing.xl,
    marginBottom: spacing.xl,
  },
  heroCopy: {
    paddingTop: spacing.lg,
  },
  headline: {
    color: colors.textPrimary,
    fontSize: 54,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 58,
    marginTop: spacing.md,
    maxWidth: 900,
  },
  subheadline: {
    color: colors.textSecondary,
    fontSize: 19,
    lineHeight: 30,
    marginTop: spacing.lg,
    maxWidth: 760,
  },
  ctaRow: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cta: {
    ...shadows.soft,
  },
  audienceText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: spacing.lg,
    maxWidth: 680,
  },
  preview: {
    backgroundColor: colors.surfaceDeep,
  },
  previewTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  previewKicker: {
    color: colors.secondaryGreen,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  previewTitle: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    marginTop: spacing.xs,
    maxWidth: 260,
  },
  monthBadge: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  monthBadgeText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  momentumRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  momentumLabel: {
    color: colors.secondaryGreen,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  momentumScore: {
    color: colors.white,
    fontSize: 72,
    fontWeight: '800',
    lineHeight: 78,
  },
  delta: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: '800',
    paddingBottom: spacing.sm,
  },
  previewPanels: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  panel: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  panelLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  statement: {
    backgroundColor: colors.card,
  },
  statementTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  statementBody: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 27,
    marginTop: spacing.md,
  },
  workGrid: {
    gap: spacing.lg,
  },
  workCard: {
    backgroundColor: colors.card,
  },
  index: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  workTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  workBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  reviewFeature: {
    backgroundColor: colors.card,
  },
  featureKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 40,
    marginTop: spacing.md,
  },
  chapterList: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  chapter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  chapterDot: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 10,
    width: 10,
  },
  chapterText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  audiencePill: {
    backgroundColor: colors.card,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textSecondary,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sceneGrid: {
    gap: spacing.lg,
  },
  sceneCard: {
    overflow: 'hidden',
    padding: 0,
  },
  sceneImage: {
    backgroundColor: colors.backgroundElevated,
    height: 210,
    width: '100%',
  },
  sceneCopy: {
    padding: spacing.xl,
  },
  sceneTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
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
  journalCard: {
    backgroundColor: colors.card,
  },
  journalItem: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  journalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  journalBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  journalMeta: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  trustGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  trustChip: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.lg,
  },
  founderCard: {
    backgroundColor: colors.backgroundElevated,
  },
  founderBody: {
    ...typography.body,
  },
  faqGrid: {
    gap: spacing.lg,
  },
  faqCard: {
    backgroundColor: colors.card,
  },
  faqQuestion: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  faqAnswer: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  finalCta: {
    backgroundColor: colors.surfaceDeep,
    marginTop: spacing.lg,
  },
  finalTitle: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 40,
  },
  finalBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  finalButton: {
    marginTop: spacing.xl,
  },
  demoButton: {
    marginTop: spacing.md,
  },
});
