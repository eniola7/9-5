export type UserProfileType =
  | 'College Student'
  | 'Med Student'
  | 'International Student'
  | 'Young Professional';

export interface UserProfile {
  id: string;
  name: string;
  role: UserProfileType;
  balance: string;
  creditScore: number;
  utilization: number;
  monthlyBudget: string;
  nextStep: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface AlertItem {
  id: string;
  title: string;
  body: string;
  severity: 'warning' | 'info';
}

export interface SubscriptionTier {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}
