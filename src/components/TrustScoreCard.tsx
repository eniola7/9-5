import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { ProgressBar } from './ProgressBar';

interface TrustScoreCardProps {
  score: number;
  delta?: string;
  label?: string;
}

export const TrustScoreCard = ({ score, delta = '+18 this month', label = 'Personal Trust Score' }: TrustScoreCardProps) => {
  const animated = useRef(new Animated.Value(score - 42)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    const listener = animated.addListener(({ value }) => setDisplayScore(Math.round(value)));
    Animated.parallel([
      Animated.timing(animated, { toValue: score, duration: 900, useNativeDriver: false }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glow, { toValue: 1, duration: 1600, useNativeDriver: true }),
          Animated.timing(glow, { toValue: 0, duration: 1600, useNativeDriver: true }),
        ]),
      ),
    ]).start();

    return () => animated.removeListener(listener);
  }, [animated, glow, score]);

  const glowStyle = {
    opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] }),
    transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.06] }) }],
  };

  return (
    <View style={styles.card}>
      <Animated.View pointerEvents="none" style={[styles.orbit, glowStyle]} />
      <View style={styles.top}>
        <View>
          <Text style={typography.eyebrow}>{label}</Text>
          <Text style={styles.caption}>Built from credit health, cash rhythm, runway, and consistency.</Text>
        </View>
        <Text style={styles.delta}>{delta}</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>{displayScore}</Text>
        <View style={styles.status}>
          <Text style={styles.statusLabel}>Signal</Text>
          <Text style={styles.statusValue}>Strengthening</Text>
        </View>
      </View>
      <ProgressBar label="Trust trajectory" value={86} height={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderRadius: radii.xl,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    padding: spacing.xxl,
    width: '100%',
    ...shadows.glow,
  },
  orbit: {
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    borderRadius: 140,
    height: 280,
    position: 'absolute',
    right: -90,
    top: -110,
    width: 280,
  },
  top: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'space-between',
  },
  caption: {
    ...typography.small,
    marginTop: spacing.sm,
    maxWidth: 520,
  },
  delta: {
    backgroundColor: colors.cardSoft,
    borderRadius: radii.pill,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  scoreRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xl,
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  score: {
    color: colors.textPrimary,
    fontSize: 86,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 92,
  },
  status: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    padding: spacing.lg,
  },
  statusLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  statusValue: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
});
