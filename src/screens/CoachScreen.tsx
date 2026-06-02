import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { StorySection } from '../components/StorySection';
import { journalPosts, journalThemes } from '../data/financeMvp';
import { loloEngineDisclaimer } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { colors, radii, spacing, typography } from '../theme';

const reflectionPrompts = [
  'What felt more expensive than I expected?',
  'Where did I feel most in control?',
  'What money decision made life calmer?',
  'What pattern should I protect next month?',
  'What would future me want to remember?',
];

const lifeEvents = [
  'Moved cities',
  'Paid down a card',
  'Caught subscription creep',
  'Built emergency buffer',
  'Rent week felt tight',
];

export const CoachScreen = () => {
  const { selectedDemoUser, appUserProfile } = useProfile();
  const [selectedPrompt, setSelectedPrompt] = useState(reflectionPrompts[0]);
  const [selectedEvent, setSelectedEvent] = useState(lifeEvents[1]);
  const [draft, setDraft] = useState('');
  const [savedDrafts, setSavedDrafts] = useState<string[]>([]);

  const primaryRecommendation = selectedDemoUser.recommendations[0];
  const monthlyChange = selectedDemoUser.whatChanged[0] ?? 'Your month stayed mostly stable, with one habit worth watching.';

  const aiReflection = useMemo(() => {
    const action = primaryRecommendation?.title ?? selectedDemoUser.upside.action;
    if (selectedPrompt.includes('expensive')) {
      return {
        title: 'Your convenience spending has a story',
        why: `${selectedDemoUser.spendingDriftPercent > 0 ? 'Spending drift is up' : 'Spending drift is calmer'} because daily categories are absorbing the pressure from rent, commuting, and longer workdays.`,
        next: `Name one recurring trigger, then try this action: ${action}.`,
      };
    }
    if (selectedPrompt.includes('control')) {
      return {
        title: selectedDemoUser.topStrength,
        why: `This is the strongest signal in your current profile. It suggests the month is not chaotic; it has a few pressure points that can be managed early.`,
        next: `Protect that strength by keeping one reminder before your next statement close.`,
      };
    }
    if (selectedPrompt.includes('calmer')) {
      return {
        title: 'Small actions reduced background stress',
        why: monthlyChange,
        next: `Turn the win into a repeatable rule for next month.`,
      };
    }
    return {
      title: 'A note for next month',
      why: `${selectedDemoUser.topRisk} is the part of the story most likely to create stress if ignored.`,
      next: selectedDemoUser.upside.action,
    };
  }, [monthlyChange, primaryRecommendation?.title, selectedDemoUser, selectedPrompt]);

  const saveReflection = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setSavedDrafts((current) => [`${selectedEvent}: ${trimmed}`, ...current]);
    setDraft('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StorySection>
        <Text style={typography.eyebrow}>Reflect</Text>
        <Text style={styles.title}>Make sense of the month before it becomes a blur.</Text>
        <Text style={styles.subtitle}>
          LOLO turns patterns into reflection prompts, useful explanations, and private notes you can return to later.
        </Text>
      </StorySection>

      <StorySection delay={80}>
        <Card glow style={styles.promptCard}>
          <Text style={styles.cardEyebrow}>Personalized prompt</Text>
          <Text style={styles.promptText}>{selectedPrompt}</Text>
          <View style={styles.promptGrid}>
            {reflectionPrompts.map((prompt) => (
              <Pressable
                key={prompt}
                onPress={() => setSelectedPrompt(prompt)}
                style={[styles.promptChip, selectedPrompt === prompt && styles.promptChipActive]}
              >
                <Text style={[styles.promptChipText, selectedPrompt === prompt && styles.promptChipTextActive]}>{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </Card>
      </StorySection>

      <StorySection delay={140}>
        <Card>
          <SectionHeader title={aiReflection.title} subtitle="Why this matters" />
          <Text style={styles.body}>{aiReflection.why}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionLabel}>What to do next</Text>
            <Text style={styles.actionText}>{aiReflection.next}</Text>
          </View>
          <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
        </Card>
      </StorySection>

      <StorySection delay={200}>
        <Card>
          <SectionHeader title="Log a life event" subtitle="The moments around money often explain the numbers better than a category chart." />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventRow}>
            {lifeEvents.map((event) => (
              <Pressable
                key={event}
                onPress={() => setSelectedEvent(event)}
                style={[styles.eventChip, selectedEvent === event && styles.eventChipActive]}
              >
                <Text style={[styles.eventText, selectedEvent === event && styles.eventTextActive]}>{event}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder={`Write a private note about "${selectedEvent.toLowerCase()}"`}
            placeholderTextColor={colors.textMuted}
            multiline
            style={styles.reflectionInput}
          />
          <PrimaryButton label="Save reflection" onPress={saveReflection} style={styles.saveButton} />
        </Card>
      </StorySection>

      <StorySection delay={260}>
        <Card style={styles.reviewCard}>
          <SectionHeader title="Monthly money review" subtitle="A Letterboxd-style layer for progress, tradeoffs, and honest notes." />
          <View style={styles.reviewList}>
            {[...savedDrafts, ...journalPosts.map((post) => post.title)].slice(0, 4).map((entry, index) => (
              <View key={`${entry}-${index}`} style={styles.reviewItem}>
                <View style={styles.reviewDot} />
                <View style={styles.reviewCopy}>
                  <Text style={styles.reviewTitle}>{entry}</Text>
                  <Text style={styles.reviewMeta}>{index === 0 && savedDrafts.length ? 'Private reflection' : `${journalPosts[index % journalPosts.length]?.rating ?? '4.5'} rating · ${(journalPosts[index % journalPosts.length]?.helpful ?? 42)} helpful`}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </StorySection>

      <StorySection delay={320}>
        <Card>
          <SectionHeader title="Themes you are building" subtitle="Private tags that make the financial biography feel searchable over time." />
          <View style={styles.themeWrap}>
            {journalThemes.slice(0, 6).map((theme) => (
              <Text key={theme} style={styles.theme}>{theme}</Text>
            ))}
          </View>
          <ProgressBar label={`${appUserProfile?.preferredName ?? selectedDemoUser.rawUser.name.split(' ')[0]}'s reflection rhythm`} value={savedDrafts.length ? 72 : 38} />
        </Card>
      </StorySection>

      {savedDrafts.length === 0 ? (
        <StorySection delay={380}>
          <Card style={styles.empty}>
            <Text style={styles.emptyTitle}>No private reflections yet</Text>
            <Text style={styles.emptyBody}>Start with one sentence. LOLO becomes more useful when the story around your money is saved alongside the numbers.</Text>
          </Card>
        </StorySection>
      ) : null}
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
  title: {
    color: colors.textPrimary,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 42,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.md,
  },
  promptCard: {
    backgroundColor: colors.surfaceDeep,
  },
  cardEyebrow: {
    color: colors.secondaryGreen,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  promptText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginTop: spacing.md,
  },
  promptGrid: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  promptChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  promptChipActive: {
    backgroundColor: colors.mint,
  },
  promptChipText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  promptChipTextActive: {
    color: colors.primaryDark,
  },
  body: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  actionBox: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  actionLabel: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  actionText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    marginTop: spacing.sm,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.lg,
  },
  eventRow: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  eventChip: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  eventChipActive: {
    backgroundColor: colors.primary,
  },
  eventText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  eventTextActive: {
    color: colors.white,
  },
  reflectionInput: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    minHeight: 110,
    padding: spacing.lg,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: spacing.md,
  },
  reviewCard: {
    backgroundColor: colors.card,
  },
  reviewList: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  reviewItem: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  reviewDot: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 10,
    width: 10,
  },
  reviewCopy: {
    flex: 1,
  },
  reviewTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  reviewMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  themeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  theme: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  empty: {
    backgroundColor: colors.backgroundElevated,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyBody: {
    ...typography.body,
    marginTop: spacing.sm,
  },
});
