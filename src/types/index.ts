export type UserPersona =
  | 'College Student'
  | 'Med Student'
  | 'Law Student'
  | 'MBA Student'
  | 'International Student'
  | 'Young Professional';

export type CreditScoreRange = 'No score yet' | 'Below 580' | '580-669' | '670-739' | '740+';
export type MainGoal =
  | 'Build credit'
  | 'Get apartment'
  | 'Prepare for residency'
  | 'Reduce stress'
  | 'Organize money';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type SubscriptionPlan = 'Free' | 'Plus' | 'Pro';
export type RoadmapStatus = 'completed' | 'in-progress' | 'upcoming';
export type SignalType = 'credit' | 'rent' | 'cash' | 'subscriptions' | 'residency' | 'international' | 'loans';

export interface OnboardingAnswers {
  name: string;
  persona: UserPersona;
  creditScoreRange: CreditScoreRange;
  monthlyIncome: number;
  monthlyRent: number;
  studentLoanAmount: number;
  hasCreditCard: boolean;
  hasSsnOrItin: boolean;
  mainGoal: MainGoal;
}

export interface UserProfile {
  id: string;
  name: string;
  persona: UserPersona;
  answers: OnboardingAnswers;
  financialStage: string;
  creditReadinessScore: number;
  financialReadinessScore: number;
  confidenceScore: number;
  riskLevel: RiskLevel;
  topPriorities: string[];
  recommendedTrack: SubscriptionPlan;
  summary: string;
  cashBufferMonths: number;
  rentBurdenPercent: number;
  createdAt: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  status: RoadmapStatus;
  completed: boolean;
  personaTags: UserPersona[];
}

export interface Signal {
  id: string;
  type: SignalType;
  title: string;
  riskLevel: RiskLevel;
  whyItMatters: string;
  suggestedAction: string;
  ctaLabel: string;
}

export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export type ChatMessage = CoachMessage;

export interface BenchmarkData {
  id: string;
  label: string;
  value: string;
  appliesTo: UserPersona[];
  insight: string;
}

export interface SubscriptionTier {
  id: SubscriptionPlan;
  name: SubscriptionPlan;
  priceLabel: string;
  description: string;
  features: string[];
  highlight?: boolean;
}
