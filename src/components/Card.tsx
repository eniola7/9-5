import React from 'react';
import { View, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glow?: boolean;
}

export const Card = ({ children, style, glow }: CardProps) => (
  <View style={[styles.card, glow && styles.glow, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    width: '100%',
    ...shadows.card,
  },
  glow: {
    borderColor: colors.primary,
    ...shadows.glow,
  },
});
