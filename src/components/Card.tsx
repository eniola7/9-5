import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Shadows } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    ...Shadows.soft,
  },
});
