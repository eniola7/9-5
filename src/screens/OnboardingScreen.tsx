import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { Card } from '../components/Card';
import { Colors } from '../constants/theme';
import { UserProfile } from '../types';

interface OnboardingScreenProps {
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
}

export const OnboardingScreen = ({ profiles, onSelectProfile }: OnboardingScreenProps) => {
  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.title}>Welcome to LOLO</Text>
        <Text style={styles.subtitle}>Live On. Life Optimized.</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Choose your path</Text>
        <Text style={styles.cardSubtitle}>Get a personalized roadmap for your journey.</Text>
        <FlatList
          contentContainerStyle={styles.optionList}
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
              onPress={() => onSelectProfile(item)}
            >
              <Text style={styles.optionLabel}>{item.role}</Text>
              <Text style={styles.optionHint}>{item.name}'s starter experience</Text>
            </Pressable>
          )}
        />
      </Card>

      <Text style={styles.note}>Designed for students and young professionals who want smarter credit and money guidance.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  hero: {
    marginBottom: 24,
  },
  title: {
    color: Colors.primary,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
  },
  subtitle: {
    marginTop: 10,
    color: Colors.secondary,
    fontSize: 18,
    maxWidth: 280,
  },
  card: {
    paddingVertical: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  cardSubtitle: {
    color: Colors.muted,
    marginBottom: 16,
  },
  optionList: {
    paddingBottom: 4,
  },
  option: {
    backgroundColor: Colors.background,
    borderRadius: 18,
    padding: 18,
    borderColor: '#D9E4FF',
    borderWidth: 1,
  },
  optionPressed: {
    opacity: 0.8,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  optionHint: {
    marginTop: 4,
    color: Colors.muted,
    fontSize: 13,
  },
  note: {
    marginTop: 26,
    color: Colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
});
