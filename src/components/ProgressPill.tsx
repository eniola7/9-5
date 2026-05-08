import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme';
import { RiskLevel, RoadmapStatus } from '../types';

interface ProgressPillProps {
  label: string;
  status?: RoadmapStatus;
  risk?: RiskLevel;
}

export const ProgressPill = ({ label, status, risk }: ProgressPillProps) => {
  const tone = getTone(status, risk);

  return (
    <View style={[styles.pill, { backgroundColor: tone.background, borderColor: tone.border }]}>
      <Text style={[styles.text, { color: tone.text }]}>{label}</Text>
    </View>
  );
};

const getTone = (status?: RoadmapStatus, risk?: RiskLevel) => {
  if (risk === 'High') return { background: 'rgba(239, 68, 68, 0.14)', border: colors.danger, text: colors.danger };
  if (risk === 'Medium') return { background: 'rgba(245, 158, 11, 0.14)', border: colors.warning, text: colors.warning };
  if (status === 'completed' || risk === 'Low') {
    return { background: 'rgba(66, 242, 139, 0.14)', border: colors.primary, text: colors.accent };
  }
  if (status === 'in-progress') return { background: 'rgba(66, 242, 139, 0.12)', border: colors.primaryDark, text: colors.primary };
  return { background: colors.cardSoft, border: colors.borderSoft, text: colors.textSecondary };
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
  },
});
