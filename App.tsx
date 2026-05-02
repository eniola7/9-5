import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import { mockProfiles } from './src/data/mockProfiles';

const AppInner = () => {
  const { profile, setProfile } = useProfile();

  if (!profile) {
    return <OnboardingScreen profiles={mockProfiles} onSelectProfile={setProfile} />;
  }

  return <BottomTabs />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ProfileProvider>
          <AppInner />
          <StatusBar style="dark" />
        </ProfileProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBFF',
  },
});
