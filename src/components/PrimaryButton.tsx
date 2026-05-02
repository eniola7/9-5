import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton = ({ label, onPress, variant = 'primary', style }: PrimaryButtonProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      variant === 'ghost' && styles.ghost,
      pressed && styles.pressed,
      style,
    ]}
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    ...shadows.glow,
  },
  ghost: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.82,
  },
  text: {
    color: '#07100A',
    fontWeight: '900',
    fontSize: 14,
  },
  ghostText: {
    color: colors.textPrimary,
  },
});
