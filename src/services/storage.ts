import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { UserProfile } from '../types';

const PROFILE_KEY = 'LOLO_USER_PROFILE';
const browserStorage = globalThis as typeof globalThis & {
  localStorage?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
  };
};

const canUseSecureStore = async () => Platform.OS !== 'web' && SecureStore.isAvailableAsync();

export const saveUserProfile = async (profile: UserProfile) => {
  try {
    const serializedProfile = JSON.stringify(profile);

    if (await canUseSecureStore()) {
      await SecureStore.setItemAsync(PROFILE_KEY, serializedProfile);
      return;
    }

    browserStorage.localStorage?.setItem(PROFILE_KEY, serializedProfile);
  } catch (error) {
    console.warn('Failed to save profile', error);
  }
};

export const loadUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const raw = (await canUseSecureStore())
      ? await SecureStore.getItemAsync(PROFILE_KEY)
      : browserStorage.localStorage?.getItem(PROFILE_KEY);

    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch (error) {
    console.warn('Failed to load profile', error);
    return null;
  }
};
