import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicHeader, PublicPageKey } from '../components/PublicHeader';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';

interface StaticPageScreenProps {
  page: PublicPageKey;
  onNavigate: (page: PublicPageKey) => void;
  onDemo: () => void;
}

const pageContent: Record<string, { title: string; subtitle: string; sections: Array<{ title: string; body: string }> }> = {
  about: {
    title: 'About LOLO',
    subtitle: 'Financial clarity, trust, and intentional money habits for people building stability.',
    sections: [
      { title: 'Mission', body: 'LOLO helps people understand and communicate financial reliability before traditional systems fully see them.' },
      { title: 'Belief', body: 'Credit scores matter, but behavior, context, and progress matter too.' },
    ],
  },
  careers: {
    title: 'Careers',
    subtitle: 'LOLO is early and looking for builders interested in fintech, consumer product, AI, behavioral design, and financial wellness.',
    sections: [
      { title: 'Current stage', body: 'We are not posting formal roles yet. We are interested in meeting thoughtful product, engineering, design, and financial infrastructure collaborators.' },
    ],
  },
  demo: {
    title: 'Product Demo',
    subtitle: 'Explore the dashboard, credit profile, AI Coach, financial insights, and journal/community layer.',
    sections: [
      { title: 'Dashboard', body: 'Trust Score, cash flow, utilization, stress forecast, and next-best action.' },
      { title: 'Credit Profile', body: 'Utilization simulator, payment history, score factors, and action plan.' },
      { title: 'AI Coach', body: 'Suggested prompts and responses based on selected demo-user data.' },
      { title: 'Journal', body: 'Private monthly reviews and reflection cards for financial milestones.' },
    ],
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Prototype pricing placeholders for future packaging.',
    sections: [
      { title: 'Free', body: 'Trust profile, demo dashboard, journal, and basic educational insights.' },
      { title: 'Pro', body: 'Future advanced simulations, coaching, deeper alerts, and personalized action plans.' },
      { title: 'Employer / community plan', body: 'Future offering for schools, community organizations, employers, or financial wellness partners.' },
    ],
  },
  contact: {
    title: 'Contact',
    subtitle: 'For user interviews, advisor feedback, or partnership conversations.',
    sections: [
      { title: 'Founder outreach', body: 'Use the repository contact path or GitHub profile for now. A dedicated support channel can be added before beta.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Prototype privacy summary.',
    sections: [
      { title: 'Current prototype', body: 'LOLO uses demo data only and does not store real financial data in this prototype.' },
      { title: 'Future integrations', body: 'Bank, payroll, credit, and partner data should require explicit user consent and clear data-use explanations.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Prototype terms summary.',
    sections: [
      { title: 'Educational use', body: 'This prototype is for demonstration and product exploration only.' },
      { title: 'No financial advice', body: 'LOLO does not provide financial, legal, credit, or lending advice in this prototype.' },
    ],
  },
  disclaimers: {
    title: 'Disclaimers',
    subtitle: 'Clear boundaries for the demo experience.',
    sections: [
      { title: 'Trust Score', body: 'LOLO Trust Score is educational and is not a FICO score, VantageScore, credit bureau score, underwriting model, or lending decision.' },
      { title: 'Mock data', body: 'All data is fictional unless a future user explicitly connects accounts through secure integrations.' },
    ],
  },
};

export const StaticPageScreen = ({ page, onNavigate, onDemo }: StaticPageScreenProps) => {
  const content = pageContent[page] ?? pageContent.about;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <PublicHeader active={page} onNavigate={onNavigate} onDemo={onDemo} />
      <Card glow style={styles.hero}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>
        {page === 'demo' ? <PrimaryButton label="Launch 60-second demo" onPress={onDemo} style={styles.cta} /> : null}
      </Card>
      <View style={styles.sections}>
        {content.sections.map((section) => (
          <Card key={section.title}>
            <SectionHeader title={section.title} />
            <Text style={styles.body}>{section.body}</Text>
          </Card>
        ))}
      </View>
      <Footer onNavigate={onNavigate} onDemo={onDemo} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  hero: {
    backgroundColor: colors.card,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 48,
  },
  subtitle: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 26,
    marginTop: spacing.md,
  },
  cta: {
    marginTop: spacing.xl,
  },
  sections: {
    gap: spacing.lg,
  },
  body: {
    ...typography.body,
  },
});
