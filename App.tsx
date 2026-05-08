import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { LandingScreen } from './src/screens/LandingScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import { hidePwaSplash, registerServiceWorker } from './src/services/registerServiceWorker';
import { colors } from './src/theme';
import { OnboardingAnswers } from './src/types';

const demoAnswers: OnboardingAnswers = {
  name: 'Ava',
  persona: 'Young Professional',
  creditScoreRange: '670-739',
  monthlyIncome: 5800,
  monthlyRent: 2050,
  studentLoanAmount: 18500,
  hasCreditCard: true,
  hasSsnOrItin: true,
  mainGoal: 'Build credit',
};

const AppInner = () => {
  const { profile, isReady, completeOnboarding } = useProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>Loading LOLO demo...</Text>
      </View>
    );
  }

  const startDemo = async () => {
    await completeOnboarding(demoAnswers);
  };

  if (!profile && !showOnboarding) {
    return <LandingScreen onStart={() => setShowOnboarding(true)} onDemo={startDemo} />;
  }

  if (!profile) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return <BottomTabs />;
};

export default function App() {
  useEffect(() => {
    hidePwaSplash();
    registerServiceWorker();
  }, []);

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
