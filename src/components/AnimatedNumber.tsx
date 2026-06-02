import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextStyle, StyleProp } from 'react-native';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: StyleProp<TextStyle>;
}

export const AnimatedNumber = ({ value, prefix = '', suffix = '', duration = 900, style }: AnimatedNumberProps) => {
  const animated = useRef(new Animated.Value(Math.max(0, value - 42))).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const listener = animated.addListener(({ value: next }) => setDisplayValue(Math.round(next)));
    Animated.timing(animated, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();

    return () => animated.removeListener(listener);
  }, [animated, duration, value]);

  return <Text style={style}>{prefix}{displayValue.toLocaleString()}{suffix}</Text>;
};
