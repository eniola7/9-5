import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { PublicPageKey } from './src/components/PublicHeader';
import { AuthScreen } from './src/screens/AuthScreen';
import { CreateProfileScreen } from './src/screens/CreateProfileScreen';
import { DemoPresentationScreen } from './src/screens/DemoPresentationScreen';
import { LandingScreen } from './src/screens/LandingScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { StaticPageScreen } from './src/screens/StaticPageScreen';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import { hidePwaSplash, registerServiceWorker } from './src/services/registerServiceWorker';
import { colors } from './src/theme';
import { OnboardingAnswers } from './src/types';
import { UserProfileModel } from './src/types/models';
import { createPlaceholderAuth0User } from './src/services/auth0Service';

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
  const { profile, isReady, completeOnboarding, startSixtySecondDemo, saveAppUserProfile } = useProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [publicPage, setPublicPage] = useState<PublicPageKey>('landing');
  const [pendingUser, setPendingUser] = useState<{ id: string; name: string; email: string } | null>(null);

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
    startSixtySecondDemo();
  };

  const handleSignup = (name: string, email: string) => {
    const auth0User = createPlaceholderAuth0User(name, email);
    setPendingUser({ id: auth0User.sub, name: auth0User.name ?? name, email: auth0User.email ?? email });
    setPublicPage('signup');
  };

  const handleLogin = () => {
    const auth0User = createPlaceholderAuth0User();
    setPendingUser({ id: auth0User.sub, name: auth0User.name ?? 'Ava Reynolds', email: auth0User.email ?? 'ava@example.com' });
  };

  const finishProfile = async (appProfile: UserProfileModel) => {
    saveAppUserProfile(appProfile);
    await completeOnboarding({
      ...demoAnswers,
      name: appProfile.preferredName,
      mainGoal: appProfile.topMoneyGoal === 'Reduce stress' ? 'Reduce stress' : 'Build credit',
    });
  };

  if (!profile && pendingUser) {
    return <CreateProfileScreen userId={pendingUser.id} email={pendingUser.email} name={pendingUser.name} onComplete={finishProfile} />;
  }

  if (!profile && !showOnboarding) {
    if (publicPage === 'presentation') {
      return <DemoPresentationScreen onLaunchDemo={startDemo} onBack={() => setPublicPage('landing')} onNavigate={setPublicPage} />;
    }
    if (publicPage === 'login' || publicPage === 'signup' || publicPage === 'forgot') {
      return <AuthScreen mode={publicPage} onNavigate={setPublicPage} onDemo={startDemo} onLogin={handleLogin} onSignup={handleSignup} />;
    }
    if (publicPage === 'privacy' || publicPage === 'terms' || publicPage === 'disclaimers' || publicPage === 'about' || publicPage === 'careers' || publicPage === 'demo' || publicPage === 'pricing' || publicPage === 'contact') {
      return <StaticPageScreen page={publicPage} onNavigate={setPublicPage} onDemo={startDemo} />;
    }
    return <LandingScreen onStart={() => setShowOnboarding(true)} onDemo={startDemo} onPresentation={() => setPublicPage('presentation')} onNavigate={setPublicPage} />;
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
