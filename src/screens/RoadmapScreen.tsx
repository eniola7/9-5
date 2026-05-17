import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DemoUserSwitcher } from '../components/DemoUserSwitcher';
import { PrimaryButton } from '../components/PrimaryButton';
import { PressableScale } from '../components/PressableScale';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { journalPosts, journalThemes, monthlyReviews } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

type JournalPost = (typeof journalPosts)[number];
type MonthlyReview = (typeof monthlyReviews)[number];

export const RoadmapScreen = () => {
  const { selectedDemoUser, selectedDemoUserId, setSelectedDemoUserId } = useProfile();
  const [selected, setSelected] = useState<JournalPost | null>(null);
  const [selectedReview, setSelectedReview] = useState<MonthlyReview | null>(null);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="Money Journal" subtitle="Milestones, monthly reviews, and honest financial reflections." />
        <DemoUserSwitcher selectedId={selectedDemoUserId} onSelect={setSelectedDemoUserId} />

        <Card glow>
          <SectionHeader
            title="A Letterboxd-style layer for money"
            subtitle="Log milestones, rate financial products or life decisions, and save reflections that are useful without becoming public net worth theater."
            eyebrow="Financial diary"
          />
          <View style={styles.themeRow}>
            {journalThemes.map((theme) => (
              <Text key={theme} style={styles.theme}>{theme}</Text>
            ))}
          </View>
        </Card>

        <SectionHeader title="Monthly reviews" subtitle="Private progress cards that turn financial growth into memory." />
        <Card style={styles.engineReviewCard}>
          <View style={styles.reviewTop}>
            <View style={styles.reviewCopy}>
              <Text style={styles.reviewMonth}>Engine review</Text>
              <Text style={styles.reviewTitle}>{selectedDemoUser.label}: Trust Score {selectedDemoUser.trustScore}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.rating}>+{selectedDemoUser.upside.points}</Text>
            </View>
          </View>
          <Text style={styles.reviewBody}>{selectedDemoUser.whatChanged.join(' ')}</Text>
          <Text style={styles.reviewAction}>What to do next: {selectedDemoUser.upside.action}</Text>
        </Card>
        {monthlyReviews.map((review) => (
          <PressableScale key={review.month} onPress={() => setSelectedReview(review)} pressedStyle={styles.pressed} hoveredStyle={styles.hovered}>
            <Card style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.reviewCopy}>
                  <Text style={styles.reviewMonth}>{review.month}</Text>
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.rating}>{review.score}</Text>
                </View>
              </View>
              <Text style={styles.reviewBody}>{review.body}</Text>
              <Text style={styles.reviewAction}>Open monthly review</Text>
            </Card>
          </PressableScale>
        ))}

        <SectionHeader title="Community proof" subtitle="Tasteful reflections and product notes, kept secondary to personal progress." />
        {journalPosts.map((post) => (
          <PressableScale key={post.title} onPress={() => setSelected(post)} pressedStyle={styles.pressed} hoveredStyle={styles.hovered}>
            <Card style={styles.postCard}>
              <View style={styles.postTop}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.rating}>{post.rating}</Text>
                </View>
                <Text style={styles.helpful}>{post.helpful} helpful</Text>
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.reflection}>{post.reflection}</Text>
              <View style={styles.tagRow}>
                {post.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
              </View>
            </Card>
          </PressableScale>
        ))}

        <Modal transparent visible={!!selected} animationType="fade">
          <View style={styles.modalOverlay}>
            <Card glow>
              <Text style={styles.modalTitle}>{selected?.title}</Text>
              <Text style={styles.reflection}>{selected?.reflection}</Text>
              <Text style={styles.modalMeta}>{selected?.rating} rating · {selected?.helpful} people found this helpful</Text>
              <PrimaryButton label="Close" onPress={() => setSelected(null)} style={styles.closeButton} />
            </Card>
          </View>
        </Modal>

        <Modal transparent visible={!!selectedReview} animationType="fade">
          <View style={styles.modalOverlay}>
            <Card glow>
              <Text style={styles.modalTitle}>{selectedReview?.month} review</Text>
              <Text style={styles.reviewModalTitle}>{selectedReview?.title}</Text>
              <Text style={styles.reflection}>{selectedReview?.body}</Text>
              <Text style={styles.modalMeta}>What to do next: preserve the habit that made this month feel calmer, then write one pressure point to watch.</Text>
              <PrimaryButton label="Close" onPress={() => setSelectedReview(null)} style={styles.closeButton} />
            </Card>
          </View>
        </Modal>
      </ScreenFade>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  themeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  theme: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.textSecondary,
    fontWeight: '800',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  postCard: {
    backgroundColor: colors.card,
  },
  reviewCard: {
    backgroundColor: colors.surfaceLight,
  },
  engineReviewCard: {
    backgroundColor: colors.surfaceLight,
  },
  reviewTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  reviewCopy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  pressed: {
    opacity: 0.92,
  },
  hovered: {
    opacity: 0.98,
  },
  postTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: colors.primary,
    borderRadius: radii.md,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 48,
    padding: spacing.sm,
  },
  rating: {
    color: colors.accent,
    fontWeight: '900',
  },
  helpful: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  postTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 26,
  },
  reflection: {
    ...typography.body,
    marginTop: spacing.md,
  },
  reviewMonth: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  reviewTitle: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 26,
  },
  reviewBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
  },
  reviewAction: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  reviewModalTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
  },
  modalMeta: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.lg,
  },
  closeButton: {
    marginTop: spacing.xl,
  },
});
