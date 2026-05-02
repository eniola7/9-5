import { RoadmapItem, UserPersona } from '../types';

const sharedTags: UserPersona[] = [
  'College Student',
  'Med Student',
  'Law Student',
  'MBA Student',
  'International Student',
  'Young Professional',
];

export const getRoadmapTemplate = (persona: UserPersona): RoadmapItem[] => {
  const templates: Record<string, RoadmapItem[]> = {
    college: [
      item('starter-card', 'Open starter card', 'Choose one beginner-friendly card and use it lightly.', 'A simple card can start payment history without creating too much complexity.'),
      item('autopay', 'Set up autopay', 'Put minimum payments and bills on autopay.', 'Payment history is one of the most important credit-building habits.'),
      item('utilization', 'Keep utilization under 30%', 'Use a small portion of available credit each month.', 'Lower utilization can make your credit profile look more stable.'),
      item('buffer-500', 'Build $500 emergency buffer', 'Save toward a starter cash cushion.', 'A small buffer helps prevent credit card debt during surprises.'),
      item('subscriptions', 'Track subscriptions', 'Review recurring charges and cancel what you do not use.', 'Small charges can quietly weaken your monthly cash flow.'),
    ],
    professional: [
      item('credit-before-apps', 'Build credit before applications', 'Improve readiness before housing or professional transitions.', 'Landlords and lenders may review credit before approving applications.'),
      item('loan-disbursement', 'Track loan disbursement timing', 'Map expected loan dates against rent and deposits.', 'Timing gaps can create stress even when funds are eventually available.'),
      item('relocation', 'Prepare for relocation', 'Plan deposits, travel, licensing, and moving costs.', 'Relocation can stack several expenses into one short window.'),
      item('apartment-utilization', 'Keep utilization low before apartment applications', 'Avoid large balances before applications.', 'Credit reports can reflect balances at the wrong moment.'),
      item('loan-rent-timeline', 'Organize loan and rent timeline', 'Put payment dates, rent, and loan details in one view.', 'A timeline makes high-pressure decisions easier to manage.'),
    ],
    international: [
      item('ssn-itin', 'Understand SSN/ITIN options', 'Clarify which ID path applies to your situation.', 'The right setup can unlock safer banking and credit-building options.'),
      item('starter-bank', 'Open starter bank account', 'Choose a simple account with low fees.', 'A banking base makes the rest of your financial system easier.'),
      item('secured-card', 'Start secured card path', 'Consider a secured card once you are ready.', 'Secured cards can help build a U.S. credit file when used carefully.'),
      item('credit-file', 'Build U.S. credit file', 'Use on-time payments and low balances consistently.', 'A file with steady activity can support future apartments and services.'),
      item('hard-inquiries', 'Avoid unnecessary hard inquiries', 'Apply selectively and avoid repeated denials.', 'Too many applications can slow early credit progress.'),
    ],
  };

  if (persona === 'International Student') return withTags(templates.international, [persona]);
  if (persona === 'Med Student' || persona === 'Law Student' || persona === 'MBA Student') {
    return withTags(templates.professional, [persona]);
  }
  return withTags(templates.college, persona === 'Young Professional' ? ['Young Professional'] : ['College Student']);
};

const item = (id: string, title: string, description: string, whyItMatters: string): RoadmapItem => ({
  id,
  title,
  description,
  whyItMatters,
  status: 'upcoming',
  completed: false,
  personaTags: sharedTags,
});

const withTags = (items: RoadmapItem[], tags: UserPersona[]) =>
  items.map((roadmapItem, index) => ({
    ...roadmapItem,
    personaTags: tags,
    status: index === 0 ? 'in-progress' as const : 'upcoming' as const,
  }));
