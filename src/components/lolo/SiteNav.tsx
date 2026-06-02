import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PublicPageKey } from '../PublicHeader';
import { PressableScale } from '../PressableScale';
import { colors, radii, spacing } from '../../theme';

interface SiteNavProps {
  active?: PublicPageKey | 'product' | 'review' | 'roadmap';
  onNavigate: (page: PublicPageKey) => void;
  onDemo: () => void;
  onWaitlist?: () => void;
}

const links: Array<{ label: string; page: PublicPageKey }> = [
  { label: 'Home', page: 'landing' },
  { label: 'Product', page: 'demo' },
  { label: 'Review', page: 'presentation' },
  { label: 'Founder', page: 'about' },
];

export const SiteNav = ({ active, onNavigate, onDemo, onWaitlist }: SiteNavProps) => (
  <View style={styles.nav}>
    <PressableScale onPress={() => onNavigate('landing')} style={styles.brand}>
      <View style={styles.mark}>
        <Text style={styles.markText}>L</Text>
      </View>
      <Text style={styles.wordmark}>LOLO</Text>
    </PressableScale>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.links}>
      {links.map((link) => (
        <PressableScale key={link.page} onPress={() => onNavigate(link.page)} style={styles.link}>
          <Text style={[styles.linkText, active === link.page && styles.linkTextActive]}>{link.label}</Text>
        </PressableScale>
      ))}
      <PressableScale onPress={onDemo} style={styles.link}>
        <Text style={styles.linkText}>Demo</Text>
      </PressableScale>
      <PressableScale onPress={onWaitlist ?? (() => onNavigate('signup'))} style={styles.cta}>
        <Text style={styles.ctaText}>Join waitlist {'->'}</Text>
      </PressableScale>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  nav: {
    alignItems: 'center',
    backgroundColor: 'rgba(250, 251, 246, 0.82)',
    borderBottomColor: colors.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginHorizontal: -spacing.xl,
    marginTop: -spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  markText: {
    color: colors.primaryForeground,
    fontFamily: 'Georgia',
    fontSize: 18,
  },
  wordmark: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 22,
  },
  links: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingLeft: spacing.md,
  },
  link: {
    paddingVertical: spacing.sm,
  },
  linkText: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '600',
  },
  linkTextActive: {
    color: colors.ink,
  },
  cta: {
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  ctaText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: '700',
  },
});
