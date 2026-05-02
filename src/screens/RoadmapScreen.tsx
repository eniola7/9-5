import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { ProgressPill } from '../components/ProgressPill';
import { mockRoadmap } from '../data/mockRoadmap';
import { Colors } from '../constants/theme';

export const RoadmapScreen = () => {
  const progress = 60;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader title="Your LOLO Roadmap" subtitle="Track progress toward stronger credit and better financial habits." />
      <Card>
        <Text style={styles.progressLabel}>Roadmap completion</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressValue}>{progress}% complete</Text>
      </Card>

      {mockRoadmap.map((item) => (
        <Card key={item.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <ProgressPill label={item.status === 'in-progress' ? 'In progress' : item.status === 'completed' ? 'Completed' : 'Upcoming'} status={item.status} />
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </Card>
      ))}
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
  progressLabel: {
    color: Colors.muted,
    marginBottom: 12,
  },
  progressTrack: {
    width: '100%',
    height: 14,
    backgroundColor: '#E3EEFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  progressValue: {
    marginTop: 12,
    color: Colors.secondary,
    fontWeight: '700',
  },
  itemCard: {
    paddingVertical: 18,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  itemDescription: {
    marginTop: 10,
    color: Colors.muted,
    lineHeight: 20,
  },
});
