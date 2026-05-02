import { StyleSheet } from 'react-native';

export const Colors = {
  background: '#F5FBFF',
  surface: '#FFFFFF',
  card: '#EAF3FF',
  primary: '#2069FF',
  primarySoft: '#D8E6FF',
  secondary: '#0A2D67',
  text: '#14233B',
  muted: '#5D6F8A',
  warning: '#FFB443',
  danger: '#F14949',
  success: '#2B8A3E',
};

export const Shadows = StyleSheet.create({
  soft: {
    shadowColor: '#0B1E3E',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
});
