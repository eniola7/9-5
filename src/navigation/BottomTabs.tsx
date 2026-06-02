import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows, spacing } from '../theme';
import { CoachScreen } from '../screens/CoachScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surfaceLight,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.primary,
  },
};

const tabMeta: Record<string, { label: string; icon: string }> = {
  Today: { label: 'Today', icon: 'T' },
  Review: { label: 'Review', icon: 'R' },
  Reflect: { label: 'Reflect', icon: 'F' },
  Me: { label: 'Me', icon: 'M' },
};

const tabLabel = (name: keyof typeof tabMeta) => ({ focused }: { focused: boolean }) => (
  <Text style={[styles.label, focused && styles.labelActive]}>{tabMeta[name].label}</Text>
);

const tabIcon = (name: keyof typeof tabMeta) => ({ focused }: { focused: boolean }) => (
  <View style={[styles.icon, focused && styles.iconActive]}>
    <Text style={[styles.iconText, focused && styles.iconTextActive]}>{tabMeta[name].icon}</Text>
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
      <Tab.Screen name="Today" component={HomeScreen} options={{ tabBarLabel: tabLabel('Today'), tabBarIcon: tabIcon('Today') }} />
      <Tab.Screen name="Review" component={RoadmapScreen} options={{ tabBarLabel: tabLabel('Review'), tabBarIcon: tabIcon('Review') }} />
      <Tab.Screen name="Reflect" component={CoachScreen} options={{ tabBarLabel: tabLabel('Reflect'), tabBarIcon: tabIcon('Reflect') }} />
      <Tab.Screen name="Me" component={UserProfileScreen} options={{ tabBarLabel: tabLabel('Me'), tabBarIcon: tabIcon('Me') }} />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    height: 78,
    paddingBottom: 12,
    paddingTop: 9,
    ...shadows.card,
  },
  tabItem: {
    gap: spacing.xs,
  },
  label: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  labelActive: {
    color: colors.primaryDark,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  iconActive: {
    backgroundColor: colors.surfaceDeep,
    borderColor: colors.surfaceDeep,
  },
  iconText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  iconTextActive: {
    color: colors.mint,
  },
});
