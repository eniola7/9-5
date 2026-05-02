import { SubscriptionTier } from '../types';

export const mockSubscriptions: SubscriptionTier[] = [
  {
    id: 'tier-free',
    name: 'Free',
    priceLabel: '$0/month',
    description: 'Basic roadmap access and tailored risk signals.',
    features: ['Starter credit insights', 'Spending overview', 'Basic roadmap'],
  },
  {
    id: 'tier-plus',
    name: 'Plus',
    priceLabel: '$9/month',
    description: 'Extra guidance for growing credit and savings.',
    features: ['Rent report coaching', 'Custom action reminders', 'Score boost tips'],
  },
  {
    id: 'tier-pro',
    name: 'Pro',
    priceLabel: '$19/month',
    description: 'Designed for med and professional students preparing for residency or relocation.',
    features: ['Residency housing guides', 'Loan organizer', 'Relocation readiness', 'Pro roadmap'],
    highlight: true,
  },
];
