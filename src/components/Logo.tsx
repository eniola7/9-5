import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme';

interface LogoProps {
  compact?: boolean;
}

export const Logo = ({ compact }: LogoProps) => (
  <View style={styles.wrap}>
    <View style={styles.mark}>
      <Text style={styles.markText}>L</Text>
    </View>
    {!compact ? (
      <View>
        <Text style={styles.wordmark}>LOLO</Text>
        <Text style={styles.tagline}>Clarity OS</Text>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  markText: {
    color: colors.surfaceLight,
    fontSize: 20,
    fontWeight: '900',
  },
  wordmark: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
