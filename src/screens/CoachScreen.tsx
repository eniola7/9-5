import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { CoachMessageBubble } from '../components/CoachMessageBubble';
import { DemoUserSwitcher } from '../components/DemoUserSwitcher';
import { InsightCard } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { loloEngineDisclaimer } from '../data/loloDemoData';
import { useProfile } from '../context/ProfileContext';
import { generateCoachResponse } from '../services/coachService';
import { colors, radii, spacing } from '../theme';
import { CoachMessage } from '../types';

export const CoachScreen = () => {
  const { profile, roadmap, signals, selectedDemoUser, selectedDemoUserId, setSelectedDemoUserId } = useProfile();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ask LOLO Coach about credit habits, spending drift, subscriptions, stress forecasting, or your next reflection. Educational guidance only, not financial advice.',
    },
  ]);

  if (!profile) return null;

  const promptChips = [
    `What should ${selectedDemoUser.rawUser.name} do next?`,
    `Why is ${selectedDemoUser.topRisk} the top risk?`,
    `How can I improve ${selectedDemoUser.primaryCardName}?`,
    `What changed for ${selectedDemoUser.label}?`,
    'Write a monthly review from this data.',
  ];

  const generateDemoResponse = (text: string) => {
    const rec = selectedDemoUser.recommendations[0];
    const changed = selectedDemoUser.whatChanged[0] ?? 'The profile stayed mostly stable this month.';
    if (/risk|why/i.test(text)) {
      return `Why this matters: ${selectedDemoUser.topRisk} is the weakest signal in this demo profile, which means it has the clearest ability to change how stable the user looks.\n\nWhat to do next: ${selectedDemoUser.upside.action}.\n\n${loloEngineDisclaimer}`;
    }
    if (/card|score|payment|improve/i.test(text)) {
      return `Why this matters: utilization is ${selectedDemoUser.utilizationLabel}, and the engine simulation shows ${selectedDemoUser.simulations.make_payment.score_delta >= 0 ? '+' : ''}${selectedDemoUser.simulations.make_payment.score_delta} points after a payment scenario.\n\nWhat to do next: ${selectedDemoUser.simulations.make_payment.explanation}`;
    }
    if (/changed|month/i.test(text)) {
      return `What changed: ${changed}\n\nWhy this matters: LOLO turns behavior into a trust narrative before traditional credit systems fully understand the user.\n\nWhat to do next: ${selectedDemoUser.upside.action}.`;
    }
    if (/review|journal|reflection/i.test(text)) {
      return `Monthly review draft: ${selectedDemoUser.rawUser.name} is building trust through ${selectedDemoUser.topStrength.toLowerCase()}, while ${selectedDemoUser.topRisk.toLowerCase()} needs attention. The next best action is ${rec?.title ?? selectedDemoUser.upside.action}.`;
    }
    return `What to do next: ${rec?.title ?? selectedDemoUser.upside.action}.\n\nWhy this matters: ${rec?.explanation ?? selectedDemoUser.whatChanged.join(' ')}\n\nEstimated impact: ${rec?.estimated_impact ?? `+${selectedDemoUser.upside.points} possible points in the demo model`}.`;
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: 'user', text: trimmed }]);
    setQuery('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: `${generateDemoResponse(trimmed)}\n\n${generateCoachResponse(trimmed, profile, roadmap, signals)}`,
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.messages} contentContainerStyle={styles.messageContent}>
        <ScreenFade>
          <BrandHeader title="LOLO Coach" subtitle={`${profile.persona} guidance engine`} />
          <DemoUserSwitcher selectedId={selectedDemoUserId} onSelect={setSelectedDemoUserId} />
          <Card glow>
            <SectionHeader title="Ask what changed, why it matters, and what to do next." subtitle="A calm AI interface for credit growth, spending behavior, and financial trust." eyebrow="LOLO Coach" />
            {selectedDemoUser.recommendations[0] ? (
              <InsightCard
                title={selectedDemoUser.recommendations[0].title}
                body={selectedDemoUser.recommendations[0].explanation}
                action={`${selectedDemoUser.recommendations[0].urgency} urgency · ${selectedDemoUser.recommendations[0].estimated_impact}`}
              />
            ) : null}
            <Text style={styles.disclaimer}>{loloEngineDisclaimer}</Text>
          </Card>
          {messages.map((message) => (
            <CoachMessageBubble key={message.id} message={message} />
          ))}
          {isTyping ? <Text style={styles.typing}>LOLO Coach is typing...</Text> : null}
        </ScreenFade>
      </ScrollView>

      <View style={styles.panel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {promptChips.map((prompt) => (
            <Pressable key={prompt} style={styles.chip} onPress={() => sendMessage(prompt)}>
              <Text style={styles.chipText}>{prompt}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Card style={styles.inputCard}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ask LOLO Coach..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            onSubmitEditing={() => sendMessage(query)}
            returnKeyType="send"
          />
          <PrimaryButton label="Send" onPress={() => sendMessage(query)} style={styles.send} />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messages: {
    flex: 1,
  },
  messageContent: {
    padding: spacing.xl,
    paddingBottom: spacing.md,
  },
  typing: {
    color: colors.accent,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  panel: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  chips: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipText: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    minHeight: 44,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  send: {
    minWidth: 76,
    paddingVertical: spacing.sm,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.lg,
  },
});
