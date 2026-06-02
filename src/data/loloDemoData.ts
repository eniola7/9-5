import engineOutput from '../../lolo-engine/sample_output.json';

export type DemoUserId = keyof typeof engineOutput.trust_score_results;
export type SimulationKey = keyof (typeof engineOutput.simulation_examples)[DemoUserId];

export const loloEngineDisclaimer = engineOutput.metadata.disclaimer.replace(
  /LOLO\s+Trust\s+Score/g,
  'LOLO Money Momentum'
);

export const demoUserLabels: Record<DemoUserId, string> = {
  'immigrant-thin-file': 'Recent immigrant',
  'college-builder': 'College student',
  'early-pro-high-util': 'Early professional',
  'high-earner-drift': 'High earner',
  'responsible-low-income': 'Responsible low income',
};

export const simulationLabels: Record<SimulationKey, string> = {
  make_payment: 'Pay toward card',
  reduce_category_spending: 'Reduce dining',
  increase_income: 'Increase income',
  add_emergency_savings: 'Add emergency savings',
  missed_payment: 'Missed payment',
  new_credit_inquiry: 'New inquiry',
};

const currency = (value: number) => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}$${Math.abs(Math.round(value)).toLocaleString()}`;
};

const factorLabel = (factor: string) => factor.split('_').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');

const factorNext = (factor: string) => {
  if (factor === 'utilization_control') return 'Use the simulator to test a pre-statement payment.';
  if (factor === 'emergency_runway') return 'Move a small automatic transfer into emergency savings.';
  if (factor === 'spending_drift') return 'Pick one flexible category to calm for two weeks.';
  if (factor === 'recent_inquiries') return 'Avoid new credit applications this month.';
  if (factor === 'payment_consistency') return 'Keep autopay and reminders active.';
  return 'Preserve the habit and review it again next month.';
};

const normalizeUser = (user: (typeof engineOutput.demo_users)[number]) => {
  const id = user.id as DemoUserId;
  const score = engineOutput.trust_score_results[id];
  const dashboard = engineOutput.dashboard_ready_data.find((item) => item.user_id === id);
  const recommendations = engineOutput.recommendations[id];
  const simulations = engineOutput.simulation_examples[id];
  const firstCard = user.credit_cards[0];
  const totalBalance = user.credit_cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = user.credit_cards.reduce((sum, card) => sum + card.limit, 0);
  const utilization = totalLimit ? Math.round((totalBalance / totalLimit) * 100) : 0;
  const priorUtilization = Math.round(user.last_month.utilization * 100);
  const variableTotal = Object.values(user.variable_spending).reduce((sum, value) => sum + value, 0);
  const variableDrift = Math.round(((variableTotal - user.last_month.variable_spending) / Math.max(1, user.last_month.variable_spending)) * 100);
  const payments = user.payment_history;

  return {
    id,
    label: demoUserLabels[id],
    rawUser: user,
    score,
    dashboard,
    recommendations,
    simulations,
    cards: user.credit_cards,
    primaryCardId: firstCard?.id ?? '',
    primaryCardName: firstCard?.name ?? 'Primary card',
    trustScore: score.trust_score,
    factorBreakdown: Object.entries(score.factor_scores).map(([factor, value]) => ({
      key: factor,
      label: factorLabel(factor),
      value,
      change: score.weighted_breakdown[factor as keyof typeof score.weighted_breakdown]?.weighted_points ?? 0,
      why: `${factorLabel(factor)} contributes ${score.weighted_breakdown[factor as keyof typeof score.weighted_breakdown]?.weight ?? 0} of the demo score model.`,
      next: factorNext(factor),
    })),
    utilization,
    priorUtilization,
    cashFlow: dashboard?.monthly_cash_flow ?? 0,
    runwayMonths: dashboard?.emergency_runway_months ?? 0,
    spendingDriftPercent: dashboard?.spending_drift_percent ?? variableDrift,
    topRisk: score.top_risk,
    topStrength: score.top_strength,
    whatChanged: score.what_changed_this_month,
    upside: score.possible_upside_this_month,
    subscriptions: user.subscriptions,
    goals: user.goals,
    paymentHistory: [
      { month: 'M-5', status: payments.late_payments > 0 ? 'Recovered' : 'On time' },
      { month: 'M-4', status: 'On time' },
      { month: 'M-3', status: 'On time' },
      { month: 'M-2', status: 'On time' },
      { month: 'M-1', status: 'On time' },
      { month: 'Now', status: firstCard?.due_in_days && firstCard.due_in_days <= 10 ? 'Due soon' : 'Scheduled' },
    ],
    cashFlowLabel: currency(dashboard?.monthly_cash_flow ?? 0),
    runwayLabel: `${dashboard?.emergency_runway_months ?? 0} mo`,
    utilizationLabel: `${utilization}%`,
    incomeLabel: `$${user.monthly_income.toLocaleString()}`,
    rentLabel: `$${user.rent.toLocaleString()}`,
  };
};

export const loloDemoUsers = engineOutput.demo_users.map(normalizeUser);

export const getLoloDemoUser = (id: DemoUserId) => loloDemoUsers.find((user) => user.id === id) ?? loloDemoUsers[0];

export const defaultDemoUserId: DemoUserId = 'early-pro-high-util';

export type LoloDemoUser = ReturnType<typeof normalizeUser>;
