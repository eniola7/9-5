import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { Logo } from '../components/Logo';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, radii, spacing, typography } from '../theme';
import { CreditStage, IncomeRhythm, StressLevel, UserProfileModel } from '../types/models';

interface CreateProfileScreenProps {
  userId: string;
  email?: string;
  name: string;
  onComplete: (profile: UserProfileModel) => void;
}

export const CreateProfileScreen = ({ userId, email, name, onComplete }: CreateProfileScreenProps) => {
  const [preferredName, setPreferredName] = useState(name.split(' ')[0] || 'Ava');
  const [city, setCity] = useState('Arlington, VA');
  const [incomeRhythm, setIncomeRhythm] = useState<IncomeRhythm>('biweekly');
  const [topMoneyGoal, setTopMoneyGoal] = useState('Lower utilization and build trust');
  const [creditStage, setCreditStage] = useState<CreditStage>('building');
  const [financialStressLevel, setFinancialStressLevel] = useState<StressLevel>('medium');
  const [primaryReason, setPrimaryReason] = useState('I want my financial habits to be easier to understand.');
  const [avatarInitials, setAvatarInitials] = useState('AR');

  const submit = () => {
    const now = new Date().toISOString();
    onComplete({
      userId,
      auth0UserId: userId,
      email,
      name,
      preferredName,
      primaryReasonForUsingLolo: primaryReason,
      city,
      incomeRhythm,
      topMoneyGoal,
      creditStage,
      financialStressLevel,
      primaryReason,
      avatarInitials,
      badges: ['Trust profile created', 'Demo user', 'Privacy-first setup'],
      privacySettings: {
        demoMode: true,
        allowInsights: true,
        allowPartnerSharing: false,
      },
      createdAt: now,
      updatedAt: now,
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card glow>
        <Logo />
        <Text style={styles.title}>Create your LOLO profile</Text>
        <Text style={styles.copy}>This demo profile shapes the dashboard, AI Coach, journal, and trust narrative. No real financial data is connected.</Text>
      </Card>

      <Card>
        <Field label="Preferred name" value={preferredName} onChangeText={setPreferredName} />
        <Field label="City" value={city} onChangeText={setCity} />
        <Choice label="Income rhythm" options={['weekly', 'biweekly', 'monthly', 'irregular']} value={incomeRhythm} onChange={(value) => setIncomeRhythm(value as IncomeRhythm)} />
        <Field label="Top money goal" value={topMoneyGoal} onChangeText={setTopMoneyGoal} />
        <Choice label="Credit stage" options={['thin-file', 'building', 'rebuilding', 'established', 'excellent']} value={creditStage} onChange={(value) => setCreditStage(value as CreditStage)} />
        <Choice label="Financial stress level" options={['low', 'medium', 'high']} value={financialStressLevel} onChange={(value) => setFinancialStressLevel(value as StressLevel)} />
        <Field label="Primary reason for using LOLO" value={primaryReason} onChangeText={setPrimaryReason} />
        <Field label="Avatar initials" value={avatarInitials} onChangeText={setAvatarInitials} />
        <PrimaryButton label="Finish profile" onPress={submit} style={styles.submit} />
      </Card>
    </ScrollView>
  );
};

const Field = ({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} placeholderTextColor={colors.textMuted} style={styles.input} />
  </View>
);

const Choice = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.choices}>
      {options.map((option) => (
        <Text key={option} onPress={() => onChange(option)} style={[styles.choice, option === value && styles.choiceActive]}>{option}</Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    marginTop: spacing.xl,
  },
  copy: {
    ...typography.body,
    marginTop: spacing.md,
  },
  field: {
    marginTop: spacing.lg,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.borderSoft,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.textPrimary,
    fontWeight: '800',
    padding: spacing.md,
  },
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  choice: {
    backgroundColor: colors.cardSoft,
    borderColor: colors.borderSoft,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  choiceActive: {
    backgroundColor: colors.primary,
    color: colors.surfaceLight,
  },
  submit: {
    marginTop: spacing.xl,
  },
});
