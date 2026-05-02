import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { MetricBar } from '../components/MetricBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';
import { RoadmapItem } from '../types';

export const RoadmapScreen = () => {
  const { profile, roadmap, toggleRoadmapItem } = useProfile();
  const [selected, setSelected] = useState<RoadmapItem | null>(null);
  const progress = useMemo(() => roadmap.length ? Math.round((roadmap.filter((item) => item.completed).length / roadmap.length) * 100) : 0, [roadmap]);

  if (!profile) return null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <BrandHeader title="Roadmap" subtitle={`${profile.persona} path`} />
      <Card glow>
        <SectionHeader title="Personalized roadmap" subtitle="Tasks update your progress and LOLO Signals." eyebrow="Dynamic plan" />
        <MetricBar label="Roadmap progress" value={progress} />
      </Card>

      {roadmap.map((item) => (
        <Pressable key={item.id} onPress={() => setSelected(item)}>
          <Card style={item.completed && styles.completedCard}>
            <View style={styles.itemHeader}>
              <View style={styles.flex}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.copy}>{item.description}</Text>
              </View>
              <ProgressPill label={item.completed ? 'Done' : item.status === 'in-progress' ? 'Next' : 'Later'} status={item.completed ? 'completed' : item.status} />
            </View>
            <PrimaryButton
              label={item.completed ? 'Mark incomplete' : 'Mark complete'}
              variant={item.completed ? 'ghost' : 'primary'}
              onPress={() => toggleRoadmapItem(item.id, !item.completed)}
              style={styles.taskButton}
            />
          </Card>
        </Pressable>
      ))}

      <Modal transparent visible={!!selected} animationType="fade">
        <View style={styles.modalOverlay}>
          <Card glow>
            <Text style={styles.modalTitle}>{selected?.title}</Text>
            <Text style={styles.copy}>{selected?.description}</Text>
            <Text style={styles.why}>Why this matters</Text>
            <Text style={styles.copy}>{selected?.whyItMatters}</Text>
            <PrimaryButton label="Close" onPress={() => setSelected(null)} style={styles.taskButton} />
          </Card>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  completedCard: {
    borderColor: colors.primary,
    backgroundColor: '#142019',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  copy: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  taskButton: {
    marginTop: spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.overlay,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  why: {
    color: colors.accent,
    fontWeight: '900',
    marginTop: spacing.lg,
  },
});
