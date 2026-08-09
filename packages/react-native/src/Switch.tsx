import { Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface SwitchProps extends Omit<PressableProps, 'children' | 'onPress' | 'style'> { checked: boolean; density?: InkDensity; label: string; onCheckedChange?: (checked: boolean) => void; style?: StyleProp<ViewStyle>; }
export function Switch({ checked, density: densityOverride, disabled = false, label, onCheckedChange, style, ...props }: SwitchProps) {
  const density = useInkDensity(densityOverride);
  const blocked = Boolean(disabled);
  return <Pressable accessibilityLabel={label} accessibilityRole="switch" accessibilityState={{ checked, disabled: blocked }} disabled={blocked} onPress={() => onCheckedChange?.(!checked)}
    style={({ pressed }) => [styles.base, { minHeight: nativeTokens.controlHeight[density] }, pressed && !blocked && styles.pressed, blocked && styles.disabled, style]} {...props}>
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.track, checked && styles.trackChecked]}><View style={[styles.thumb, checked && styles.thumbChecked]} /></View><Text style={styles.label}>{label}</Text>
  </Pressable>;
}
const styles = StyleSheet.create({
  base: { alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', gap: nativeTokens.spacing.sm, paddingHorizontal: nativeTokens.spacing.xs }, track: { backgroundColor: nativeTokens.colors.recessed, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, flexShrink: 0, height: 20, padding: 2, width: 36 }, trackChecked: { backgroundColor: nativeTokens.colors.action }, thumb: { backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, height: 14, width: 14 }, thumbChecked: { alignSelf: 'flex-end' }, label: { color: nativeTokens.colors.foreground, flexShrink: 1, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium }, pressed: { opacity: 0.72 }, disabled: { opacity: 0.55 },
});
