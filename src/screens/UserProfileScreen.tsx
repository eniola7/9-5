import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { StorySection } from '../components/StorySection';
import { MomentumDial } from '../components/lolo/Momentum';
import { journalPosts, productReviews } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

const biography = [
  {
    period: 'First apartment',
    title: 'Learned the real cost of moving',
    body: 'Rent was only one part of the story. Transit, deposits, furnishing, and utilities changed the shape of the month.',
  },
  {
    period: 'Credit reset',
    title: 'Paid down the first card',
    body: 'Statement timing became easier to understand once utilization had a plan.',
  },
  {
    period: 'Stability build',
    title: 'Started a real emergency buffer',
    body: 'Progress felt quieter than expected, but the background stress dropped.',
  },
];

export const UserProfileScreen = () => {
  const { appUserProfile, selectedDemoUser } = useProfile();
  const profile = appUserProfile;
  const firstName = profile?.preferredName ?? selectedDemoUser.rawUser.name.split(' ')[0];
  const initials = profile?.avatarInitials || selectedDemoUser.rawUser.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  const hasConnectedAccounts = false;
  const milestones = [
    'Clarity profile created',
    `${selectedDemoUser.runwayLabel} emergency runway`,
    selectedDemoUser.topStrength,
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StorySection>
        <Text style={typography.eyebrow}>Me</Text>
        <Card glow style={styles.profileHero}>
          <View style={styles.heroRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.identity}>
              <Text style={styles.name}>{firstName}</Text>
              <Text style={styles.meta}>{profile?.city ?? selectedDemoUser.label} · LOLO profile</Text>
            </View>
          </View>
          <Text style={styles.bio}>
            {profile?.primaryReason ?? 'Building a calmer relationship with credit, spending, and monthly stability.'}
          </Text>
          <View style={styles.scoreRow}>
            <MomentumDial score={selectedDemoUser.trustScore} delta={selectedDemoUser.upside.points} title="Private context, clearer month" />
          </View>
        </Card>
      </StorySection>

      <StorySection delay={80}>
        <Card>
          <SectionHeader title="Profile signals" subtitle="Private context LOLO uses to make the month easier to understand." />
          <View style={styles.signalGrid}>
            <ProfileSignal label="Top goal" value={profile?.topMoneyGoal ?? selectedDemoUser.goals[0]} />
            <ProfileSignal label="Credit stage" value={profile?.creditStage ?? 'Building'} />
            <ProfileSignal label="Income rhythm" value={profile?.incomeRhythm ?? 'Monthly'} />
            <ProfileSignal label="Stress level" value={profile?.financialStressLevel ?? selectedDemoUser.topRisk} />
          </View>
        </Card>
      </StorySection>

      <StorySection delay={140}>
        <Card>
          <SectionHeader title="Milestones" subtitle="Progress markers that stay private by default." />
          {milestones.length ? (
            <View style={styles.milestoneList}>
              {milestones.map((milestone, index) => (
                <View key={milestone} style={styles.milestoneItem}>
                  <Text style={styles.milestoneNumber}>{index + 1}</Text>
                  <Text style={styles.milestoneText}>{milestone}</Text>
                </View>
              ))}
            </View>
          ) : (
            <EmptyState title="No milestones yet" body="Milestones appear when you complete a first review, log a money moment, or protect a habit for the month." />
          )}
        </Card>
      </StorySection>

      <StorySection delay={200}>
        <Card style={styles.timelineCard}>
          <SectionHeader title="Financial biography" subtitle="A simple timeline of money moments, not a public net-worth feed." />
          <View style={styles.timeline}>
            {biography.map((item) => (
              <View key={item.title} style={styles.timelineItem}>
                <View style={styles.timelineRail}>
                  <View style={styles.timelineDot} />
                </View>
                <View style={styles.timelineCopy}>
                  <Text style={styles.period}>{item.period}</Text>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineBody}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </StorySection>

      <StorySection delay={260}>
        <Card>
          <SectionHeader title="Connected accounts" subtitle="LOLO is read-only by design. No money movement, no score impact." />
          {hasConnectedAccounts ? (
            <Text style={styles.body}>Accounts connected.</Text>
          ) : (
            <EmptyState
              title="No connected accounts"
              body="This prototype uses demo data. Future connections will require clear consent and will be used for read-only financial insight."
            />
          )}
          <PrimaryButton label="Connect later" variant="ghost" onPress={() => undefined} style={styles.connectButton} />
        </Card>
      </StorySection>

      <StorySection delay={320}>
        <Card>
          <SectionHeader title="Saved reflections" subtitle="The notes and reviews that make your money story searchable." />
          {journalPosts.slice(0, 2).map((entry) => (
            <View key={entry.title} style={styles.savedItem}>
              <Text style={styles.savedTitle}>{entry.title}</Text>
              <Text style={styles.savedMeta}>{entry.tags.join(' · ')} · {entry.helpful} helpful</Text>
            </View>
          ))}
          {productReviews.slice(0, 1).map((review) => (
            <View key={review.title} style={styles.savedItem}>
              <Text style={styles.savedTitle}>{review.title}</Text>
              <Text style={styles.savedMeta}>{review.category} · {review.rating} rating</Text>
            </View>
          ))}
        </Card>
      </StorySection>

      <StorySection delay={380}>
        <Card style={styles.privacyCard}>
          <SectionHeader title="Privacy and settings" subtitle="LOLO should earn attention slowly and handle financial context carefully." />
          <ProgressBar label="Data controls clarity" value={88} />
          <Text style={styles.privacyLine}>Demo data only in this prototype.</Text>
          <Text style={styles.privacyLine}>No bank credentials stored in the frontend.</Text>
          <Text style={styles.privacyLine}>No credit score impact.</Text>
        </Card>
      </StorySection>
    </ScrollView>
  );
};

const ProfileSignal = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.signal}>
    <Text style={styles.signalLabel}>{label}</Text>
    <Text style={styles.signalValue}>{value}</Text>
  </View>
);

const EmptyState = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.empty}>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyBody}>{body}</Text>
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
  profileHero: {
    backgroundColor: colors.card,
    marginTop: spacing.md,
  },
  heroRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.mint,
    borderRadius: radii.xl,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: 26,
    fontWeight: '900',
  },
  identity: {
    flex: 1,
  },
  name: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 34,
    letterSpacing: -0.2,
  },
  meta: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  bio: {
    color: colors.inkSoft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.lg,
  },
  scoreRow: {
    marginTop: spacing.xl,
  },
  scoreLabel: {
    color: colors.secondaryGreen,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  score: {
    color: colors.white,
    fontSize: 56,
    fontWeight: '800',
    lineHeight: 62,
  },
  scoreDelta: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: '800',
    paddingBottom: spacing.sm,
  },
  signalGrid: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  signal: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  signalLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  signalValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  milestoneList: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  milestoneItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  milestoneNumber: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  milestoneText: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  timelineCard: {
    backgroundColor: colors.card,
  },
  timeline: {
    marginTop: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  timelineRail: {
    alignItems: 'center',
    width: 18,
  },
  timelineDot: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 12,
    marginTop: spacing.xs,
    width: 12,
  },
  timelineCopy: {
    flex: 1,
  },
  period: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  timelineTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  timelineBody: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  body: {
    ...typography.body,
  },
  empty: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  emptyBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  connectButton: {
    marginTop: spacing.md,
  },
  savedItem: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  savedTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  savedMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  privacyCard: {
    backgroundColor: colors.card,
  },
  privacyLine: {
    ...typography.body,
    marginTop: spacing.sm,
  },
});
