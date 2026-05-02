import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { mockAlerts } from '../data/mockAlerts';
import { Colors } from '../constants/theme';

export const AlertsScreen = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Early risk signals</Text>
      <Text style={styles.subtitle}>LOLO flags trends so you can respond before they become issues.</Text>

      {mockAlerts.map((alert) => (
        <Card key={alert.id} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertMessage}>{alert.body}</Text>
          <View style={[styles.badge, alert.severity === 'warning' ? styles.warning : styles.info]}>
            <Text style={styles.badgeText}>{alert.severity === 'warning' ? 'Risk signal' : 'Info signal'}</Text>
          </View>
        </Card>
      ))}

      <Text style={styles.footer}>These alerts are educational and designed to help you stay mindful of your financial momentum.</Text>
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
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.muted,
    marginBottom: 18,
    lineHeight: 20,
  },
  alertCard: {
    paddingVertical: 18,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 6,
  },
  alertMessage: {
    color: Colors.muted,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  warning: {
    backgroundColor: '#FFF2DB',
  },
  info: {
    backgroundColor: '#EAF3FF',
  },
  badgeText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    marginTop: 22,
    color: Colors.muted,
    lineHeight: 20,
  },
});
