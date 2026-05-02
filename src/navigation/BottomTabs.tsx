import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { ProScreen } from '../screens/ProScreen';
import { CoachScreen } from '../screens/CoachScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { ProfileBuilderScreen } from '../screens/ProfileBuilderScreen';
import { colors, shadows } from '../theme';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.primary,
  },
};

const tabLabel = (label: string) => ({ focused }: { focused: boolean }) => (
  <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
);

const tabIcon = (abbr: string) => ({ focused }: { focused: boolean }) => (
  <View style={[styles.icon, focused && styles.iconActive]}>
    <Text style={[styles.iconText, focused && styles.iconTextActive]}>{abbr}</Text>
  </View>
);

export const BottomTabs = () => (
  <NavigationContainer theme={navTheme}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} options={{ tabBarLabel: tabLabel('Home'), tabBarIcon: tabIcon('H') }} />
      <Tab.Screen name="Roadmap" component={RoadmapScreen} options={{ tabBarLabel: tabLabel('Roadmap'), tabBarIcon: tabIcon('R') }} />
      <Tab.Screen name="Signals" component={AlertsScreen} options={{ tabBarLabel: tabLabel('Signals'), tabBarIcon: tabIcon('S') }} />
      <Tab.Screen name="Coach" component={CoachScreen} options={{ tabBarLabel: tabLabel('Coach'), tabBarIcon: tabIcon('C') }} />
      <Tab.Screen name="Profile" component={ProfileBuilderScreen} options={{ tabBarLabel: tabLabel('Profile'), tabBarIcon: tabIcon('P') }} />
      <Tab.Screen name="Pro" component={ProScreen} options={{ tabBarLabel: tabLabel('Pro'), tabBarIcon: tabIcon('$') }} />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    height: 78,
    paddingBottom: 10,
    paddingTop: 8,
    ...shadows.card,
  },
  tabItem: {
    gap: 2,
  },
  label: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  labelActive: {
    color: colors.accent,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
    borderWidth: 1,
  },
  iconActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    borderColor: colors.primary,
    ...shadows.glow,
  },
  iconText: {
    color: colors.textMuted,
    fontWeight: '900',
    fontSize: 11,
  },
  iconTextActive: {
    color: colors.accent,
  },
});
