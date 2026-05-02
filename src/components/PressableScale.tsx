import React, { useRef, useState } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  hoveredStyle?: StyleProp<ViewStyle>;
}

export const PressableScale = ({ children, style, pressedStyle, hoveredStyle, onPressIn, onPressOut, onHoverIn, onHoverOut, ...props }: PressableScaleProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [hovered, setHovered] = useState(false);

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      friction: 7,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      {...props}
      onPressIn={(event) => {
        animateTo(0.97);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1);
        onPressOut?.(event);
      }}
      onHoverIn={(event) => {
        setHovered(true);
        onHoverIn?.(event);
      }}
      onHoverOut={(event) => {
        setHovered(false);
        onHoverOut?.(event);
      }}
    >
      {({ pressed }) => (
        <Animated.View style={[style, hovered && hoveredStyle, pressed && pressedStyle, { transform: [{ scale }] }]}>
          {children}
        </Animated.View>
      )}
    </Pressable>
  );
};
