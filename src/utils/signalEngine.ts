import { RoadmapItem, Signal, UserProfile } from '../types';

export const generateSignals = (profile: UserProfile, roadmap: RoadmapItem[]): Signal[] => {
  const signals: Signal[] = [];
  const incomplete = roadmap.filter((item) => !item.completed);

  if (profile.creditReadinessScore < 68) {
    signals.push(signal('utilization-high', 'credit', 'Credit readiness needs attention', profile.riskLevel, 'A lower readiness score can make apartment or card approvals feel less predictable.', 'Keep balances low and complete your next credit roadmap step.', 'View credit tips'));
  }
  if (profile.rentBurdenPercent > 35) {
    signals.push(signal('rent-burden', 'rent', 'Rent burden is elevated', 'Medium', 'Rent above general student benchmarks can reduce cash flexibility.', 'Build a rent calendar and protect your cash buffer.', 'Plan rent'));
  }
  if (profile.cashBufferMonths < 1) {
    signals.push(signal('cash-buffer', 'cash', 'Cash buffer is thin', 'High', 'A small buffer can push surprise costs onto credit cards.', 'Set a starter buffer target and automate a small transfer.', 'Build buffer'));
  }
  if (profile.persona === 'Med Student' || profile.persona === 'Law Student' || profile.persona === 'MBA Student') {
    signals.push(signal('relocation-window', 'residency', 'Move window approaching', 'Medium', 'Professional school transitions can combine deposits, travel, and loan timing.', 'Start a relocation checklist before deadlines cluster.', 'Open checklist'));
  }
  if (profile.persona === 'International Student' && !profile.answers.hasSsnOrItin) {
    signals.push(signal('thin-file', 'international', 'Credit setup incomplete', 'High', 'International students may need ID and banking setup before credit-building options open.', 'Clarify SSN/ITIN path and avoid unnecessary applications.', 'Review setup'));
  }
  if (profile.answers.studentLoanAmount > 60000) {
    signals.push(signal('loan-timing', 'loans', 'Loan timeline needs structure', 'Medium', 'Large student loan balances can be manageable, but timing and documentation matter.', 'Put disbursement, rent, and payment dates in one timeline.', 'Organize loans'));
  }
  if (incomplete.length > 3) {
    signals.push(signal('roadmap-focus', 'subscriptions', 'Too many open tasks', 'Low', 'A crowded money plan can make the next step feel unclear.', `Focus on "${incomplete[0].title}" before adding more tasks.`, 'Focus roadmap'));
  }

  return signals.slice(0, 5);
};

const signal = (
  id: string,
  type: Signal['type'],
  title: string,
  riskLevel: Signal['riskLevel'],
  whyItMatters: string,
  suggestedAction: string,
  ctaLabel: string,
): Signal => ({
  id,
  type,
  title,
  riskLevel,
  whyItMatters,
  suggestedAction,
  ctaLabel,
});
