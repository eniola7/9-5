import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    color: Colors.muted,
    fontSize: 13,
  },
});
