import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { DashboardCard } from '../components/DashboardCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { journalPosts, productReviews } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

export const UserProfileScreen = () => {
  const { appUserProfile, selectedDemoUser } = useProfile();
  const profile = appUserProfile;
  const initials = profile?.avatarInitials || selectedDemoUser.rawUser.name.split(' ').map((part) => part[0]).join('').slice(0, 2);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="Profile" subtitle="Your LOLO trust profile and preferences." />
        <Card glow style={styles.hero}>
          <View style={styles.heroRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.heroCopy}>
              <Text style={styles.name}>{profile?.preferredName ?? selectedDemoUser.rawUser.name}</Text>
              <Text style={styles.meta}>{profile?.city ?? 'Demo city'} · Joined {profile ? new Date(profile.createdAt).toLocaleDateString() : 'Demo mode'}</Text>
            </View>
          </View>
          <Text style={styles.summary}>
            {profile?.primaryReason ?? 'This profile uses demo data to show how LOLO could summarize financial habits, trust signals, and next-best actions.'}
          </Text>
        </Card>

        <View style={styles.grid}>
          <DashboardCard title="Top money goal" value={profile?.topMoneyGoal ?? selectedDemoUser.goals[0]} icon="GO" />
          <DashboardCard title="Credit stage" value={profile?.creditStage ?? 'building'} icon="CR" />
          <DashboardCard title="Income rhythm" value={profile?.incomeRhythm ?? 'demo'} icon="IR" />
          <DashboardCard title="Health summary" value={`${selectedDemoUser.trustScore}`} subtitle={`${selectedDemoUser.topStrength} is strongest. Watch ${selectedDemoUser.topRisk}.`} icon="HS" important />
        </View>

        <Card>
          <SectionHeader title="Badges and milestones" subtitle="Private progress signals, not public flexing." />
          <View style={styles.badges}>
            {(profile?.badges ?? ['Trust profile created', 'Engine demo connected', 'AI insight viewed']).map((badge) => (
              <Text key={badge} style={styles.badge}>{badge}</Text>
            ))}
          </View>
        </Card>

        <Card>
          <SectionHeader title="Recent journal entries" />
          {journalPosts.slice(0, 2).map((entry) => (
            <Text key={entry.title} style={styles.listItem}>{entry.title}</Text>
          ))}
        </Card>

        <Card>
          <SectionHeader title="Saved product reviews" />
          {productReviews.slice(0, 2).map((review) => (
            <Text key={review.title} style={styles.listItem}>{review.title} · {review.rating}</Text>
          ))}
        </Card>

        <Card style={styles.privacy}>
          <SectionHeader title="Privacy settings" subtitle="Prototype defaults for a privacy-first financial trust product." />
          <Text style={styles.privacyLine}>Demo mode: on</Text>
          <Text style={styles.privacyLine}>Partner sharing: off by default</Text>
          <Text style={styles.privacyLine}>Financial integrations: user-consent required in future</Text>
          <PrimaryButton label="Edit profile placeholder" variant="ghost" onPress={() => undefined} style={styles.editButton} />
        </Card>
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
  hero: {
    backgroundColor: colors.card,
  },
  heroRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radii.xl,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '900',
  },
  heroCopy: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
  },
  meta: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  summary: {
    ...typography.body,
    marginTop: spacing.lg,
  },
  grid: {
    gap: spacing.lg,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badge: {
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
  listItem: {
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    color: colors.textPrimary,
    fontWeight: '800',
    paddingVertical: spacing.md,
  },
  privacy: {
    backgroundColor: colors.card,
  },
  privacyLine: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  editButton: {
    marginTop: spacing.lg,
  },
});
