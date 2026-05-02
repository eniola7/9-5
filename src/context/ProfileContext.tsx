import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { loadUserProfile, saveUserProfile } from '../services/storage';

interface ProfileContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadUserProfile().then((storedProfile) => {
      if (storedProfile) {
        setProfileState(storedProfile);
      }
      setIsReady(true);
    });
  }, []);

  const setProfile = async (nextProfile: UserProfile) => {
    setProfileState(nextProfile);
    await saveUserProfile(nextProfile);
  };

  if (!isReady) {
    return null;
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};
