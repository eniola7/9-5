import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { Sparkline, MiniBars } from './Charts';
import { MomentumDial } from './Momentum';
import { colors, radii, shadows, spacing, typography } from '../../theme';

export const DemoCard = ({ score = 742, delta = 18 }: { score?: number; delta?: number }) => (
  <View style={styles.wrap}>
    <View style={styles.glow} />
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={typography.eyebrow}>May Review · Mina A.</Text>
          <Text style={styles.persona}>Recent immigrant · thin credit file</Text>
        </View>
        <Text style={styles.demoBadge}>Demo</Text>
      </View>

      <View style={styles.momentum}>
        <MomentumDial score={score} delta={delta} />
      </View>

      <View style={styles.grid}>
        <View style={styles.panel}>
          <View style={styles.panelTop}>
            <Text style={styles.panelTitle}>Credit rhythm</Text>
            <Text style={styles.success}>on time · 7/7</Text>
          </View>
          <Sparkline values={[612, 624, 640, 661, 689, 712, score]} />
        </View>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Spending drift</Text>
          <MiniBars values={[680, 720, 790, 740, 820, 760]} labels={['D', 'J', 'F', 'M', 'A', 'M']} />
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.actionMark}>
          <Text style={styles.actionMarkText}>L</Text>
        </View>
        <View style={styles.actionCopy}>
          <Text style={styles.actionKicker}>One next best action</Text>
          <Text style={styles.actionText}>
            Pay the Secured Builder Visa down to $250 before the 9-day due date. That keeps utilization under 25% and protects your credit-age trajectory.
          </Text>
        </View>
      </View>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  glow: {
    backgroundColor: colors.mint,
    borderRadius: 34,
    bottom: -12,
    left: -12,
    opacity: 0.7,
    position: 'absolute',
    right: -12,
    top: -12,
  },
  card: {
    backgroundColor: colors.card,
    ...shadows.card,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  persona: {
    color: colors.inkSoft,
    fontFamily: 'Georgia',
    fontSize: 18,
    marginTop: spacing.xs,
  },
  demoBadge: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    textTransform: 'uppercase',
  },
  momentum: {
    marginTop: spacing.xl,
  },
  grid: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  panel: {
    backgroundColor: colors.paper,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  panelTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: colors.inkSoft,
    fontSize: 12,
    fontWeight: '700',
  },
  success: {
    color: colors.success,
    fontSize: 10,
    fontWeight: '700',
  },
  action: {
    backgroundColor: colors.mint,
    borderColor: 'rgba(31, 143, 95, 0.18)',
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  actionMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  actionMarkText: {
    color: colors.white,
    fontFamily: 'Georgia',
    fontSize: 16,
  },
  actionCopy: {
    flex: 1,
  },
  actionKicker: {
    color: colors.primaryDeep,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  actionText: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
});
