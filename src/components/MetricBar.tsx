import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from './ProgressBar';

interface MetricBarProps {
  label: string;
  value: number;
  suffix?: string;
}

export const MetricBar = ({ label, value, suffix = '%' }: MetricBarProps) => {
  if (suffix !== '%') return <View />;
  return <ProgressBar label={label} value={value} />;
};
