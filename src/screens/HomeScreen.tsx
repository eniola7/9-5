import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { StorySection } from '../components/StorySection';
import { loloEngineDisclaimer } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, shadows, spacing, typography } from '../theme';

const statusItems = [
  { label: 'Cash Flow', value: 'Stable', tone: 'success' },
  { label: 'Credit', value: 'Action ready', tone: 'info' },
  { label: 'Stress', value: 'Watch August', tone: 'warning' },
] as const;

export const HomeScreen = () => {
  const { profile, selectedDemoUser } = useProfile();
  const [expanded, setExpanded] = useState(false);

  if (!profile) return null;

  const recommendation = selectedDemoUser.recommendations[0];
  const primaryChange = selectedDemoUser.whatChanged[0] ?? 'Your financial picture stayed mostly steady this month.';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StorySection>
        <View style={styles.header}>
          <Text style={styles.kicker}>Today</Text>
          <Text style={styles.title}>You’re stable, with one watch area.</Text>
          <Text style={styles.subtitle}>LOLO turns this month’s credit, spending, and runway signals into one clear next step.</Text>
        </View>
      </StorySection>

      <StorySection delay={80}>
        <Card glow style={styles.momentumCard}>
          <View style={styles.momentumTop}>
            <View>
              <Text style={styles.momentumLabel}>Money Momentum</Text>
              <Text style={styles.momentumCaption}>Direction, not judgment.</Text>
            </View>
            <Text style={styles.delta}>+{selectedDemoUser.upside.points} possible</Text>
          </View>
          <AnimatedNumber value={selectedDemoUser.trustScore} style={styles.score} />
          <ProgressBar label="Stability trajectory" value={86} height={10} />
          <Text style={styles.explanation}>{primaryChange}</Text>
        </Card>
      </StorySection>

      <StorySection delay={150}>
        <Card style={styles.actionCard}>
          <Text style={styles.actionKicker}>What to do next</Text>
          <Text style={styles.actionTitle}>{recommendation?.title ?? selectedDemoUser.upside.action}</Text>
          <Text style={styles.actionBody}>
            {recommendation?.explanation ?? 'This is the highest leverage action LOLO found in the demo profile.'}
          </Text>
          <View style={styles.actionButtons}>
            <PrimaryButton label="See why" onPress={() => setExpanded(true)} style={styles.actionButton} />
            <PrimaryButton label="Mark planned" variant="ghost" onPress={() => setExpanded(true)} style={styles.actionButton} />
          </View>
        </Card>
      </StorySection>

      <StorySection delay={220}>
        <View style={styles.statusGrid}>
          {statusItems.map((item) => (
            <View key={item.label} style={styles.statusCard}>
              <View style={[styles.statusDot, styles[`${item.tone}Dot`]]} />
              <Text style={styles.statusLabel}>{item.label}</Text>
              <Text style={styles.statusValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </StorySection>

      <StorySection delay={290}>
        <Card style={styles.contextCard}>
          <Text style={styles.contextTitle}>Why it matters</Text>
          <Text style={styles.contextBody}>
            Your emergency runway improved by 18 days this quarter, but dining, commuting, and convenience spending rose 18% over 3 months. At the current pace, your savings buffer may dip below 2 months in August.
          </Text>
        </Card>
      </StorySection>

      <Modal transparent visible={expanded} animationType="fade">
        <View style={styles.modalOverlay}>
          <Card glow style={styles.modalCard}>
            <Text style={styles.modalTitle}>The useful move is small.</Text>
            <Text style={styles.contextBody}>
              Paying before statement close could lower reported utilization and make next month’s credit picture calmer without changing your entire budget.
            </Text>
            <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
            <PrimaryButton label="Close" onPress={() => setExpanded(false)} style={styles.closeButton} />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 3,
  },
  header: {
    paddingTop: spacing.md,
  },
  kicker: {
    ...typography.eyebrow,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 42,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.md,
  },
  momentumCard: {
    backgroundColor: colors.surfaceDeep,
    borderColor: 'rgba(221, 247, 232, 0.18)',
  },
  momentumTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  momentumLabel: {
    color: colors.mint,
    fontSize: 15,
    fontWeight: '800',
  },
  momentumCaption: {
    color: 'rgba(221, 247, 232, 0.68)',
    fontSize: 12,
    marginTop: spacing.xs,
  },
  delta: {
    backgroundColor: 'rgba(221, 247, 232, 0.1)',
    borderRadius: radii.pill,
    color: colors.mint,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  score: {
    color: colors.surfaceLight,
    fontSize: 86,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 92,
    marginVertical: spacing.lg,
  },
  explanation: {
    color: 'rgba(255, 255, 255, 0.76)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.lg,
  },
  actionCard: {
    backgroundColor: colors.surfaceLight,
  },
  actionKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  actionTitle: {
    color: colors.textPrimary,
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: spacing.md,
  },
  actionBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statusCard: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
    ...shadows.card,
  },
  statusDot: {
    borderRadius: 5,
    height: 10,
    marginBottom: spacing.md,
    width: 10,
  },
  successDot: {
    backgroundColor: colors.success,
  },
  warningDot: {
    backgroundColor: colors.warning,
  },
  infoDot: {
    backgroundColor: colors.info,
  },
  statusLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  statusValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  contextCard: {
    backgroundColor: colors.cardSoft,
  },
  contextTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '700',
  },
  contextBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: radii.xl,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  disclaimer: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
  closeButton: {
    marginTop: spacing.xl,
  },
});
