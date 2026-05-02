import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { ScreenFade } from '../components/ScreenFade';
import { SignalCard } from '../components/SignalCard';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';
import { Signal } from '../types';

export const AlertsScreen = () => {
  const { signals, refreshSignals } = useProfile();
  const [selected, setSelected] = useState<Signal | null>(null);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenFade>
        <BrandHeader title="LOLO Signals" subtitle="Rule-based markers, not predictions." />
      <Card glow>
        <SectionHeader title="Financial risk signals" subtitle="Generated from your mock profile and roadmap progress." eyebrow="Predictive-style demo" />
        <Text style={styles.copy}>LOLO uses personalized guidance language without claiming guaranteed outcomes or real-time private data access.</Text>
        <PrimaryButton label="Refresh signals" onPress={refreshSignals} style={styles.refresh} />
      </Card>

      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} onPress={() => setSelected(signal)} />
      ))}

        <Modal transparent visible={!!selected} animationType="fade">
          <View style={styles.modalOverlay}>
            <Card glow>
              <Text style={styles.modalTitle}>{selected?.title}</Text>
              <Text style={styles.copy}>{selected?.whyItMatters}</Text>
              <Text style={styles.action}>{selected?.suggestedAction}</Text>
              <PrimaryButton label="Got it" onPress={() => setSelected(null)} style={styles.cta} />
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
  },
  refresh: {
    marginTop: spacing.lg,
  },
  action: {
    color: colors.accent,
    fontWeight: '800',
    marginTop: spacing.md,
    lineHeight: 20,
  },
  cta: {
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
    marginBottom: spacing.md,
  },
});
