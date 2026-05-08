import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { ProgressPill } from '../components/ProgressPill';
import { SectionHeader } from '../components/SectionHeader';
import { productReviews, roadmapItems } from '../data/financeMvp';
import { colors, radii, spacing, typography } from '../theme';

export const ProScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <BrandHeader title="Reviews" subtitle="Tasteful notes on products and life decisions, not status signaling." />

    <Card glow>
      <SectionHeader
        title="Product and decision reviews"
        subtitle="People can rate credit cards, banks, budgeting methods, apartments, cities, and car ownership decisions in context."
        eyebrow="Social intelligence"
      />
      <Text style={styles.copy}>The goal is practical pattern matching: what worked, what was expensive, and what someone wishes they knew earlier.</Text>
    </Card>

    {productReviews.map((review) => (
      <Card key={review.title} style={styles.reviewCard}>
        <View style={styles.reviewTop}>
          <View>
            <Text style={styles.category}>{review.category}</Text>
            <Text style={styles.title}>{review.title}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>{review.rating}</Text>
          </View>
        </View>
        <Text style={styles.copy}>{review.reflection}</Text>
        <View style={styles.reviewFooter}>
          <View style={styles.tagRow}>
            {review.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <Text style={styles.helpful}>{review.helpful} helpful</Text>
        </View>
      </Card>
    ))}

    <Card style={styles.roadmap}>
      <View style={styles.roadmapTop}>
        <SectionHeader title="Future roadmap" subtitle="The production path after the clickable MVP." />
        <ProgressPill label="Planned" />
      </View>
      {roadmapItems.map((item) => (
        <Text key={item} style={styles.roadmapItem}>+ {item}</Text>
      ))}
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  reviewCard: {
    backgroundColor: '#151A1D',
  },
  reviewTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'space-between',
  },
  category: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 27,
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: colors.primary,
    borderRadius: radii.md,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 50,
    padding: spacing.sm,
  },
  rating: {
    color: colors.accent,
    fontWeight: '900',
  },
  reviewFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  tagRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  helpful: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  roadmap: {
    backgroundColor: '#111A14',
  },
  roadmapTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  roadmapItem: {
    color: colors.textSecondary,
    fontWeight: '800',
    marginTop: spacing.md,
  },
});
