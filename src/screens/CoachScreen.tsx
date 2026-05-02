import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { useProfile } from '../context/ProfileContext';
import { generateCoachResponse } from '../services/coachService';
import { colors, radii, spacing, typography } from '../theme';
import { CoachMessage } from '../types';

const promptChips = [
  'What should I do next?',
  'How can I improve my credit?',
  'Am I ready for an apartment?',
  'How do I prepare for residency?',
  'What should I avoid?',
];

export const CoachScreen = () => {
  const { profile, roadmap, signals } = useProfile();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ask LOLO Coach about credit, rent, loans, residency, subscriptions, or your next best step. Educational guidance only, not financial advice.',
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
        <BrandHeader title="LOLO Coach" subtitle={`${profile.persona} guidance engine`} />
        <Card glow>
          <SectionHeader title="Context-aware mock coach" subtitle="Rule-based responses using your profile, roadmap, and LOLO Signals." eyebrow="No OpenAI calls yet" />
        </Card>
        {messages.map((message) => (
          <View key={message.id} style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={[styles.messageText, message.role === 'user' && styles.userText]}>{message.text}</Text>
          </View>
        ))}
        {isTyping ? <Text style={styles.typing}>LOLO Coach is typing...</Text> : null}
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
  bubble: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    maxWidth: '90%',
    borderWidth: 1,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryDark,
    borderColor: colors.primary,
  },
  messageText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  userText: {
    color: '#F0FFF4',
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
    borderColor: colors.border,
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
