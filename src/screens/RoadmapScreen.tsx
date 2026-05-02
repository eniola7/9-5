import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { RoadmapItem as RoadmapItemCard } from '../components/RoadmapItem';
import { ScreenFade } from '../components/ScreenFade';
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
      <ScreenFade>
        <BrandHeader title="Roadmap" subtitle={`${profile.persona} path`} />
      <Card glow>
        <SectionHeader title="Personalized roadmap" subtitle="Tasks update your progress and LOLO Signals." eyebrow="Dynamic plan" />
        <ProgressBar label="Roadmap progress" value={progress} height={12} />
      </Card>

      {roadmap.map((item) => (
        <RoadmapItemCard
          key={item.id}
          item={item}
          onPress={() => setSelected(item)}
          onToggle={() => toggleRoadmapItem(item.id, !item.completed)}
        />
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
      </ScreenFade>
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
