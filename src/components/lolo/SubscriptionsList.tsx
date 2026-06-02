import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { subscriptions } from '../../data/financeMvp';
import { colors, radii, spacing } from '../../theme';

const tone = (note: string) => {
  if (note.toLowerCase().includes('pause')) return { backgroundColor: 'rgba(201, 138, 46, 0.14)', color: colors.warning };
  if (note.toLowerCase().includes('review')) return { backgroundColor: 'rgba(201, 163, 91, 0.16)', color: colors.accentForeground };
  return { backgroundColor: 'rgba(31, 143, 95, 0.14)', color: colors.success };
};

export const SubscriptionsList = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Subscriptions</Text>
        <Text style={styles.subtitle}>Active · {subscriptions.length}</Text>
      </View>
    </View>
    {subscriptions.map((item) => {
      const toneStyle = tone(item.note);
      return (
        <View key={item.name} style={styles.row}>
          <View style={styles.copy}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.cadence}>{item.cadence}</Text>
          </View>
          <View style={styles.trailing}>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={[styles.note, toneStyle]}>{item.note}</Text>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: spacing.xl,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 20,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  copy: {
    flex: 1,
  },
  name: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  cadence: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  trailing: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  amount: {
    color: colors.ink,
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
  },
  note: {
    borderRadius: radii.pill,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
