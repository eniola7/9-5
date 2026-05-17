import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Logo } from './Logo';
import { PublicPageKey } from './PublicHeader';
import { PressableScale } from './PressableScale';

interface FooterProps {
  onNavigate: (page: PublicPageKey) => void;
  onDemo: () => void;
}

const columns: Array<{ title: string; items: Array<{ label: string; page?: PublicPageKey; demo?: boolean }> }> = [
  {
    title: 'Product',
    items: [
      { label: 'Demo', demo: true },
      { label: 'Pricing', page: 'pricing' },
      { label: 'Credit Intelligence', page: 'demo' },
      { label: 'Spending Intelligence', page: 'demo' },
      { label: 'AI Coach', page: 'demo' },
      { label: 'Journal & Community', page: 'demo' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About us', page: 'about' },
      { label: 'Careers', page: 'careers' },
      { label: 'Contact', page: 'contact' },
      { label: 'Blog', page: 'about' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Financial wellness', page: 'demo' },
      { label: 'Credit basics', page: 'presentation' },
      { label: 'Privacy & security', page: 'privacy' },
      { label: 'Help center', page: 'contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy policy', page: 'privacy' },
      { label: 'Terms of service', page: 'terms' },
      { label: 'Disclaimers', page: 'disclaimers' },
    ],
  },
];

export const Footer = ({ onNavigate, onDemo }: FooterProps) => (
  <View style={styles.footer}>
    <View style={styles.brand}>
      <Logo />
      <Text style={styles.tagline}>Quiet financial intelligence for people building a stable life.</Text>
      <Text style={styles.disclaimer}>
        LOLO is a prototype. Not financial advice. No credit score impact. Mock data only unless connected by the user.
      </Text>
    </View>
    <View style={styles.columns}>
      {columns.map((column) => (
        <View key={column.title} style={styles.column}>
          <Text style={styles.columnTitle}>{column.title}</Text>
          {column.items.map((item) => (
            <PressableScale key={item.label} onPress={() => item.demo ? onDemo() : item.page && onNavigate(item.page)} style={styles.footerLink}>
              <Text style={styles.footerLinkText}>{item.label}</Text>
            </PressableScale>
          ))}
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    borderTopColor: colors.borderSoft,
    borderTopWidth: 1,
    gap: spacing.xl,
    marginTop: spacing.xxl,
    paddingTop: spacing.xl,
  },
  brand: {
    gap: spacing.md,
  },
  tagline: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  disclaimer: {
    ...typography.small,
    color: colors.textMuted,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  column: {
    minWidth: 150,
  },
  columnTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  footerLink: {
    paddingVertical: spacing.xs,
  },
  footerLinkText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
});
