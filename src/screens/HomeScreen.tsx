import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Colors } from '../constants/theme';
import { useProfile } from '../context/ProfileContext';

export const HomeScreen = () => {
  const { profile } = useProfile();
  const score = profile?.creditScore ?? 700;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hello, {profile?.name}</Text>
        <Text style={styles.subheading}>Your LOLO financial summary</Text>
      </View>

      <Card style={styles.cardPrimary}>
        <Text style={styles.sectionTitle}>Credit health</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.cardText}>Recommended next step: {profile?.nextStep}</Text>
      </Card>

      <View style={styles.row}>
        <Card style={styles.smallCard}>
          <Text style={styles.label}>Account balance</Text>
          <Text style={styles.value}>{profile?.balance}</Text>
        </Card>
        <Card style={styles.smallCard}>
          <Text style={styles.label}>Available budget</Text>
          <Text style={styles.value}>{profile?.monthlyBudget}</Text>
        </Card>
      </View>

      <Card>
        <SectionHeader title="Upcoming bills" subtitle="Plan ahead with confidence." />
        <View style={styles.billRow}>
          <Text style={styles.billName}>Rent</Text>
          <Text style={styles.billAmount}>$1,150</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billName}>Phone & utilities</Text>
          <Text style={styles.billAmount}>$220</Text>
        </View>
      </Card>

      <Card>
        <SectionHeader title="Spending insights" subtitle="A calm view of your money habits." />
        <Text style={styles.cardText}>You are doing well keeping credit use under 30%. Try shifting small recurring payments to rent reporting.</Text>
      </Card>

      <Card>
        <SectionHeader title="Action plan preview" subtitle="Your next steps with LOLO." />
        <Text style={styles.cardText}>- Check your monthly credit health score.</Text>
        <Text style={styles.cardText}>- Log rent payments for stronger reporting.</Text>
        <Text style={styles.cardText}>- Save a safe emergency buffer for unexpected moves.</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 22,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
  },
  subheading: {
    marginTop: 8,
    color: Colors.muted,
    fontSize: 15,
  },
  cardPrimary: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 10,
  },
  score: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.primary,
  },
  cardText: {
    marginTop: 12,
    color: Colors.muted,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    flex: 1,
  },
  label: {
    color: Colors.muted,
    fontSize: 13,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.secondary,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  billName: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  billAmount: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
