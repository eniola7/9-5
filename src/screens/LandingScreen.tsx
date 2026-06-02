import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicPageKey } from '../components/PublicHeader';
import { SectionHeader } from '../components/SectionHeader';
import { StorySection } from '../components/StorySection';
import { DemoCard } from '../components/lolo/DemoCard';
import { JournalList } from '../components/lolo/JournalList';
import { SiteNav } from '../components/lolo/SiteNav';
import { Sparkline } from '../components/lolo/Charts';
import { founderStory, stockScenes, trustSignals } from '../data/financeMvp';
import { colors, radii, spacing, typography } from '../theme';

interface LandingScreenProps {
  onStart: () => void;
  onDemo: () => void;
  onPresentation: () => void;
  onNavigate: (page: PublicPageKey) => void;
}

const surfaces = [
  { title: 'Today', body: 'A calm one-screen read on what changed, why it matters, and what one next best action looks like.', note: 'what changed' },
  { title: 'Review', body: 'Your flagship monthly story: key metrics, the change worth knowing, a stress forecast, and a reflection prompt.', note: 'the monthly story' },
  { title: 'Reflect', body: 'Journal a life event, log a money moment, or work through a goal without it feeling like a generic chatbot.', note: 'your reflections' },
  { title: 'Me', body: 'Profile context, milestones, financial biography, connected-account placeholder, and privacy controls.', note: 'your context' },
];

const principles = [
  { n: '01', t: 'Direction, not judgment', b: 'Money Momentum is a signal of where things are heading, never a grade on who you are.' },
  { n: '02', t: 'Context over transactions', b: 'LOLO tells you what a month meant. Anyone can tell you what you spent.' },
  { n: '03', t: 'Designed for messy lives', b: 'Moves, late starts, immigration, school, debt payoffs, raises, and the real shape of building stability.' },
];

const audiences = [
  'Young professionals in expensive cities',
  'Recent immigrants with thin U.S. credit files',
  'Students building early credit habits',
  'Renters trying to prove reliability',
  'Families building stability month by month',
];

export const LandingScreen = ({ onStart, onDemo, onPresentation, onNavigate }: LandingScreenProps) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <SiteNav active="landing" onNavigate={onNavigate} onDemo={onDemo} onWaitlist={onStart} />

    <StorySection style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={typography.eyebrow}>A monthly financial journal · not a budgeting app</Text>
        <Text style={styles.headline}>
          Your financial story,{'\n'}
          <Text style={styles.italic}>one month</Text> at a time.
        </Text>
        <Text style={styles.subheadline}>
          LOLO turns financial data into calm monthly stories so you understand what changed, why it matters, and what one next best action would make next month steadier.
        </Text>
        <View style={styles.ctaRow}>
          <PrimaryButton label="View product demo ->" onPress={onDemo} style={styles.primaryCta} />
          <PrimaryButton label="Join the waitlist" variant="ghost" onPress={onStart} />
        </View>
        <Text style={styles.audienceNote}>
          Built for young professionals, immigrants, renters, students, and families building stability inside systems that were not designed for their journeys.
        </Text>
        <View style={styles.signalRow}>
          <SignalDot label="Read-only prototype" color={colors.success} />
          <SignalDot label="Demo data only" color={colors.accent} />
          <SignalDot label="No bank connection" color={colors.inkSoft} />
        </View>
      </View>
      <DemoCard />
    </StorySection>

    <StorySection delay={100}>
      <View style={styles.thesis}>
        <Text style={typography.eyebrow}>The thesis</Text>
        <Text style={styles.thesisText}>
          Money is stressful enough.{'\n'}
          <Text style={styles.thesisMuted}>Financial growth should feel like a </Text>
          <Text style={styles.italic}>journal</Text>
          <Text style={styles.thesisMuted}>, not a spreadsheet.</Text>
        </Text>
        <Text style={styles.thesisBody}>
          LOLO is for the month after you move apartments, the week rent and a card payment land together, the quiet win of paying off a first balance, and the moment you realize subscription creep is context, not a personality flaw.
        </Text>
      </View>
    </StorySection>

    <StorySection delay={160} style={styles.splitSection}>
      <View style={styles.stickyCopy}>
        <Text style={typography.eyebrow}>Four surfaces</Text>
        <Text style={styles.sectionHero}>A small app with a calm spine.</Text>
        <Text style={styles.sectionBody}>
          Every screen exists to answer one question, so you always know where to go and never feel buried by data.
        </Text>
      </View>
      <View style={styles.surfaceGrid}>
        {surfaces.map((surface, index) => (
          <Card key={surface.title} style={styles.surfaceCard}>
            <View style={styles.surfaceTop}>
              <Text style={styles.surfaceTitle}>{surface.title}</Text>
              <Text style={styles.surfaceIndex}>0{index + 1}</Text>
            </View>
            <Text style={styles.surfaceBody}>{surface.body}</Text>
            <View style={styles.rule} />
            <Text style={styles.surfaceNote}>{surface.note}</Text>
          </Card>
        ))}
      </View>
    </StorySection>

    <StorySection delay={220}>
      <View style={styles.darkStory}>
        <View style={styles.darkCopy}>
          <Text style={[typography.eyebrow, styles.goldText]}>May in Mina's story</Text>
          <Text style={styles.darkTitle}>
            “I didn’t realize I was actually <Text style={styles.goldText}>building</Text> something.”
          </Text>
          <Text style={styles.darkBody}>
            Mina arrived in the U.S. ten months ago. Her credit file is seven months old. Rent is $1,450 on a $4,200 income. Here is how LOLO told the story of her May.
          </Text>
        </View>
        <View style={styles.darkPanel}>
          <Text style={styles.darkKicker}>Credit trajectory · 7 months</Text>
          <Sparkline values={[612, 624, 640, 661, 689, 712, 742]} color={colors.gold} />
          {[
            ['May 03', 'Secured Visa payment', '$170 · 6 days early'],
            ['May 12', 'Rent paid', '$1,450 · on time'],
            ['May 18', 'Reflection saved', '"Cut rideshare in half this week."'],
            ['May 28', 'Savings transfer', '+$240 to emergency buffer'],
          ].map(([date, title, note]) => (
            <View key={title} style={styles.eventRow}>
              <Text style={styles.eventDate}>{date}</Text>
              <View style={styles.eventCopy}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventNote}>{note}</Text>
              </View>
            </View>
          ))}
          <View style={styles.lookingAhead}>
            <Text style={styles.lookingKicker}>Looking ahead · June</Text>
            <Text style={styles.lookingBody}>Two cards report in the same week. Pre-paying the Builder Visa by June 5 keeps utilization under 25% for the second month in a row.</Text>
          </View>
        </View>
      </View>
    </StorySection>

    <StorySection delay={280}>
      <SectionHeader title="What we refuse to be." subtitle="LOLO avoids shame, hustle culture, and generic transaction feeds." eyebrow="Principles" />
      <View style={styles.principleGrid}>
        {principles.map((principle) => (
          <Card key={principle.n} style={styles.principleCard}>
            <Text style={styles.surfaceIndex}>{principle.n}</Text>
            <Text style={styles.principleTitle}>{principle.t}</Text>
            <Text style={styles.surfaceBody}>{principle.b}</Text>
          </Card>
        ))}
      </View>
    </StorySection>

    <StorySection delay={340}>
      <View style={styles.audienceSection}>
        <Text style={typography.eyebrow}>Who it's for</Text>
        <Text style={styles.sectionHero}>People building stability while life is expensive, imperfect, and in motion.</Text>
        <View style={styles.audienceGrid}>
          {audiences.map((audience) => (
            <Text key={audience} style={styles.audiencePill}>{audience}</Text>
          ))}
        </View>
      </View>
    </StorySection>

    <StorySection delay={400}>
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

    <StorySection delay={460}>
      <SectionHeader title="A reflection layer for money moments" subtitle="Tasteful, private by default, and grounded in real decisions rather than flexing." eyebrow="Journal" />
      <JournalList limit={4} />
    </StorySection>

    <StorySection delay={520}>
      <Card style={styles.founderCard}>
        <SectionHeader title="Founder story" subtitle="The human reason LOLO exists." />
        {founderStory.map((paragraph) => (
          <Text key={paragraph} style={styles.founderBody}>{paragraph}</Text>
        ))}
      </Card>
    </StorySection>

    <StorySection delay={580}>
      <Card style={styles.trustCard}>
        <SectionHeader title="Trust and privacy" subtitle="Financial clarity only works if the user feels safe." />
        <View style={styles.trustGrid}>
          {trustSignals.map((item) => (
            <Text key={item} style={styles.trustChip}>{item}</Text>
          ))}
        </View>
        <Text style={styles.disclaimer}>LOLO is an early prototype. Not financial advice. No credit score impact. Mock data only unless connected by the user.</Text>
      </Card>
    </StorySection>

    <StorySection delay={640}>
      <Card style={styles.waitlist}>
        <Text style={styles.finalTitle}>Open the month. Understand the story.</Text>
        <Text style={styles.finalBody}>A calmer way to see spending, credit habits, stress, and progress without shame or noise.</Text>
        <PrimaryButton label="Join the waitlist" onPress={onStart} style={styles.finalButton} />
        <PrimaryButton label="Read the product brief" variant="ghost" onPress={onPresentation} style={styles.demoButton} />
      </Card>
    </StorySection>

    <Footer onNavigate={onNavigate} onDemo={onDemo} />
  </ScrollView>
);

const SignalDot = ({ label, color }: { label: string; color: string }) => (
  <View style={styles.signal}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.signalText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  hero: {
    gap: spacing.xxl,
    paddingBottom: spacing.xxl * 2,
    paddingTop: spacing.xxl,
  },
  heroCopy: {
    gap: spacing.lg,
  },
  headline: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 56,
    lineHeight: 60,
  },
  italic: {
    color: colors.primaryDeep,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },
  subheadline: {
    color: colors.inkSoft,
    fontSize: 18,
    lineHeight: 29,
    maxWidth: 680,
  },
  ctaRow: {
    gap: spacing.md,
  },
  primaryCta: {
    alignSelf: 'flex-start',
  },
  audienceNote: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 560,
  },
  signalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  signal: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    borderRadius: radii.pill,
    height: 7,
    width: 7,
  },
  signalText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  thesis: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginHorizontal: -spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl * 2,
  },
  thesisText: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 38,
    lineHeight: 46,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  thesisMuted: {
    color: colors.inkSoft,
  },
  thesisBody: {
    color: colors.inkSoft,
    fontSize: 16,
    lineHeight: 25,
    marginTop: spacing.xl,
    maxWidth: 720,
    textAlign: 'center',
  },
  splitSection: {
    gap: spacing.xxl,
    paddingVertical: spacing.xxl * 2,
  },
  stickyCopy: {
    gap: spacing.md,
  },
  sectionHero: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 40,
    lineHeight: 46,
  },
  sectionBody: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 24,
  },
  surfaceGrid: {
    gap: spacing.md,
  },
  surfaceCard: {
    backgroundColor: colors.card,
  },
  surfaceTop: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surfaceTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 26,
  },
  surfaceIndex: {
    color: colors.textMuted,
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: '700',
  },
  surfaceBody: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  rule: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: spacing.xl,
  },
  surfaceNote: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: spacing.md,
    textTransform: 'uppercase',
  },
  darkStory: {
    backgroundColor: colors.ink,
    borderRadius: radii.xl,
    gap: spacing.xxl,
    marginHorizontal: -spacing.xl,
    padding: spacing.xl,
  },
  darkCopy: {
    gap: spacing.lg,
  },
  goldText: {
    color: colors.gold,
  },
  darkTitle: {
    color: colors.background,
    fontFamily: 'Georgia',
    fontSize: 38,
    lineHeight: 45,
  },
  darkBody: {
    color: 'rgba(250, 251, 246, 0.72)',
    fontSize: 15,
    lineHeight: 24,
  },
  darkPanel: {
    backgroundColor: 'rgba(250, 251, 246, 0.06)',
    borderColor: 'rgba(250, 251, 246, 0.12)',
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  darkKicker: {
    color: 'rgba(250, 251, 246, 0.62)',
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  eventRow: {
    borderBottomColor: 'rgba(250, 251, 246, 0.12)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  eventDate: {
    color: 'rgba(250, 251, 246, 0.52)',
    fontFamily: 'Courier',
    fontSize: 12,
    width: 66,
  },
  eventCopy: {
    flex: 1,
  },
  eventTitle: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
  eventNote: {
    color: 'rgba(250, 251, 246, 0.62)',
    fontSize: 12,
    marginTop: spacing.xs,
  },
  lookingAhead: {
    backgroundColor: 'rgba(201, 163, 91, 0.14)',
    borderColor: 'rgba(201, 163, 91, 0.3)',
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  lookingKicker: {
    color: colors.gold,
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  lookingBody: {
    color: 'rgba(250, 251, 246, 0.88)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  principleGrid: {
    gap: spacing.md,
  },
  principleCard: {
    padding: spacing.xl,
  },
  principleTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 26,
    marginTop: spacing.lg,
  },
  audienceSection: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  audiencePill: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '700',
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
    backgroundColor: colors.paper,
    height: 220,
    width: '100%',
  },
  sceneCopy: {
    padding: spacing.xl,
  },
  sceneTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 25,
    lineHeight: 31,
  },
  sceneBody: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  sceneCredit: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  founderCard: {
    backgroundColor: colors.paper,
  },
  founderBody: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  trustCard: {
    backgroundColor: colors.card,
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
    color: colors.primaryDeep,
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
  waitlist: {
    backgroundColor: colors.ink,
  },
  finalTitle: {
    color: colors.background,
    fontFamily: 'Georgia',
    fontSize: 38,
    lineHeight: 44,
  },
  finalBody: {
    color: 'rgba(250, 251, 246, 0.72)',
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
