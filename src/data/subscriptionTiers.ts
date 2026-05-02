import { SubscriptionTier } from '../types';

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'Free',
    name: 'Free',
    priceLabel: '$0',
    description: 'A polished starter path for credit and money organization.',
    features: ['Personalized profile', 'Basic roadmap', 'Core LOLO Signals'],
  },
  {
    id: 'Plus',
    name: 'Plus',
    priceLabel: '$9/month',
    description: 'More structure for users actively building credit or preparing for housing.',
    features: ['Advanced roadmap reminders', 'Subscription review', 'Expanded coach context'],
  },
  {
    id: 'Pro',
    name: 'Pro',
    priceLabel: '$19/month',
    description: 'Built for professional school, relocation, and higher-stakes planning.',
    features: [
      'Residency housing preparation',
      'Loan organization',
      'Relocation readiness',
      'Credit optimization timeline',
      'Priority AI coach',
      'Advanced LOLO Signals',
    ],
    highlight: true,
  },
];
