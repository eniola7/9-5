import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme';

interface ProgressBarProps {
  label: string;
  value: number;
  showValue?: boolean;
  height?: number;
}

export const ProgressBar = ({ label, value, showValue = true, height = 10 }: ProgressBarProps) => {
  const progress = useRef(new Animated.Value(0)).current;
  const clampedValue = Math.max(0, Math.min(100, value));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: clampedValue,
      duration: 650,
      useNativeDriver: false,
    }).start();
  }, [clampedValue, progress]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {showValue ? <Text style={styles.value}>{clampedValue}%</Text> : null}
      </View>
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  value: {
    color: colors.accent,
    fontWeight: '900',
  },
  track: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderColor: colors.border,
    borderWidth: 1,
  },
  fill: {
    height: '100%',
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
