import { ChatMessage } from '../types';

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'message-1',
    role: 'assistant',
    text: 'Welcome to LOLO Coach! Ask me about boosting credit, planning relocation, or managing your budget.',
  },
  {
    id: 'message-2',
    role: 'assistant',
    text: 'Disclaimer: LOLO provides educational guidance, not financial advice.',
  },
];

export const samplePrompts = [
  'How can I boost my credit?',
  'Should I apply for another card?',
  'How do I prepare financially for residency?',
];

export const hardcodedResponses: Record<string, string> = {
  'How can I boost my credit?': 'Focus on on-time payments, keep your utilization below 30%, and consider rent reporting if you pay monthly housing costs.',
  'Should I apply for another card?': 'Only if you feel confident managing it. A new card can help diversification, but keep balances low and avoid too many applications at once.',
  'How do I prepare financially for residency?': 'Start by saving a dedicated relocation fund, review loan options early, and keep your credit healthy to support housing and travel expenses.',
};
