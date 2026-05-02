import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface ProgressPillProps {
  label: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export const ProgressPill = ({ label, status }: ProgressPillProps) => {
  const statusStyles = {
    completed: { backgroundColor: '#DFF7E5', color: Colors.success },
    'in-progress': { backgroundColor: '#EAF3FF', color: Colors.primary },
    upcoming: { backgroundColor: '#F2F5FB', color: Colors.muted },
  }[status];

  return (
    <View style={[styles.pill, { backgroundColor: statusStyles.backgroundColor }]}> 
      <Text style={[styles.text, { color: statusStyles.color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
