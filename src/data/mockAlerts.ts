import { Signal } from '../types';

export const mockAlerts: Signal[] = [
  {
    id: 'demo-signal',
    type: 'credit',
    title: 'Credit readiness needs attention',
    riskLevel: 'Medium',
    whyItMatters: 'This is a static sample signal used by legacy imports in the demo.',
    suggestedAction: 'Open the LOLO Signals tab for generated signals.',
    ctaLabel: 'View signals',
  },
];
