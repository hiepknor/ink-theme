import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';

export interface ProgressProps { label: string; max?: number; style?: StyleProp<ViewStyle>; value?: number; }
export function Progress({ label, max = 100, style, value }: ProgressProps) {
  const safeMax = Math.max(1, max);
  const bounded = value === undefined ? undefined : Math.min(safeMax, Math.max(0, value));
  const percent = bounded === undefined ? undefined : Math.round((bounded / safeMax) * 100);
  const valueText = percent === undefined ? 'In progress' : `${percent}%`;
  return <View style={[styles.wrap, style]}><View style={styles.copy}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{valueText}</Text></View>
    <View accessible accessibilityLabel={label} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: safeMax, now: bounded, text: valueText }} style={styles.track}>
      {bounded === undefined ? <View style={styles.indeterminate} /> : <View style={[styles.fill, { width: `${(bounded / safeMax) * 100}%` }]} />}
    </View>
  </View>;
}
const styles = StyleSheet.create({
  wrap: { gap: nativeTokens.spacing.sm }, copy: { flexDirection: 'row', justifyContent: 'space-between' }, label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.bold }, value: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm },
  track: { backgroundColor: nativeTokens.colors.recessed, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, height: 14, overflow: 'hidden' }, fill: { backgroundColor: nativeTokens.colors.action, height: '100%' }, indeterminate: { alignSelf: 'center', backgroundColor: nativeTokens.colors.action, height: '100%', width: '36%' },
});
