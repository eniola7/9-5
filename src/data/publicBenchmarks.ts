import { BenchmarkData } from '../types';

export const publicBenchmarks: BenchmarkData[] = [
  {
    id: 'rent-burden',
    label: 'Average student rent burden',
    value: '30-45% of monthly income',
    appliesTo: ['College Student', 'Med Student', 'Law Student', 'MBA Student', 'International Student', 'Young Professional'],
    insight: 'Students and early professionals often feel pressure when rent rises above one third of monthly cash flow.',
  },
  {
    id: 'credit-timeline',
    label: 'Typical credit-building timeline',
    value: '6-12 months',
    appliesTo: ['College Student', 'International Student', 'Young Professional'],
    insight: 'A thin or new credit file usually needs several months of on-time payments and low utilization before it feels stable.',
  },
  {
    id: 'residency-window',
    label: 'Med student relocation risk window',
    value: '6-9 months before move',
    appliesTo: ['Med Student'],
    insight: 'Residency planning often compresses housing, travel, deposits, and loan timing into a short decision window.',
  },
  {
    id: 'international-file',
    label: 'International student credit file challenges',
    value: 'SSN/ITIN and starter account setup',
    appliesTo: ['International Student'],
    insight: 'International students may need extra setup steps before standard credit-building products are available.',
  },
  {
    id: 'professional-delay',
    label: 'Professional student delayed-income pattern',
    value: 'High future income, low current flexibility',
    appliesTo: ['Med Student', 'Law Student', 'MBA Student'],
    insight: 'Professional students often have strong future earnings but need careful cash planning before income starts.',
  },
];
