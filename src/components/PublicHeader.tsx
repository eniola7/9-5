import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../theme';
import { Logo } from './Logo';
import { PressableScale } from './PressableScale';

export type PublicPageKey = 'landing' | 'presentation' | 'about' | 'careers' | 'demo' | 'pricing' | 'contact' | 'privacy' | 'terms' | 'disclaimers' | 'login' | 'signup' | 'forgot';

interface PublicHeaderProps {
  active?: PublicPageKey;
  onNavigate: (page: PublicPageKey) => void;
  onDemo: () => void;
}

const links: Array<{ label: string; page: PublicPageKey }> = [
  { label: 'Product', page: 'landing' },
  { label: 'How it works', page: 'presentation' },
  { label: 'Resources', page: 'demo' },
  { label: 'Company', page: 'about' },
  { label: 'Pricing', page: 'pricing' },
];

export const PublicHeader = ({ active, onNavigate, onDemo }: PublicHeaderProps) => (
  <View style={styles.header}>
    <PressableScale onPress={() => onNavigate('landing')}>
      <Logo />
    </PressableScale>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.links}>
      {links.map((link) => (
        <PressableScale key={link.page} onPress={() => onNavigate(link.page)} style={[styles.link, active === link.page && styles.linkActive]}>
          <Text style={[styles.linkText, active === link.page && styles.linkTextActive]}>{link.label}</Text>
        </PressableScale>
      ))}
      <PressableScale onPress={onDemo} style={styles.link}>
        <Text style={styles.linkText}>Demo</Text>
      </PressableScale>
      <PressableScale onPress={() => onNavigate('login')} style={styles.link}>
        <Text style={styles.linkText}>Sign in</Text>
      </PressableScale>
      <PressableScale onPress={() => onNavigate('signup')} style={styles.cta}>
        <Text style={styles.ctaText}>Get started</Text>
      </PressableScale>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  links: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.md,
  },
  link: {
    borderColor: 'transparent',
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  linkActive: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  linkTextActive: {
    color: colors.textPrimary,
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ctaText: {
    color: colors.surfaceLight,
    fontSize: 12,
    fontWeight: '900',
  },
});
