import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { CoachMessage } from '../types';

interface CoachMessageBubbleProps {
  message: CoachMessage;
}

export const CoachMessageBubble = ({ message }: CoachMessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
      <Text style={[styles.messageText, isUser && styles.userText]}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    maxWidth: '90%',
    borderWidth: 1,
    ...shadows.card,
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
});
