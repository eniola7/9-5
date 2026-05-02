import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import { colors } from './src/theme';

const AppInner = () => {
  const { profile, isReady, completeOnboarding } = useProfile();

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>Loading LOLO demo...</Text>
      </View>
    );
  }

  if (!profile) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return <BottomTabs />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ProfileProvider>
          <AppInner />
          <StatusBar style="light" />
        </ProfileProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
