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
    value: '+18%',
    accent: '3-month drift',
    subtitle: 'Dining, rideshare, and convenience spending rose after the move and longer commute.',
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
    body: 'Your dining and convenience spending rose 18% over 3 months while savings rate slipped 9%.',
    tone: 'Watch',
  },
  {
    title: 'Future stress prediction',
    body: 'At your current pace, your savings buffer may dip below 2 months in August after travel and insurance renewals.',
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

export const journalThemes = [
  'building credit',
  'moving cities',
  'debt payoff',
  'first apartment',
  'emergency fund',
  'subscription creep',
  'commuting costs',
];

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
    title: 'Money Momentum',
    value: '742',
    change: '+18',
    why: 'Your on-time rhythm, lower balance risk, and stronger cash buffer are moving the profile in the right direction.',
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
    title: 'Keep August from feeling tight',
    body: 'Dining and rideshare are not the problem alone. The pattern is convenience spending after long workdays and longer commuting.',
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
    body: 'Money Momentum moved from 724 to 742 because bill timing improved, emergency runway held above two months, and payment history stayed clean.',
  },
  {
    title: 'Why it matters',
    body: 'Traditional credit scoring sees balances and payments. LOLO adds context: consistency, cash rhythm, pressure timing, and follow-through.',
  },
  {
    title: 'Upside preview',
    body: '+18 points possible if utilization reports near 24% and June cash flow stays above a 10% savings rate.',
  },
];

export const demoSteps = [
  {
    title: 'Create a profile',
    body: 'Start with a real-feeling young professional: income, rent, credit cards, savings, subscriptions, goals, and the pressure points that shape daily decisions.',
  },
  {
    title: 'See a financial snapshot',
    body: 'LOLO turns cash flow, credit utilization, runway, subscriptions, and spending drift into one calm snapshot.',
  },
  {
    title: 'Get one useful insight',
    body: 'Instead of a pile of charts, LOLO explains what changed, why it matters, and the one behavior signal worth attention.',
  },
  {
    title: 'Understand credit and spending risk',
    body: 'See how statement timing, utilization, subscription creep, and commuting costs can make a stable month feel tight.',
  },
  {
    title: 'Forecast future stress',
    body: 'LOLO shows when the savings buffer could dip below a safer range, before the month becomes reactive.',
  },
  {
    title: 'Reflect in the money journal',
    body: 'Save the moment: paying off a first card, moving cities, catching subscription creep, or building a 3-month emergency fund.',
  },
  {
    title: 'Take the next best action',
    body: 'LOLO Reflect turns the pattern into a specific, doable next step without shame, noise, or fake urgency.',
  },
];

export const demoMetrics = [
  { value: '3.2 mo', label: 'faster to healthier utilization' },
  { value: '42%', label: 'clearer monthly decisions' },
  { value: '5', label: 'behavior signals tracked' },
];

export const trustSignals = [
  'Read-only insights',
  'No score impact',
  'No money movement',
  'Clear data controls',
  'Prototype demo data',
  'Not financial advice',
];

export const stockScenes = [
  {
    title: 'Credit decisions in real life',
    body: 'A reminder that utilization, payments, and spending happen inside ordinary days, not dashboards.',
    imageUrl: 'https://images.pexels.com/photos/6609236/pexels-photo-6609236.jpeg?auto=compress&cs=tinysrgb&w=1200',
    credit: 'Photo via Pexels',
    sourceUrl: 'https://www.pexels.com/photo/person-holding-credit-card-and-using-a-laptop-6609236/',
  },
  {
    title: 'Moving costs are part of the story',
    body: 'Rent, deposits, commuting, furniture, and setup costs can change a month before the user has done anything wrong.',
    imageUrl: 'https://images.pexels.com/photos/4246065/pexels-photo-4246065.jpeg?auto=compress&cs=tinysrgb&w=1200',
    credit: 'Photo via Pexels',
    sourceUrl: 'https://www.pexels.com/photo/young-woman-unpacking-boxes-in-light-apartment-4246065/',
  },
  {
    title: 'Progress worth remembering',
    body: 'LOLO treats savings, payoffs, reviews, and reflections as a living financial biography.',
    imageUrl: 'https://images.pexels.com/photos/11350082/pexels-photo-11350082.jpeg?auto=compress&cs=tinysrgb&w=1200',
    credit: 'Photo via Pexels',
    sourceUrl: 'https://www.pexels.com/photo/notebook-and-envelope-with-money-11350082/',
  },
];

export const founderStory = [
  'LOLO was founded by Mubarak (Eni) Adebayo, an engineer who experienced firsthand how difficult it can be to build financial stability when your story does not fit neatly into traditional systems.',
  'After moving to the United States for college and later beginning his career as an engineer, Eni found himself navigating many of the same challenges faced by young professionals, immigrants, students, and first-generation wealth builders: establishing credit, managing cash flow, making major life decisions, and trying to understand whether he was actually making progress financially.',
  'What frustrated him most was that every financial tool seemed to focus on numbers, transactions, and optimization. Apps could tell him what he spent, but they could not tell him what it meant. They could show him a credit score, but not the story behind it. They could track a budget, but not the decisions, setbacks, and milestones that shaped his financial journey.',
  'Eni realized that financial growth is deeply personal. Behind every payment, move, promotion, debt payoff, or savings milestone is a human story. Yet no product existed to help people understand their financial lives in that way.',
  'That insight became LOLO.',
  'LOLO was built on a simple belief: financial growth should feel like a journal, not a spreadsheet.',
  'Instead of focusing solely on transactions and budgets, LOLO helps people understand what changed financially, why it matters, and what to do next. Through monthly reviews, financial reflections, and personalized insights, LOLO transforms financial data into a living story that grows alongside the user.',
  'Today, LOLO is building toward a future where financial wellness is not measured only by numbers, but by understanding, confidence, and progress over time, especially for the people building stability in systems that were never designed with their journeys in mind.',
];
