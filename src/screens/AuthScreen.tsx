import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { PrimaryButton } from '../components/PrimaryButton';
import { PublicHeader, PublicPageKey } from '../components/PublicHeader';
import { getAuth0SetupNotes } from '../services/auth0Service';
import { colors, radii, spacing, typography } from '../theme';

type AuthMode = 'login' | 'signup' | 'forgot';

interface AuthScreenProps {
  mode: AuthMode;
  onNavigate: (page: PublicPageKey) => void;
  onDemo: () => void;
  onLogin: () => void;
  onSignup: (name: string, email: string) => void;
}

export const AuthScreen = ({ mode, onNavigate, onDemo, onLogin, onSignup }: AuthScreenProps) => {
  const [name, setName] = useState('Ava Reynolds');
  const [email, setEmail] = useState('ava@example.com');
  const [password, setPassword] = useState('password-demo');
  const [confirmPassword, setConfirmPassword] = useState('password-demo');

  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  const submit = () => {
    if (isSignup) onSignup(name, email);
    else onLogin();
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <PublicHeader active={mode === 'login' ? 'login' : 'signup'} onNavigate={onNavigate} onDemo={onDemo} />
        <Card glow style={styles.authCard}>
          <View style={styles.logoWrap}>
            <Logo />
          </View>
          <Text style={styles.title}>{isForgot ? 'Reset your password' : isSignup ? 'Create your LOLO account' : 'Welcome back'}</Text>
          <Text style={styles.copy}>
            {isForgot
              ? 'Enter your email and we will show the future password reset flow placeholder.'
              : 'Read-only financial intelligence. No score impact.'}
          </Text>

          {isSignup ? <Field label="Name" value={name} onChangeText={setName} /> : null}
          <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          {!isForgot ? <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry /> : null}
          {isSignup ? <Field label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry /> : null}

          <PrimaryButton label={isForgot ? 'Send reset link placeholder' : isSignup ? 'Create account' : 'Sign in'} onPress={submit} style={styles.button} />
          {!isForgot ? <PrimaryButton label="Continue with Google via Auth0" variant="ghost" onPress={submit} style={styles.button} /> : null}

          <View style={styles.links}>
            {!isSignup && !isForgot ? <Text style={styles.link} onPress={() => onNavigate('signup')}>Create account</Text> : null}
            {isSignup ? <Text style={styles.link} onPress={() => onNavigate('login')}>Already have an account? Sign in</Text> : null}
            {!isForgot ? <Text style={styles.link} onPress={() => onNavigate('forgot')}>Forgot password?</Text> : null}
          </View>

          {getAuth0SetupNotes().map((note) => (
            <Text key={note} style={styles.note}>{note}</Text>
          ))}
        </Card>
        <Footer onNavigate={onNavigate} onDemo={onDemo} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Field = ({ label, value, onChangeText, secureTextEntry, keyboardType }: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor={colors.textMuted}
      style={styles.input}
      autoCapitalize="none"
    />
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
  authCard: {
    alignSelf: 'center',
    maxWidth: 620,
  },
  logoWrap: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
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
  button: {
    marginTop: spacing.lg,
  },
  links: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  link: {
    color: colors.accent,
    fontWeight: '900',
  },
  note: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
});
