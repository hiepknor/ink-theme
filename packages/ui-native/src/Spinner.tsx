import { ActivityIndicator, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';

export interface SpinnerProps { label?: string; style?: StyleProp<ViewStyle>; }
export function Spinner({ label = 'Loading', style }: SpinnerProps) {
  return <View accessible accessibilityLabel={label} accessibilityRole="progressbar" accessibilityValue={{ text: label }} style={[styles.base, style]}>
    <ActivityIndicator color={nativeTokens.colors.action} /><Text style={styles.label}>{label}</Text>
  </View>;
}
const styles = StyleSheet.create({ base: { alignItems: 'center', flexDirection: 'row', gap: nativeTokens.spacing.sm }, label: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm } });
