import { OnboardingAnswers, RiskLevel, SubscriptionPlan, UserProfile } from '../types';

const creditRangeScore: Record<OnboardingAnswers['creditScoreRange'], number> = {
  'No score yet': 42,
  'Below 580': 45,
  '580-669': 58,
  '670-739': 74,
  '740+': 88,
};

export const createFinancialProfile = (answers: OnboardingAnswers): UserProfile => {
  const rentBurdenPercent = answers.monthlyIncome > 0
    ? Math.round((answers.monthlyRent / answers.monthlyIncome) * 100)
    : 0;
  const loanPressure = Math.min(25, Math.round(answers.studentLoanAmount / 4000));
  const creditReadinessScore = clamp(
    creditRangeScore[answers.creditScoreRange] +
      (answers.hasCreditCard ? 8 : -6) +
      (answers.hasSsnOrItin ? 5 : -8) -
      Math.max(0, rentBurdenPercent - 35),
  );
  const cashBufferMonths = answers.monthlyIncome > 0
    ? Number(Math.max(0.2, (answers.monthlyIncome - answers.monthlyRent) / Math.max(1, answers.monthlyRent + 650)).toFixed(1))
    : 0.3;
  const financialReadinessScore = clamp(creditReadinessScore + Math.round(cashBufferMonths * 8) - loanPressure);
  const riskLevel: RiskLevel = financialReadinessScore >= 72 ? 'Low' : financialReadinessScore >= 52 ? 'Medium' : 'High';
  const recommendedTrack: SubscriptionPlan = getRecommendedTrack(answers, riskLevel);
  const topPriorities = getPriorities(answers, rentBurdenPercent);

  return {
    id: `profile-${Date.now()}`,
    name: answers.name.trim() || 'LOLO Member',
    persona: answers.persona,
    answers,
    financialStage: getFinancialStage(answers),
    creditReadinessScore,
    financialReadinessScore,
    confidenceScore: clamp(Math.round((creditReadinessScore + financialReadinessScore) / 2)),
    riskLevel,
    topPriorities,
    recommendedTrack,
    summary: buildSummary(answers, topPriorities, riskLevel),
    cashBufferMonths,
    rentBurdenPercent,
    createdAt: new Date().toISOString(),
  };
};

const getRecommendedTrack = (answers: OnboardingAnswers, riskLevel: RiskLevel): SubscriptionPlan => {
  if (answers.persona === 'Med Student' || answers.persona === 'Law Student' || answers.persona === 'MBA Student') return 'Pro';
  if (answers.persona === 'International Student' || riskLevel === 'High') return 'Plus';
  return 'Free';
};

const getPriorities = (answers: OnboardingAnswers, rentBurdenPercent: number) => {
  const priorities: string[] = [];
  if (!answers.hasCreditCard) priorities.push('Start a credit-building path');
  if (!answers.hasSsnOrItin) priorities.push('Clarify SSN/ITIN options');
  if (rentBurdenPercent > 35) priorities.push('Lower rent burden pressure');
  if (answers.studentLoanAmount > 50000) priorities.push('Organize loan timing');
  if (answers.mainGoal === 'Prepare for residency') priorities.push('Prepare relocation cash flow');
  if (answers.mainGoal === 'Get apartment') priorities.push('Strengthen apartment readiness');
  priorities.push('Keep payments predictable');
  priorities.push('Build a cash buffer');
  return Array.from(new Set(priorities)).slice(0, 3);
};

const getFinancialStage = (answers: OnboardingAnswers) => {
  if (answers.persona === 'International Student') return 'U.S. credit foundation';
  if (answers.persona === 'Med Student') return 'Professional school and residency prep';
  if (answers.persona === 'Law Student' || answers.persona === 'MBA Student') return 'Professional school cash-flow planning';
  if (answers.persona === 'Young Professional') return 'Early career optimization';
  return 'Student credit foundation';
};

const buildSummary = (answers: OnboardingAnswers, priorities: string[], riskLevel: RiskLevel) =>
  `Based on your inputs and general student financial benchmarks, LOLO sees you as a ${answers.persona.toLowerCase()} with ${riskLevel.toLowerCase()} planning risk. Your strongest next move is to ${priorities[0].toLowerCase()} while keeping the rest of your money system simple and predictable.`;

const clamp = (value: number) => Math.max(0, Math.min(100, value));
