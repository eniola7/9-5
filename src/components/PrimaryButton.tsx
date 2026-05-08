import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';
import { PressableScale } from './PressableScale';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton = ({ label, onPress, variant = 'primary', style }: PrimaryButtonProps) => (
  <PressableScale
    style={[
      styles.button,
      variant === 'ghost' && styles.ghost,
      style,
    ]}
    pressedStyle={variant === 'ghost' ? styles.ghostPressed : styles.pressed}
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{label}</Text>
  </PressableScale>
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
    borderColor: colors.borderSoft,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    backgroundColor: colors.accent,
    shadowOpacity: 0.42,
  },
  ghostPressed: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(66, 242, 139, 0.14)',
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
