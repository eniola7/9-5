import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { CoachMessageBubble } from '../components/CoachMessageBubble';
import { InsightCard } from '../components/MetricWidgets';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFade } from '../components/ScreenFade';
import { SectionHeader } from '../components/SectionHeader';
import { aiRecommendations } from '../data/financeMvp';
import { useProfile } from '../context/ProfileContext';
import { generateCoachResponse } from '../services/coachService';
import { colors, radii, spacing } from '../theme';
import { CoachMessage } from '../types';

const promptChips = [
  'What should I do next?',
  'How should I time my card payment?',
  'What subscriptions should I review?',
  'Is next month getting tight?',
  'Help me write a monthly reflection.',
];

export const CoachScreen = () => {
  const { profile, roadmap, signals } = useProfile();
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
          text: generateCoachResponse(trimmed, profile, roadmap, signals),
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
          <Card glow>
            <SectionHeader title="Ask what changed, why it matters, and what to do next." subtitle="A calm AI interface for credit growth, spending behavior, and financial trust." eyebrow="LOLO Coach" />
            <InsightCard {...aiRecommendations[0]} />
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
});
