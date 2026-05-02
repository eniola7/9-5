import * as SecureStore from 'expo-secure-store';
import { UserProfile } from '../types';

const PROFILE_KEY = 'LOLO_USER_PROFILE';

export const saveUserProfile = async (profile: UserProfile) => {
  try {
    await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.warn('Failed to save profile to SecureStore', error);
  }
};

export const loadUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const raw = await SecureStore.getItemAsync(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch (error) {
    console.warn('Failed to load profile from SecureStore', error);
    return null;
  }
};
