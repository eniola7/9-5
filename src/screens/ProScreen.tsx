import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { subscriptionTiers } from '../data/subscriptionTiers';
import { useProfile } from '../context/ProfileContext';
import { colors, spacing, typography } from '../theme';
import { SubscriptionPlan } from '../types';

export const ProScreen = () => {
  const { plan, upgradePlan } = useProfile();
  const [modalVisible, setModalVisible] = useState(false);

  const upgrade = async (nextPlan: SubscriptionPlan) => {
    await upgradePlan(nextPlan);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <BrandHeader title="LOLO Pro" subtitle="Premium demo subscription flow." />
      <Card glow>
        <SectionHeader title="Upgrade the money operating system" subtitle="Professional-school and relocation guidance for higher-stakes planning." eyebrow="Pitch-ready plan" />
        <Text style={styles.copy}>Stripe integration coming soon. In this demo, upgrades unlock local Pro badges and premium positioning.</Text>
      </Card>

      {subscriptionTiers.map((tier) => (
        <Card key={tier.id} glow={tier.highlight || plan === tier.id}>
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{tier.name}</Text>
              <Text style={styles.price}>{tier.priceLabel}</Text>
            </View>
            {plan === tier.id ? <ProgressPill label="Active" status="completed" /> : null}
          </View>
          <Text style={styles.copy}>{tier.description}</Text>
          {tier.features.map((feature) => (
            <Text key={feature} style={styles.feature}>+ {feature}</Text>
          ))}
          <PrimaryButton
            label={plan === tier.id ? 'Current plan' : tier.id === 'Pro' ? 'Upgrade to LOLO Pro' : `Choose ${tier.name}`}
            variant={plan === tier.id ? 'ghost' : 'primary'}
            onPress={() => upgrade(tier.id)}
            style={styles.button}
          />
        </Card>
      ))}

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <Card glow>
            <Text style={styles.modalTitle}>Demo upgrade activated</Text>
            <Text style={styles.copy}>Stripe integration coming soon. Your local demo plan is now active.</Text>
            <PrimaryButton label="Continue" onPress={() => setModalVisible(false)} style={styles.button} />
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
  copy: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  price: {
    color: colors.accent,
    fontSize: 26,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  feature: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  button: {
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
