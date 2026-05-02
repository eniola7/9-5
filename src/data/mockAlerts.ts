import { AlertItem } from '../types';

export const mockAlerts: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'Your utilization is trending high',
    body: 'Credit usage moved up 10% this month. Keep spending on track to protect your score.',
    severity: 'warning',
  },
  {
    id: 'alert-2',
    title: 'Rent due in 5 days',
    body: 'Add rent payment reminders so your reporting stays consistent.',
    severity: 'info',
  },
  {
    id: 'alert-3',
    title: 'Your cash buffer is shrinking',
    body: 'Saving a small amount each week will build a stronger emergency reserve.',
    severity: 'warning',
  },
];
