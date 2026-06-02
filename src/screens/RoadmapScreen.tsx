import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Card } from '../components/Card';
import { LineChartMock, MiniBars } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { StorySection } from '../components/StorySection';
import { creditGrowthSeries, journalPosts, monthlyReviews, spendingDriftSeries } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, shadows, spacing, typography } from '../theme';

export const RoadmapScreen = () => {
  const { selectedDemoUser } = useProfile();
  const [storyOpen, setStoryOpen] = useState(false);
  const review = monthlyReviews[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StorySection>
        <View style={styles.header}>
          <Text style={styles.kicker}>Review</Text>
          <Text style={styles.title}>Your financial story, one month at a time.</Text>
          <Text style={styles.subtitle}>A monthly reflection that explains what changed, why it mattered, and what to carry forward.</Text>
        </View>
      </StorySection>

      <StorySection delay={80}>
        <Card glow style={styles.coverCard}>
          <Text style={styles.coverKicker}>May Money Review</Text>
          <Text style={styles.coverTitle}>{review.title}</Text>
          <Text style={styles.coverBody}>{review.body}</Text>
          <View style={styles.coverMeta}>
            <Text style={styles.coverMetaText}>Momentum {selectedDemoUser.trustScore}</Text>
            <Text style={styles.coverMetaText}>+{selectedDemoUser.upside.points} possible</Text>
          </View>
          <PrimaryButton label="Open monthly story" onPress={() => setStoryOpen(true)} style={styles.coverButton} />
        </Card>
      </StorySection>

      <StorySection delay={150}>
        <Card>
          <Text style={styles.sectionTitle}>Key metrics</Text>
          <View style={styles.metricGrid}>
            <Metric label="Runway" value={selectedDemoUser.runwayLabel} detail="+18 days this quarter" />
            <Metric label="Spending drift" value={`${selectedDemoUser.spendingDriftPercent}%`} detail="Dining and convenience" />
            <Metric label="Utilization" value={selectedDemoUser.utilizationLabel} detail="24% possible" />
          </View>
        </Card>
      </StorySection>

      <StorySection delay={220}>
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>What changed</Text>
          {selectedDemoUser.whatChanged.slice(0, 3).map((item, index) => (
            <View key={item} style={styles.storyRow}>
              <Text style={styles.storyIndex}>0{index + 1}</Text>
              <Text style={styles.storyText}>{item}</Text>
            </View>
          ))}
        </Card>
      </StorySection>

      <StorySection delay={290}>
        <Card>
          <Text style={styles.sectionTitle}>What I did</Text>
          {journalPosts.slice(0, 3).map((post) => (
            <View key={post.title} style={styles.journalRow}>
              <Text style={styles.journalTitle}>{post.title}</Text>
              <Text style={styles.journalMeta}>{post.rating} rating · {post.helpful} helpful · {post.tags.join(', ')}</Text>
            </View>
          ))}
        </Card>
      </StorySection>

      <StorySection delay={360}>
        <Card style={styles.promptCard}>
          <Text style={styles.promptTitle}>Reflection prompt</Text>
          <Text style={styles.promptBody}>What felt calmer this month, and what still felt heavier than it should?</Text>
          <PrimaryButton label="Save a reflection" variant="ghost" onPress={() => setStoryOpen(true)} style={styles.promptButton} />
        </Card>
      </StorySection>

      <ReviewStoryModal visible={storyOpen} onClose={() => setStoryOpen(false)} score={selectedDemoUser.trustScore} />
    </ScrollView>
  );
};

const Metric = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <View style={styles.metric}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricDetail}>{detail}</Text>
  </View>
);

const ReviewStoryModal = ({ visible, onClose, score }: { visible: boolean; onClose: () => void; score: number }) => (
  <Modal transparent visible={visible} animationType="slide">
    <View style={styles.modal}>
      <ScrollView contentContainerStyle={styles.modalContent}>
        <StorySection>
          <View style={styles.storyCover}>
            <Text style={styles.storyCoverKicker}>May Money Review</Text>
            <Text style={styles.storyCoverTitle}>A quieter month, with one watch area.</Text>
            <Text style={styles.storyCoverBody}>This is your month unfolding: momentum, tradeoffs, pressure, and the next small action.</Text>
          </View>
        </StorySection>

        <StorySection delay={160}>
          <Card style={styles.storyPanel}>
            <Text style={styles.storyPanelKicker}>Money Momentum</Text>
            <AnimatedNumber value={score} style={styles.storyScore} />
            <LineChartMock values={creditGrowthSeries} />
          </Card>
        </StorySection>

        <StorySection delay={320}>
          <Card>
            <Text style={styles.sectionTitle}>Key insights</Text>
            {[
              'Emergency runway improved by 18 days.',
              'Dining and convenience spending rose 18%.',
              'Paying $320 could lower utilization to 24%.',
            ].map((insight, index) => (
              <View key={insight} style={styles.storyRow}>
                <Text style={styles.storyIndex}>0{index + 1}</Text>
                <Text style={styles.storyText}>{insight}</Text>
              </View>
            ))}
            <MiniBars values={spendingDriftSeries} labels={['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']} />
          </Card>
        </StorySection>

        <StorySection delay={480}>
          <Card style={styles.promptCard}>
            <Text style={styles.promptTitle}>What felt calmer this month?</Text>
            <Text style={styles.promptBody}>Save one sentence now. LOLO will carry it into next month’s review.</Text>
            <PrimaryButton label="Close story" onPress={onClose} style={styles.promptButton} />
          </Card>
        </StorySection>
      </ScrollView>
    </View>
  </Modal>
);

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
  coverCard: {
    backgroundColor: colors.surfaceDeep,
    borderColor: 'rgba(221, 247, 232, 0.18)',
  },
  coverKicker: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  coverTitle: {
    color: colors.surfaceLight,
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 39,
    marginTop: spacing.md,
  },
  coverBody: {
    color: 'rgba(255, 255, 255, 0.74)',
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing.md,
  },
  coverMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  coverMetaText: {
    backgroundColor: 'rgba(221, 247, 232, 0.1)',
    borderRadius: radii.pill,
    color: colors.mint,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  coverButton: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 28,
  },
  metricGrid: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metric: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  metricDetail: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  summaryCard: {
    backgroundColor: colors.card,
  },
  storyRow: {
    alignItems: 'flex-start',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  storyIndex: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    width: 28,
  },
  storyText: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  journalRow: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  journalTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  journalMeta: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  promptCard: {
    backgroundColor: colors.mint,
  },
  promptTitle: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 31,
  },
  promptBody: {
    ...typography.body,
    marginTop: spacing.md,
  },
  promptButton: {
    marginTop: spacing.xl,
  },
  modal: {
    backgroundColor: colors.background,
    flex: 1,
  },
  modalContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  storyCover: {
    backgroundColor: colors.surfaceDeep,
    borderRadius: radii.xl,
    minHeight: 360,
    padding: spacing.xxl,
    justifyContent: 'flex-end',
    ...shadows.glow,
  },
  storyCoverKicker: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  storyCoverTitle: {
    color: colors.surfaceLight,
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 45,
    marginTop: spacing.md,
  },
  storyCoverBody: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 16,
    lineHeight: 25,
    marginTop: spacing.lg,
  },
  storyPanel: {
    backgroundColor: colors.surfaceLight,
  },
  storyPanelKicker: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  storyScore: {
    color: colors.textPrimary,
    fontSize: 76,
    fontWeight: '700',
    lineHeight: 82,
    marginVertical: spacing.lg,
  },
});
