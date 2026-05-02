import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createFinancialProfile } from '../utils/profileEngine';
import { getRoadmapTemplate } from '../utils/roadmapEngine';
import { generateSignals } from '../utils/signalEngine';
import { OnboardingAnswers, RoadmapItem, Signal, SubscriptionPlan, UserPersona, UserProfile } from '../types';

const PROFILE_KEY = 'LOLO_PROFILE';
const ROADMAP_KEY = 'LOLO_ROADMAP';
const PLAN_KEY = 'LOLO_PLAN';

const memoryStore: Record<string, string | undefined> = {};
const browserStorage = globalThis as typeof globalThis & {
  localStorage?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
  };
};

const canUseSecureStore = async () => Platform.OS !== 'web' && SecureStore.isAvailableAsync();

const setItem = async (key: string, value: string) => {
  if (await canUseSecureStore()) {
    await SecureStore.setItemAsync(key, value);
    return;
  }
  if (browserStorage.localStorage) {
    browserStorage.localStorage.setItem(key, value);
    return;
  }
  memoryStore[key] = value;
};

const getItem = async (key: string) => {
  if (await canUseSecureStore()) return SecureStore.getItemAsync(key);
  if (browserStorage.localStorage) return browserStorage.localStorage.getItem(key);
  return memoryStore[key] ?? null;
};

const deleteItem = async (key: string) => {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(key);
    return;
  }
  if (browserStorage.localStorage) {
    browserStorage.localStorage.removeItem(key);
    return;
  }
  delete memoryStore[key];
};

export const createAndSaveProfile = async (answers: OnboardingAnswers) => {
  const profile = createFinancialProfile(answers);
  await saveUserProfile(profile);
  await setSubscriptionPlan(profile.recommendedTrack);
  await setItem(ROADMAP_KEY, JSON.stringify(getPersonalizedRoadmap(profile.persona)));
  return profile;
};

export const saveUserProfile = async (profile: UserProfile) => {
  await setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const rawProfile = await getItem(PROFILE_KEY);
  return rawProfile ? JSON.parse(rawProfile) as UserProfile : null;
};

export const updateRoadmapItem = async (id: string, completed: boolean) => {
  const roadmap = await getSavedRoadmap();
  const updatedRoadmap = roadmap.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      completed,
      status: completed ? 'completed' as const : 'in-progress' as const,
    };
  });
  await setItem(ROADMAP_KEY, JSON.stringify(updatedRoadmap));
  return updatedRoadmap;
};

export const getSavedRoadmap = async () => {
  const rawRoadmap = await getItem(ROADMAP_KEY);
  if (rawRoadmap) return JSON.parse(rawRoadmap) as RoadmapItem[];
  const profile = await getUserProfile();
  return getPersonalizedRoadmap(profile?.persona ?? 'College Student');
};

export const getPersonalizedRoadmap = (persona: UserPersona) => getRoadmapTemplate(persona);

export const getSignals = async (profile: UserProfile, roadmap: RoadmapItem[]): Promise<Signal[]> =>
  generateSignals(profile, roadmap);

export const getSubscriptionPlan = async (): Promise<SubscriptionPlan> => {
  const storedPlan = await getItem(PLAN_KEY);
  return (storedPlan as SubscriptionPlan | null) ?? 'Free';
};

export const setSubscriptionPlan = async (plan: SubscriptionPlan) => {
  await setItem(PLAN_KEY, plan);
};

export const resetDemoData = async () => {
  await deleteItem(PROFILE_KEY);
  await deleteItem(ROADMAP_KEY);
  await deleteItem(PLAN_KEY);
};

// TODO: Replace this mock persistence with Supabase/Firebase.
// TODO: Add Plaid, Stripe, rent reporting, credit data, and OpenAI integrations only after compliance review.
