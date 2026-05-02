import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { ProScreen } from '../screens/ProScreen';
import { CoachScreen } from '../screens/CoachScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { Text } from 'react-native';
import { Colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const tabLabel = (label: string) => ({ focused }: { focused: boolean }) => (
  <Text style={{ color: focused ? Colors.primary : Colors.muted, fontSize: 11, marginTop: 2 }}>{label}</Text>
);

export const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#F0F4FB',
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.muted,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: tabLabel('Home') }} />
        <Tab.Screen name="Roadmap" component={RoadmapScreen} options={{ tabBarLabel: tabLabel('Roadmap') }} />
        <Tab.Screen name="Pro" component={ProScreen} options={{ tabBarLabel: tabLabel('LOLO Pro') }} />
        <Tab.Screen name="Coach" component={CoachScreen} options={{ tabBarLabel: tabLabel('Coach') }} />
        <Tab.Screen name="Alerts" component={AlertsScreen} options={{ tabBarLabel: tabLabel('Alerts') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
