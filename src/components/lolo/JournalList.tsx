import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { journalPosts } from '../../data/financeMvp';
import { colors, radii, spacing } from '../../theme';

export const JournalList = ({ limit = 4 }: { limit?: number }) => (
  <View style={styles.grid}>
    {journalPosts.slice(0, limit).map((post) => (
      <View key={post.title} style={styles.card}>
        <View style={styles.metaRow}>
          <Text style={styles.rating}>* {post.rating}</Text>
          <Text style={styles.helpful}>{post.helpful} helpful</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.reflection}</Text>
        <View style={styles.tags}>
          {post.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>{tag}</Text>
          ))}
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  rating: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: '800',
  },
  helpful: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 22,
    lineHeight: 28,
    marginTop: spacing.md,
  },
  body: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    backgroundColor: colors.mint,
    borderRadius: radii.pill,
    color: colors.primaryDeep,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
