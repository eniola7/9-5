import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { PressableScale } from '../components/PressableScale';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { colors, radii, shadows, spacing, typography } from '../theme';

interface LandingScreenProps {
  onStart: () => void;
}

const simulatorOptions = [
  { label: 'Thin file', score: 48, risk: 'High risk', action: 'Start secured card path' },
  { label: 'Student builder', score: 68, risk: 'Medium risk', action: 'Keep utilization below 30%' },
  { label: 'Apartment ready', score: 84, risk: 'Lower risk', action: 'Protect cash buffer' },
];

export const LandingScreen = ({ onStart }: LandingScreenProps) => {
  const [scenario, setScenario] = useState(simulatorOptions[1]);
  const heroPulse = useRef(new Animated.Value(0)).current;
  const scoreMotion = useRef(new Animated.Value(scenario.score)).current;
  const [animatedScore, setAnimatedScore] = useState(scenario.score);

  useEffect(() => {
    const listener = scoreMotion.addListener(({ value }) => setAnimatedScore(Math.round(value)));
    return () => scoreMotion.removeListener(listener);
  }, [scoreMotion]);

  useEffect(() => {
    Animated.timing(scoreMotion, {
      toValue: scenario.score,
      duration: 550,
      useNativeDriver: false,
    }).start();
  }, [scenario, scoreMotion]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heroPulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(heroPulse, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ]),
    ).start();
  }, [heroPulse]);

  const pulseStyle = useMemo(() => ({
    opacity: heroPulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.8] }),
    transform: [{ scale: heroPulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.04] }) }],
  }), [heroPulse]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.nav}>
        <Text style={styles.logo}>LOLO</Text>
        <ProgressPill label="Investor Demo" status="completed" />
      </View>

      <View style={styles.hero}>
        <Animated.View pointerEvents="none" style={[styles.heroGlow, pulseStyle]} />
        <View style={styles.heroCopy}>
          <Text style={typography.eyebrow}>Premium credit intelligence for students</Text>
          <Text style={styles.headline}>The financial command center for life before the first big paycheck.</Text>
          <Text style={styles.subheadline}>
            LOLO helps students, professional students, international students, and early professionals build credit, organize money, and act before risk turns into stress.
          </Text>
          <View style={styles.ctaRow}>
            <PrimaryButton label="Launch Interactive Demo" onPress={onStart} style={styles.primaryCta} />
            <PrimaryButton label="View Product Preview" variant="ghost" onPress={() => undefined} />
          </View>
        </View>

        <Card glow style={styles.heroMock}>
          <View style={styles.mockTop}>
            <View>
              <Text style={styles.mockLabel}>Credit readiness</Text>
              <Text style={styles.animatedScore}>{animatedScore}</Text>
            </View>
            <View style={styles.intelBadge}>
              <Text style={styles.intelText}>AI</Text>
            </View>
          </View>
          <ProgressBar label="Apartment readiness" value={animatedScore} height={12} />
          <View style={styles.riskStrip}>
            <Text style={styles.riskStripLabel}>Next best action</Text>
            <Text style={styles.riskStripText}>{scenario.action}</Text>
          </View>
        </Card>
      </View>

      <SectionHeader title="Product dashboard preview" subtitle="A live-feeling fintech surface designed for clarity, confidence, and action." />
      <View style={styles.dashboardPreview}>
        <DashboardCard title="Financial readiness" value="76" subtitle="LOLO blends credit, rent, cash buffer, and roadmap progress." icon="FR" important />
        <DashboardCard title="Biggest risk" value="Rent burden" subtitle="LOLO surfaces what matters now, not a pile of generic tips." icon="!" />
        <DashboardCard title="Next action" value="Set autopay" subtitle="Every insight points toward one concrete move." icon="→" />
      </View>

      <Card glow style={styles.simulator}>
        <SectionHeader title="Interactive credit simulator" subtitle="Teaser logic that makes the product feel responsive before real integrations." eyebrow="Mock intelligence" />
        <View style={styles.simScoreRow}>
          <Text style={styles.simScore}>{animatedScore}</Text>
          <View style={styles.simRisk}>
            <Text style={styles.simRiskLabel}>Scenario</Text>
            <Text style={styles.simRiskText}>{scenario.risk}</Text>
          </View>
        </View>
        <ProgressBar label="Credit readiness" value={animatedScore} height={14} />
        <View style={styles.segmented}>
          {simulatorOptions.map((option) => (
            <PressableScale key={option.label} onPress={() => setScenario(option)} style={[styles.segment, scenario.label === option.label && styles.segmentActive]}>
              <Text style={[styles.segmentText, scenario.label === option.label && styles.segmentTextActive]}>{option.label}</Text>
            </PressableScale>
          ))}
        </View>
      </Card>

      <SectionHeader title="Built for the messy middle" subtitle="A premium platform for people whose financial lives are changing fast." />
      <View style={styles.features}>
        <Feature icon="CR" title="Credit readiness" body="Translate credit habits into an action plan users can understand." />
        <Feature icon="RT" title="Rent intelligence" body="Surface apartment readiness and rent-burden pressure before it becomes a blocker." />
        <Feature icon="AI" title="Contextual coach" body="Rule-based demo guidance today, built for future guardrailed AI tomorrow." />
        <Feature icon="SG" title="LOLO Signals" body="Risk markers that feel predictive without making unsafe guarantees." />
      </View>

      <Card style={styles.why}>
        <SectionHeader title="Why LOLO works" subtitle="The platform gives students one calm operating system for credit, cash, and next steps." />
        {['It converts confusing credit concepts into visible readiness scores.', 'It uses persona context, not one-size-fits-all financial tips.', 'It nudges one next action at a time, reducing decision fatigue.'].map((item, index) => (
          <View key={item} style={styles.whyRow}>
            <Text style={styles.whyIndex}>{index + 1}</Text>
            <Text style={styles.whyText}>{item}</Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="What early users would say" subtitle="Pitch-ready testimonial examples for the demo narrative." />
      <View style={styles.testimonials}>
        <Testimonial quote="LOLO made credit feel like a roadmap instead of a mystery." name="College student" />
        <Testimonial quote="The residency move planning angle is exactly what med students need earlier." name="Med student" />
        <Testimonial quote="It explains U.S. credit setup without making me feel behind." name="International student" />
      </View>

      <SectionHeader title="Pricing preview" subtitle="Simple tiers with a clear Pro wedge for professional students." />
      <View style={styles.pricing}>
        <Price name="Free" price="$0" body="Profile, roadmap, and core signals." />
        <Price name="Plus" price="$9/mo" body="Advanced nudges and deeper planning." featured />
        <Price name="Pro" price="$19/mo" body="Residency, relocation, loans, and priority coach." />
      </View>

      <Card glow style={styles.finalCta}>
        <Text style={styles.finalTitle}>Turn financial uncertainty into a daily command center.</Text>
        <Text style={styles.finalBody}>Launch the demo, build a profile, and watch LOLO generate a personalized readiness system in under a minute.</Text>
        <PrimaryButton label="Start the LOLO Demo" onPress={onStart} style={styles.finalButton} />
      </Card>
    </ScrollView>
  );
};

const Feature = ({ icon, title, body }: { icon: string; title: string; body: string }) => (
  <DashboardCard title={title} icon={icon} subtitle={body} important={icon === 'AI'} />
);

const Testimonial = ({ quote, name }: { quote: string; name: string }) => (
  <Card style={styles.testimonial}>
    <Text style={styles.quote}>“{quote}”</Text>
    <Text style={styles.name}>{name}</Text>
  </Card>
);

const Price = ({ name, price, body, featured }: { name: string; price: string; body: string; featured?: boolean }) => (
  <DashboardCard title={name} value={price} subtitle={body} icon="$" important={featured} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
  },
  hero: {
    position: 'relative',
    gap: spacing.xl,
    marginBottom: spacing.xxl,
  },
  heroGlow: {
    position: 'absolute',
    top: 16,
    right: 18,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
  },
  heroCopy: {
    paddingTop: spacing.xl,
  },
  headline: {
    color: colors.textPrimary,
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 50,
    marginTop: spacing.md,
  },
  subheadline: {
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 26,
    marginTop: spacing.lg,
  },
  ctaRow: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  primaryCta: {
    borderColor: colors.accent,
  },
  heroMock: {
    padding: spacing.xl,
    backgroundColor: 'rgba(22, 27, 30, 0.92)',
  },
  mockTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  mockLabel: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  animatedScore: {
    color: colors.textPrimary,
    fontSize: 70,
    fontWeight: '900',
    lineHeight: 78,
  },
  intelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.14)',
    borderColor: colors.accent,
    borderWidth: 1,
  },
  intelText: {
    color: colors.accent,
    fontWeight: '900',
  },
  riskStrip: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: 'rgba(14, 17, 19, 0.72)',
    borderColor: colors.border,
    borderWidth: 1,
  },
  riskStripLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  riskStripText: {
    color: colors.textPrimary,
    fontWeight: '900',
  },
  dashboardPreview: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  simulator: {
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  simScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  simScore: {
    color: colors.accent,
    fontSize: 54,
    fontWeight: '900',
  },
  simRisk: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.border,
    borderWidth: 1,
  },
  simRiskLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  simRiskText: {
    color: colors.textPrimary,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  segmented: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  segment: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
    borderWidth: 1,
  },
  segmentActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    borderColor: colors.primary,
    ...shadows.glow,
  },
  segmentText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: colors.accent,
  },
  features: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  why: {
    marginBottom: spacing.xxl,
  },
  whyRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  whyIndex: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '900',
    width: 26,
  },
  whyText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  testimonials: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  testimonial: {
    backgroundColor: 'rgba(22, 27, 30, 0.82)',
  },
  quote: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  name: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  pricing: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  finalCta: {
    padding: spacing.xxl,
    backgroundColor: '#111A14',
  },
  finalTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },
  finalBody: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  finalButton: {
    marginTop: spacing.xl,
  },
});
