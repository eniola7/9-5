import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { mockSubscriptions } from '../data/mockSubscriptions';
import { Colors } from '../constants/theme';

export const ProScreen = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader title="LOLO Pro Track" subtitle="Premium guidance for med and professional students." />

      <Card style={styles.featureCard}>
        <Text style={styles.featureTitle}>Residency housing guides</Text>
        <Text style={styles.featureBody}>Step-by-step support for housing decisions during residency and relocation.</Text>
      </Card>

      <Card style={styles.featureCard}>
        <Text style={styles.featureTitle}>Loan organizer</Text>
        <Text style={styles.featureBody}>Keep loans, payment schedules, and refinancing needs in one calm view.</Text>
      </Card>

      <Card style={styles.featureCard}>
        <Text style={styles.featureTitle}>Credit optimization timeline</Text>
        <Text style={styles.featureBody}>See the right milestones for building credit while staying on track.</Text>
      </Card>

      <Card style={styles.featureCard}>
        <Text style={styles.featureTitle}>Relocation readiness</Text>
        <Text style={styles.featureBody}>Prepare for new cities with planning checklists and savings guidance.</Text>
      </Card>

      <Text style={styles.sectionSubtitle}>Pricing</Text>
      {mockSubscriptions.map((tier) => (
        <Card key={tier.id} style={[styles.subscriptionCard, tier.highlight && styles.highlightCard]}>
          <Text style={styles.subscriptionName}>{tier.name}</Text>
          <Text style={styles.subscriptionPrice}>{tier.priceLabel}</Text>
          <Text style={styles.subscriptionDescription}>{tier.description}</Text>
          {tier.features.map((feature) => (
            <Text key={feature} style={styles.subscriptionFeature}>• {feature}</Text>
          ))}
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaText}>{tier.highlight ? 'Upgrade to LOLO Pro' : 'Choose plan'}</Text>
          </Pressable>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  featureCard: {
    paddingVertical: 18,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8,
  },
  featureBody: {
    color: Colors.muted,
    lineHeight: 20,
  },
  sectionSubtitle: {
    marginTop: 12,
    marginBottom: 12,
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '700',
  },
  subscriptionCard: {
    paddingVertical: 20,
  },
  highlightCard: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  subscriptionPrice: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '900',
    color: Colors.secondary,
  },
  subscriptionDescription: {
    marginTop: 8,
    color: Colors.muted,
    marginBottom: 10,
  },
  subscriptionFeature: {
    color: Colors.muted,
    marginBottom: 4,
  },
  ctaButton: {
    marginTop: 14,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
