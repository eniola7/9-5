import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createAndSaveProfile,
  getSavedRoadmap,
  getSignals,
  getSubscriptionPlan,
  getUserProfile,
  resetDemoData,
  setSubscriptionPlan,
  updateRoadmapItem,
} from '../services/mockBackend';
import { defaultDemoUserId, DemoUserId, getLoloDemoUser, LoloDemoUser } from '../data/loloDemoData';
import { OnboardingAnswers, RoadmapItem, Signal, SubscriptionPlan, UserProfile } from '../types';
import { UserProfileModel } from '../types/models';

interface ProfileContextValue {
  profile: UserProfile | null;
  roadmap: RoadmapItem[];
  signals: Signal[];
  plan: SubscriptionPlan;
  selectedDemoUserId: DemoUserId;
  selectedDemoUser: LoloDemoUser;
  sixtySecondDemoActive: boolean;
  appUserProfile: UserProfileModel | null;
  isReady: boolean;
  setSelectedDemoUserId: (id: DemoUserId) => void;
  startSixtySecondDemo: () => void;
  endSixtySecondDemo: () => void;
  saveAppUserProfile: (profile: UserProfileModel) => void;
  completeOnboarding: (answers: OnboardingAnswers) => Promise<void>;
  toggleRoadmapItem: (id: string, completed: boolean) => Promise<void>;
  upgradePlan: (plan: SubscriptionPlan) => Promise<void>;
  resetDemo: () => Promise<void>;
  refreshSignals: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [plan, setPlan] = useState<SubscriptionPlan>('Free');
  const [selectedDemoUserId, setSelectedDemoUserId] = useState<DemoUserId>(defaultDemoUserId);
  const [sixtySecondDemoActive, setSixtySecondDemoActive] = useState(false);
  const [appUserProfile, setAppUserProfile] = useState<UserProfileModel | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [storedProfile, storedRoadmap, storedPlan] = await Promise.all([
        getUserProfile(),
        getSavedRoadmap(),
        getSubscriptionPlan(),
      ]);
      setProfile(storedProfile);
      setRoadmap(storedRoadmap);
      setPlan(storedPlan);
      if (storedProfile) {
        setSignals(await getSignals(storedProfile, storedRoadmap));
      }
      setIsReady(true);
    };

    load();
  }, []);

  const completeOnboarding = async (answers: OnboardingAnswers) => {
    const nextProfile = await createAndSaveProfile(answers);
    const nextRoadmap = await getSavedRoadmap();
    const nextPlan = await getSubscriptionPlan();
    setProfile(nextProfile);
    setRoadmap(nextRoadmap);
    setPlan(nextPlan);
    setSignals(await getSignals(nextProfile, nextRoadmap));
  };

  const toggleRoadmapItem = async (id: string, completed: boolean) => {
    const nextRoadmap = await updateRoadmapItem(id, completed);
    setRoadmap(nextRoadmap);
    if (profile) setSignals(await getSignals(profile, nextRoadmap));
  };

  const upgradePlan = async (nextPlan: SubscriptionPlan) => {
    await setSubscriptionPlan(nextPlan);
    setPlan(nextPlan);
  };

  const resetDemo = async () => {
    await resetDemoData();
    setProfile(null);
    setRoadmap([]);
    setSignals([]);
    setPlan('Free');
    setSixtySecondDemoActive(false);
    setAppUserProfile(null);
  };

  const refreshSignals = async () => {
    if (!profile) return;
    setSignals(await getSignals(profile, roadmap));
  };

  const value = useMemo(
    () => ({
      profile,
      roadmap,
      signals,
      plan,
      selectedDemoUserId,
      selectedDemoUser: getLoloDemoUser(selectedDemoUserId),
      sixtySecondDemoActive,
      appUserProfile,
      isReady,
      setSelectedDemoUserId,
      startSixtySecondDemo: () => setSixtySecondDemoActive(true),
      endSixtySecondDemo: () => setSixtySecondDemoActive(false),
      saveAppUserProfile: setAppUserProfile,
      completeOnboarding,
      toggleRoadmapItem,
      upgradePlan,
      resetDemo,
      refreshSignals,
    }),
    [profile, roadmap, signals, plan, selectedDemoUserId, sixtySecondDemoActive, appUserProfile, isReady],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};
