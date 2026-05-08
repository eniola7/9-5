import { RoadmapItem, Signal, UserProfile } from '../types';

export const generateCoachResponse = (
  userMessage: string,
  profile: UserProfile,
  roadmap: RoadmapItem[],
  signals: Signal[],
) => {
  const intent = detectIntent(userMessage);
  const nextRoadmapStep = roadmap.find((item) => !item.completed);
  const topSignal = signals[0];
  const nextStep = nextRoadmapStep?.title ?? profile.topPriorities[0];
  const caution = topSignal?.suggestedAction ?? 'Avoid taking on new financial products before the basics are stable.';

  const contextLine = `For a ${profile.persona.toLowerCase()} in the ${profile.financialStage.toLowerCase()} stage, LOLO would focus on ${profile.topPriorities[0].toLowerCase()}.`;

  const templates: Record<string, string> = {
    credit: `${contextLine} Your credit readiness score is ${profile.creditReadinessScore}/100, so the practical move is to time payments before statement close, keep utilization visible, and protect on-time payments. Next step: ${nextStep}. Caution: ${caution}`,
    rent: `${contextLine} Your rent burden is about ${profile.rentBurdenPercent}%, which matters for apartment readiness and cash flexibility. Next step: ${nextStep}. Caution: keep deposits, rent, and card balances from landing in the same week.`,
    residency: `${contextLine} Residency or professional-school transitions work best when relocation costs are planned early. Next step: ${nextStep}. Caution: do not wait until match or move deadlines to organize deposits and travel costs.`,
    international: `${contextLine} International student credit setup often depends on banking, SSN/ITIN options, and selective applications. Next step: ${nextStep}. Caution: avoid repeated hard inquiries while your credit file is thin.`,
    loans: `${contextLine} Loan balances need a timeline more than panic. Next step: ${nextStep}. Caution: track disbursement dates against rent and required payments.`,
    subscriptions: `${contextLine} Recurring charges can quietly weaken your cash buffer. Next step: ${nextStep}. Caution: canceling one unused subscription is useful only if the savings is redirected intentionally.`,
    spending: `${contextLine} Spending drift is worth naming early, not judging late. Start with the category that changed most, set a one-week cap, and check whether the change is convenience, stress, or a real new need.`,
    stress: `${contextLine} A stress forecast should look at bill timing, rent, card balances, and buffer runway together. Move one flexible expense away from the tightest week before making a bigger sacrifice.`,
    reflection: `${contextLine} A useful monthly reflection can be short: one thing that got easier, one thing that got expensive, one decision you would repeat, and one habit to protect next month.`,
    general: `${contextLine} The strongest next action is ${nextStep}. Caution: ${caution}`,
  };

  return `${templates[intent]}\n\nEducational guidance only, not financial advice.`;
};

const detectIntent = (message: string) => {
  const normalized = message.toLowerCase();
  if (/(credit|score|card|utilization)/.test(normalized)) return 'credit';
  if (/(rent|apartment|lease|housing)/.test(normalized)) return 'rent';
  if (/(med|residency|resident|match|relocation)/.test(normalized)) return 'residency';
  if (/(international|ssn|itin|visa)/.test(normalized)) return 'international';
  if (/(loan|debt|disbursement|repayment)/.test(normalized)) return 'loans';
  if (/(subscription|recurring|bills)/.test(normalized)) return 'subscriptions';
  if (/(spend|spending|dining|rideshare|drift|category)/.test(normalized)) return 'spending';
  if (/(stress|tight|forecast|runway|buffer|next month)/.test(normalized)) return 'stress';
  if (/(journal|reflection|reflect|monthly review|milestone)/.test(normalized)) return 'reflection';
  return 'general';
};

// TODO: Route messages through a guardrailed OpenAI API flow after privacy, compliance, and prompt safety review.
