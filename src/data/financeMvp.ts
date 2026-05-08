export const operatingMetrics = [
  {
    title: 'Monthly cash flow',
    value: '+$860',
    accent: '14% saved',
    subtitle: 'Income $5,800 minus expenses $4,940 after rent, bills, and planned transfers.',
    icon: 'CF',
    important: true,
  },
  {
    title: 'Spending trend',
    value: '+8%',
    accent: 'vs last month',
    subtitle: 'Food, rideshare, and convenience purchases are carrying most of the increase.',
    icon: 'ST',
  },
  {
    title: 'Credit utilization',
    value: '38%',
    accent: '24% possible',
    subtitle: 'Paying $320 before statement close could bring reported utilization down.',
    icon: 'CU',
  },
  {
    title: 'Emergency runway',
    value: '2.7 mo',
    accent: '+0.4 mo',
    subtitle: 'Current buffer covers essential rent, utilities, food, transit, and minimum payments.',
    icon: 'ER',
  },
];

export const upcomingBills = [
  { name: 'Rent', due: 'May 1', amount: '$2,050', status: 'Autopay ready' },
  { name: 'Student loan', due: 'May 12', amount: '$184', status: 'Minimum set' },
  { name: 'Spotify', due: 'May 16', amount: '$11', status: 'Subscription' },
  { name: 'Internet', due: 'May 22', amount: '$62', status: 'Bill watch' },
];

export const creditIntelligence = {
  utilization: 38,
  afterPayment: 24,
  recommendedPayment: '$320',
  statementDate: 'May 18',
  habitScore: 82,
  insight: 'Paying $320 before your statement closes could lower utilization from 38% to 24% and strengthen your credit profile.',
  simulation: 'If you keep purchases below $240 through statement close, next month starts with a cleaner reported balance and less score volatility.',
};

export const subscriptions = [
  { name: 'Spotify', amount: '$10.99', cadence: 'Monthly', note: 'Keep' },
  { name: 'ClassPass', amount: '$59.00', cadence: 'Monthly', note: 'Review usage' },
  { name: 'iCloud+', amount: '$2.99', cadence: 'Monthly', note: 'Keep' },
  { name: 'HBO Max', amount: '$15.99', cadence: 'Monthly', note: 'Pause candidate' },
];

export const spendingInsights = [
  {
    title: 'Lifestyle drift alert',
    body: 'Your discretionary spending is up 18% over the last 3 months while savings rate is down 9%.',
    tone: 'Watch',
  },
  {
    title: 'Future stress prediction',
    body: 'If the current pace holds, your buffer dips below 2 months in late July after travel and insurance renewals.',
    tone: 'Forecast',
  },
  {
    title: 'Discretionary trend',
    body: 'Dining and rideshare are still within your comfort range, but convenience purchases are compounding quietly.',
    tone: 'Pattern',
  },
];

export const journalPosts = [
  {
    title: 'Paid off my first card',
    reflection: 'Not dramatic, just steady. I set two reminders, stopped using the card for a month, and watched the balance finally hit zero.',
    rating: '4.5',
    tags: ['debt payoff', 'building credit'],
    helpful: 128,
  },
  {
    title: 'Moved to Arlington and learned how expensive commuting really is',
    reflection: 'The rent looked manageable until Metro, parking, and late Ubers started showing up as their own category.',
    rating: '4.0',
    tags: ['moving cities', 'first apartment'],
    helpful: 93,
  },
  {
    title: 'Built my first 3-month emergency fund',
    reflection: 'It changed how I read every bill. Same life, less background noise.',
    rating: '5.0',
    tags: ['emergency fund', 'stability'],
    helpful: 211,
  },
  {
    title: 'Review: Capital One SavorOne as a starter rewards card',
    reflection: 'Good fit for groceries and dining if you pay in full. The real win was learning to treat rewards as a bonus, not permission.',
    rating: '4.0',
    tags: ['credit cards', 'starter setup'],
    helpful: 76,
  },
];

export const journalThemes = ['building credit', 'moving cities', 'debt payoff', 'first apartment', 'emergency fund'];

export const productReviews = [
  {
    title: 'Capital One SavorOne',
    category: 'Credit card',
    rating: '4.0',
    reflection: 'Strong starter rewards card if groceries and dining are your real categories, not aspirational ones.',
    tags: ['no annual fee', 'starter rewards'],
    helpful: 76,
  },
  {
    title: 'Ally Bank',
    category: 'Bank',
    rating: '4.5',
    reflection: 'A quiet high-yield savings setup that makes emergency fund progress feel visible without overcomplicating it.',
    tags: ['HYSA', 'emergency fund'],
    helpful: 142,
  },
  {
    title: '50/30/20 method',
    category: 'Budgeting method',
    rating: '3.5',
    reflection: 'Helpful as a starting map, but expensive-city rent can break the ratios before you even make a bad decision.',
    tags: ['budgeting', 'expensive cities'],
    helpful: 118,
  },
  {
    title: 'First apartment in Arlington',
    category: 'City / apartment',
    rating: '4.0',
    reflection: 'Worth it for commute and safety, but only after I priced transit, utilities, furnishing, and moving fees together.',
    tags: ['first apartment', 'moving cities'],
    helpful: 89,
  },
  {
    title: 'Buying a used car at 24',
    category: 'Car decision',
    rating: '3.0',
    reflection: 'Freedom was real. So were insurance, parking, maintenance, and the way one repair can eat a whole month of savings.',
    tags: ['car ownership', 'cash flow'],
    helpful: 64,
  },
];

export const roadmapItems = [
  'Plaid integration',
  'Credit bureau integration',
  'AI financial coach',
  'Anonymous community posts',
  'Subscription cancellation workflows',
  'Personalized credit action plans',
  'Financial stress forecasting',
  'Mobile app version',
];

export const trustPillars = [
  {
    title: 'Trust Score',
    value: '742',
    change: '+18',
    why: 'Your on-time rhythm, lower balance risk, and stronger cash buffer are moving the profile up.',
    next: 'Protect the next statement close window.',
  },
  {
    title: 'Credit Health',
    value: '82',
    change: '+6',
    why: 'Utilization is the main drag. Payment history and age of accounts are stable.',
    next: 'Pay $320 before May 18.',
  },
  {
    title: 'Cash Flow',
    value: '+$860',
    change: '+$140',
    why: 'Income is steady and fixed bills are predictable. Convenience spend is the variable.',
    next: 'Set a $160 weekly flex cap.',
  },
  {
    title: 'Stress Forecast',
    value: '2.7 mo',
    change: '-0.2',
    why: 'July travel and insurance renewal are the next pressure points.',
    next: 'Move $240 into the buffer before June 1.',
  },
  {
    title: 'Next Best Action',
    value: '$320',
    change: 'May 18',
    why: 'This is the highest leverage move for reported utilization this month.',
    next: 'Schedule the payment today.',
  },
];

export const spendingDriftSeries = [42, 48, 51, 57, 66, 74];
export const cashFlowSeries = [62, 58, 71, 65, 78, 83];
export const creditGrowthSeries = [24, 30, 38, 45, 55, 63, 72, 80];

export const creditFactors = {
  helping: [
    '100% on-time payment history across active accounts',
    'No new hard inquiries in the last 90 days',
    'Emergency runway above two months',
  ],
  hurting: [
    'Reported utilization is still above the calm zone',
    'One card carries most of the balance',
    'Statement close date lands near rent week',
  ],
};

export const paymentHistory = [
  { month: 'Dec', status: 'On time' },
  { month: 'Jan', status: 'On time' },
  { month: 'Feb', status: 'On time' },
  { month: 'Mar', status: 'On time' },
  { month: 'Apr', status: 'On time' },
  { month: 'May', status: 'Scheduled' },
];

export const aiRecommendations = [
  {
    title: 'Lower reported utilization',
    body: 'A $320 payment before May 18 could move utilization from 38% to 24% without changing your monthly budget.',
    action: 'Schedule payment',
  },
  {
    title: 'Keep June from feeling tight',
    body: 'Dining and rideshare are not the problem alone. The pattern is convenience spending after long workdays.',
    action: 'Set flex cap',
  },
  {
    title: 'Turn progress into memory',
    body: 'Save a May review while the details are fresh: one win, one pressure point, and one habit to protect.',
    action: 'Write review',
  },
];

export const monthlyReviews = [
  {
    month: 'May',
    title: 'Stable, with one watch area',
    body: 'Credit timing improved. Spending drift is mostly convenience, not lifestyle inflation.',
    score: '8.2',
  },
  {
    month: 'April',
    title: 'First clean autopay month',
    body: 'All bills cleared without moving money twice. The system finally felt boring in a good way.',
    score: '8.7',
  },
];

export const scoreBreakdown = [
  {
    label: 'Payment consistency',
    value: 96,
    change: '+4',
    why: 'All tracked obligations cleared on time for six consecutive months.',
    next: 'Keep autopay and one manual reminder active.',
  },
  {
    label: 'Utilization control',
    value: 64,
    change: '+18 possible',
    why: 'The profile is healthy, but reported utilization is still the largest drag.',
    next: 'Pay $320 before statement close.',
  },
  {
    label: 'Cash flow stability',
    value: 78,
    change: '+6',
    why: 'Cleaner bill timing improved the month, even with higher discretionary spend.',
    next: 'Protect the $860 surplus.',
  },
  {
    label: 'Debt pressure',
    value: 71,
    change: '-2',
    why: 'Student loan and card minimums are manageable, but they cluster near rent week.',
    next: 'Move one payment away from rent week.',
  },
  {
    label: 'Financial behavior trend',
    value: 83,
    change: '+5',
    why: 'The last three months show more consistent planning and fewer reactive transfers.',
    next: 'Write a monthly review while the pattern is fresh.',
  },
];

export const scoreMovers = [
  {
    title: 'What changed',
    body: 'Trust Score moved from 724 to 742 because bill timing improved, emergency runway held above two months, and payment history stayed clean.',
  },
  {
    title: 'Why it matters',
    body: 'Traditional credit scoring sees balances and payments. LOLO adds behavioral context: consistency, cash rhythm, pressure timing, and follow-through.',
  },
  {
    title: 'Upside preview',
    body: '+18 points possible if utilization reports near 24% and June cash flow stays above a 10% savings rate.',
  },
];

export const demoSteps = [
  {
    title: 'Meet a demo user',
    body: 'Start with a real-feeling profile from the Python engine: income, rent, cards, savings, subscriptions, goals, and pressure points.',
  },
  {
    title: 'See their LOLO Trust Score',
    body: 'One educational trust signal summarizes payment consistency, utilization control, cash flow, runway, and spending behavior.',
  },
  {
    title: 'Understand what changed this month',
    body: 'LOLO explains the movement: what changed, why it matters, and which behavior signal deserves attention.',
  },
  {
    title: 'Simulate one action',
    body: 'Tap an engine-generated scenario like paying a card, reducing dining, or adding emergency savings.',
  },
  {
    title: 'See the score improve',
    body: 'The prepared simulation output shows the score delta, changed factors, and a plain-English explanation.',
  },
  {
    title: 'Receive an AI next-best-action',
    body: 'LOLO Coach turns behavior into a specific action. This is the trust layer traditional credit misses.',
  },
];

export const demoMetrics = [
  { value: '3.2 mo', label: 'faster to healthier utilization' },
  { value: '42%', label: 'clearer monthly decisions' },
  { value: '5', label: 'trust signals tracked' },
];
