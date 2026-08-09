import { ActivityIndicator, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useReducedMotion } from './useReducedMotion';

export interface SpinnerProps { label?: string; style?: StyleProp<ViewStyle>; }
export function Spinner({ label = 'Loading', style }: SpinnerProps) {
  const reducedMotion = useReducedMotion();
  return <View accessible accessibilityLabel={label} accessibilityRole="progressbar" accessibilityValue={{ text: label }} style={[styles.base, style]}>
    {reducedMotion ? <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.staticSpinner} /> : <ActivityIndicator color={nativeTokens.colors.action} />}<Text style={styles.label}>{label}</Text>
  </View>;
}
const styles = StyleSheet.create({ base: { alignItems: 'center', flexDirection: 'row', gap: nativeTokens.spacing.sm }, label: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm }, staticSpinner: { borderColor: nativeTokens.colors.action, borderRadius: 8, borderStyle: 'dashed', borderWidth: 2, height: 16, opacity: 0.65, width: 16 } });
