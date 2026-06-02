import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { roadmapItems } from '../../data/financeMvp';
import { colors, radii, spacing } from '../../theme';

export const RoadmapList = () => (
  <View style={styles.list}>
    {roadmapItems.map((item, index) => (
      <View key={item} style={styles.row}>
        <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
        <Text style={styles.item}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  index: {
    color: colors.primaryDeep,
    fontFamily: 'Courier',
    fontSize: 12,
    fontWeight: '800',
    width: 30,
  },
  item: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
  },
});
