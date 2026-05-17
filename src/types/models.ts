export type IncomeRhythm = 'weekly' | 'biweekly' | 'monthly' | 'irregular';
export type CreditStage = 'thin-file' | 'building' | 'rebuilding' | 'established' | 'excellent';
export type StressLevel = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  authProvider: 'placeholder' | 'google' | 'email';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileModel {
  userId: string;
  auth0UserId?: string;
  email?: string;
  name?: string;
  preferredName: string;
  avatarUrl?: string;
  city: string;
  incomeRhythm: IncomeRhythm;
  topMoneyGoal: string;
  creditStage: CreditStage;
  financialStressLevel: StressLevel;
  primaryReason: string;
  primaryReasonForUsingLolo?: string;
  avatarInitials?: string;
  badges: string[];
  privacySettings: {
    demoMode: boolean;
    allowInsights: boolean;
    allowPartnerSharing: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  reflection: string;
  tags: string[];
  visibility: 'private' | 'anonymous-community';
  createdAt: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  productType: 'credit-card' | 'bank' | 'budgeting-method' | 'city' | 'apartment' | 'car-decision';
  title: string;
  rating: number;
  reflection: string;
  tags: string[];
  createdAt: string;
}

export interface FinancialSnapshot {
  id: string;
  userId: string;
  trustScore: number;
  monthlyIncome?: number;
  rent?: number;
  utilizationPercent?: number;
  emergencyRunwayMonths?: number;
  topRisk?: string;
  topStrength?: string;
  createdAt: string;
}

export interface UserPreference {
  id: string;
  userId: string;
  emailNotifications: boolean;
  productUpdates: boolean;
  allowAnonymousCommunity: boolean;
  allowPartnerSharing: boolean;
  createdAt: string;
  updatedAt: string;
}
