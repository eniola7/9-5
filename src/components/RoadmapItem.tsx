import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { RoadmapItem as RoadmapItemType } from '../types';
import { DashboardCard } from './DashboardCard';
import { PrimaryButton } from './PrimaryButton';
import { ProgressPill } from './ProgressPill';

interface RoadmapItemProps {
  item: RoadmapItemType;
  onPress: () => void;
  onToggle: () => void;
}

export const RoadmapItem = ({ item, onPress, onToggle }: RoadmapItemProps) => (
  <DashboardCard
    title={item.title}
    icon={item.completed ? '✓' : item.status === 'in-progress' ? '→' : '•'}
    important={item.status === 'in-progress' && !item.completed}
    onPress={onPress}
    style={item.completed && styles.completed}
  >
    <View style={styles.header}>
      <Text style={styles.description}>{item.description}</Text>
      <ProgressPill label={item.completed ? 'Done' : item.status === 'in-progress' ? 'Next' : 'Later'} status={item.completed ? 'completed' : item.status} />
    </View>
    <PrimaryButton
      label={item.completed ? 'Mark incomplete' : 'Mark complete'}
      variant={item.completed ? 'ghost' : 'primary'}
      onPress={onToggle}
      style={styles.button}
    />
  </DashboardCard>
);

const styles = StyleSheet.create({
  completed: {
    borderColor: colors.primary,
    backgroundColor: '#142019',
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    marginTop: spacing.md,
  },
  description: {
    ...typography.body,
    flex: 1,
  },
  button: {
    marginTop: spacing.lg,
  },
});
