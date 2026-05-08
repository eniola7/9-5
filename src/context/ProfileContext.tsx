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

interface ProfileContextValue {
  profile: UserProfile | null;
  roadmap: RoadmapItem[];
  signals: Signal[];
  plan: SubscriptionPlan;
  selectedDemoUserId: DemoUserId;
  selectedDemoUser: LoloDemoUser;
  sixtySecondDemoActive: boolean;
  isReady: boolean;
  setSelectedDemoUserId: (id: DemoUserId) => void;
  startSixtySecondDemo: () => void;
  endSixtySecondDemo: () => void;
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
      isReady,
      setSelectedDemoUserId,
      startSixtySecondDemo: () => setSixtySecondDemoActive(true),
      endSixtySecondDemo: () => setSixtySecondDemoActive(false),
      completeOnboarding,
      toggleRoadmapItem,
      upgradePlan,
      resetDemo,
      refreshSignals,
    }),
    [profile, roadmap, signals, plan, selectedDemoUserId, sixtySecondDemoActive, isReady],
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
