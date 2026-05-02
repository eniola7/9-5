import { UserProfile } from '../types';

export const mockProfiles: UserProfile[] = [
  {
    id: 'profile-college',
    name: 'Ava',
    role: 'College Student',
    balance: '$3,480',
    creditScore: 712,
    utilization: 24,
    monthlyBudget: '$2,100',
    nextStep: 'Set up rent reporting',
  },
  {
    id: 'profile-med',
    name: 'Mia',
    role: 'Med Student',
    balance: '$5,120',
    creditScore: 725,
    utilization: 18,
    monthlyBudget: '$2,800',
    nextStep: 'Review residency readiness',
  },
  {
    id: 'profile-intl',
    name: 'Noah',
    role: 'International Student',
    balance: '$2,760',
    creditScore: 695,
    utilization: 29,
    monthlyBudget: '$1,900',
    nextStep: 'Build emergency fund',
  },
];
