import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BrandHeader } from '../components/BrandHeader';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, radii, spacing, typography } from '../theme';
import { CreditScoreRange, MainGoal, OnboardingAnswers, UserPersona } from '../types';

const personas: UserPersona[] = ['College Student', 'Med Student', 'Law Student', 'MBA Student', 'International Student', 'Young Professional'];
const creditRanges: CreditScoreRange[] = ['No score yet', 'Below 580', '580-669', '670-739', '740+'];
const goals: MainGoal[] = ['Build credit', 'Get apartment', 'Prepare for residency', 'Reduce stress', 'Organize money'];

interface OnboardingScreenProps {
  onComplete: (answers: OnboardingAnswers) => Promise<void>;
}

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [name, setName] = useState('Ava');
  const [persona, setPersona] = useState<UserPersona>('College Student');
  const [creditScoreRange, setCreditScoreRange] = useState<CreditScoreRange>('670-739');
  const [monthlyIncome, setMonthlyIncome] = useState('2400');
  const [monthlyRent, setMonthlyRent] = useState('950');
  const [studentLoanAmount, setStudentLoanAmount] = useState('12000');
  const [hasCreditCard, setHasCreditCard] = useState(true);
  const [hasSsnOrItin, setHasSsnOrItin] = useState(true);
  const [mainGoal, setMainGoal] = useState<MainGoal>('Build credit');

  const submit = () => onComplete({
    name,
    persona,
    creditScoreRange,
    monthlyIncome: Number(monthlyIncome) || 0,
    monthlyRent: Number(monthlyRent) || 0,
    studentLoanAmount: Number(studentLoanAmount) || 0,
    hasCreditCard,
    hasSsnOrItin,
    mainGoal,
  });

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <BrandHeader title="LOLO" subtitle="Build your financial profile in demo mode." />
        <Card glow>
          <Text style={typography.eyebrow}>Clarity Profile</Text>
          <Text style={styles.heroTitle}>Build a financial picture that actually feels like your life.</Text>
          <Text style={styles.copy}>LOLO uses mock benchmark data in this demo. In production, this would become a read-only clarity layer around credit, cash flow, spending pressure, and follow-through.</Text>
        </Card>

        <Card>
          <Text style={styles.label}>Your name</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={colors.textMuted} style={styles.input} />

          <Text style={styles.label}>Persona</Text>
          <ChoiceGrid options={personas} selected={persona} onSelect={setPersona} />

          <Text style={styles.label}>Current credit score range</Text>
          <ChoiceGrid options={creditRanges} selected={creditScoreRange} onSelect={setCreditScoreRange} />

          <View style={styles.twoColumn}>
            <Field label="Monthly income or stipend" value={monthlyIncome} onChangeText={setMonthlyIncome} />
            <Field label="Monthly rent" value={monthlyRent} onChangeText={setMonthlyRent} />
          </View>
          <Field label="Student loan amount" value={studentLoanAmount} onChangeText={setStudentLoanAmount} />

          <Text style={styles.label}>Has a credit card?</Text>
          <BooleanChoice value={hasCreditCard} onChange={setHasCreditCard} />

          <Text style={styles.label}>Has SSN/ITIN?</Text>
          <BooleanChoice value={hasSsnOrItin} onChange={setHasSsnOrItin} />

          <Text style={styles.label}>Main goal</Text>
          <ChoiceGrid options={goals} selected={mainGoal} onSelect={setMainGoal} />

          <PrimaryButton label="Generate LOLO Profile" onPress={submit} style={styles.submit} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Field = ({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} keyboardType="numeric" placeholder="0" placeholderTextColor={colors.textMuted} style={styles.input} />
  </View>
);

const ChoiceGrid = <T extends string>({ options, selected, onSelect }: { options: T[]; selected: T; onSelect: (option: T) => void }) => (
  <View style={styles.choiceGrid}>
    {options.map((option) => (
      <Pressable key={option} style={[styles.choice, selected === option && styles.choiceActive]} onPress={() => onSelect(option)}>
        <Text style={[styles.choiceText, selected === option && styles.choiceTextActive]}>{option}</Text>
      </Pressable>
    ))}
  </View>
);

const BooleanChoice = ({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) => (
  <View style={styles.choiceGrid}>
    {[true, false].map((option) => (
      <Pressable key={String(option)} style={[styles.choice, value === option && styles.choiceActive]} onPress={() => onChange(option)}>
        <Text style={[styles.choiceText, value === option && styles.choiceTextActive]}>{option ? 'Yes' : 'No'}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    marginTop: spacing.sm,
    lineHeight: 36,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderWidth: 1,
    borderRadius: radii.md,
    color: colors.textPrimary,
    padding: spacing.md,
    fontWeight: '700',
  },
  field: {
    flex: 1,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choice: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  choiceActive: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.primary,
  },
  choiceText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  choiceTextActive: {
    color: colors.accent,
  },
  submit: {
    marginTop: spacing.xl,
  },
});
