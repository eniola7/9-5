import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { samplePrompts, hardcodedResponses, mockChatMessages } from '../data/mockChat';
import { Colors } from '../constants/theme';

export const CoachScreen = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [query, setQuery] = useState('');

  const sendMessage = (text: string) => {
    const userMessage = { id: `user-${Date.now()}`, role: 'user' as const, text };
    const assistantText = hardcodedResponses[text] || 'Great question — LOLO Coach is here to help with credit-friendly steps.';
    const assistantMessage = { id: `assistant-${Date.now()}`, role: 'assistant' as const, text: assistantText };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setQuery('');
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.messageList} contentContainerStyle={styles.messageContent}>
        <SectionHeader title="LOLO AI Coach" subtitle="Educational guidance for students and early professionals." />
        {messages.map((message) => (
          <View key={message.id} style={[styles.messageBubble, message.role === 'assistant' ? styles.assistantBubble : styles.userBubble]}>
            <Text style={[styles.messageText, message.role === 'assistant' ? styles.assistantText : styles.userText]}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.promptPanel}>
        <Text style={styles.promptTitle}>Try these prompts</Text>
        <View style={styles.promptRow}>
          {samplePrompts.map((prompt) => (
            <Pressable key={prompt} style={styles.promptChip} onPress={() => sendMessage(prompt)}>
              <Text style={styles.promptChipText}>{prompt}</Text>
            </Pressable>
          ))}
        </View>
        <Card style={styles.inputCard}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ask LOLO Coach anything..."
            placeholderTextColor={Colors.muted}
            style={styles.textInput}
            onSubmitEditing={() => query.trim() && sendMessage(query.trim())}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={() => query.trim() && sendMessage(query.trim())}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messageContent: {
    paddingBottom: 14,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    maxWidth: '88%',
  },
  assistantBubble: {
    backgroundColor: Colors.surface,
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  assistantText: {
    color: Colors.text,
  },
  userText: {
    color: '#FFFFFF',
  },
  promptPanel: {
    backgroundColor: '#F8FBFF',
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  promptTitle: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  promptRow: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  promptChip: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  promptChipText: {
    color: Colors.muted,
    fontSize: 13,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    minHeight: 48,
    color: Colors.secondary,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
