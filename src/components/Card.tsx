import React from 'react';
import { View, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glow?: boolean;
}

export const Card = ({ children, style, glow }: CardProps) => (
  <View style={[styles.card, glow && styles.glow, style]}>
    <View pointerEvents="none" style={[styles.highlight, glow && styles.highlightGlow]} />
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.borderSoft,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    width: '100%',
    overflow: 'hidden',
    ...shadows.card,
  },
  glow: {
    borderColor: colors.primary,
    ...shadows.glow,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(244, 246, 242, 0.035)',
  },
  highlightGlow: {
    backgroundColor: 'rgba(66, 242, 139, 0.1)',
  },
  content: {
    position: 'relative',
  },
});
