import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { demoUserLabels, DemoUserId } from '../data/loloDemoData';
import { colors, radii, spacing, typography } from '../theme';
import { PressableScale } from './PressableScale';

interface DemoUserSwitcherProps {
  selectedId: DemoUserId;
  onSelect: (id: DemoUserId) => void;
}

const demoUserIds = Object.keys(demoUserLabels) as DemoUserId[];

export const DemoUserSwitcher = ({ selectedId, onSelect }: DemoUserSwitcherProps) => (
  <View style={styles.wrap}>
    <Text style={styles.label}>Demo user</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {demoUserIds.map((id) => {
        const active = id === selectedId;
        return (
          <PressableScale key={id} onPress={() => onSelect(id)} style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{demoUserLabels[id]}</Text>
          </PressableScale>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.small,
    color: colors.accent,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  row: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  chip: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  chipTextActive: {
    color: colors.textPrimary,
  },
});
