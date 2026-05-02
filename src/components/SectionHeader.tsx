import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export const SectionHeader = ({ title, subtitle, eyebrow }: SectionHeaderProps) => (
  <View style={styles.container}>
    {eyebrow ? <Text style={typography.eyebrow}>{eyebrow}</Text> : null}
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.sectionTitle,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
    color: colors.textSecondary,
  },
});
