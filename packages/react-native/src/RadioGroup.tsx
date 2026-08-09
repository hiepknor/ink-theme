import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface RadioOption { disabled?: boolean; label: string; value: string; }
export interface RadioGroupProps { density?: InkDensity; disabled?: boolean; label: string; onValueChange?: (value: string) => void; options: RadioOption[]; style?: StyleProp<ViewStyle>; value?: string; }
export function RadioGroup({ density: densityOverride, disabled = false, label, onValueChange, options, style, value }: RadioGroupProps) {
  const density = useInkDensity(densityOverride);
  return <View accessibilityLabel={label} accessibilityRole="radiogroup" style={[styles.group, style]}><Text style={styles.label}>{label}</Text>{options.map((option) => {
    const blocked = disabled || Boolean(option.disabled); const selected = value === option.value;
    return <Pressable accessibilityLabel={option.label} accessibilityRole="radio" accessibilityState={{ checked: selected, disabled: blocked }} disabled={blocked} key={option.value}
      onPress={() => onValueChange?.(option.value)} style={({ pressed }) => [styles.option, { minHeight: nativeTokens.controlHeight[density] }, pressed && !blocked && styles.pressed, blocked && styles.disabled]}>
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.control, selected && styles.selected]}>{selected ? <View style={styles.dot} /> : null}</View><Text style={styles.optionLabel}>{option.label}</Text>
    </Pressable>;
  })}</View>;
}
const styles = StyleSheet.create({
  group: { gap: nativeTokens.spacing.xs }, label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium }, option: { alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', gap: nativeTokens.spacing.sm, paddingHorizontal: nativeTokens.spacing.xs },
  control: { alignItems: 'center', backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderRadius: 9, borderWidth: nativeTokens.borderWidth.default, height: 18, justifyContent: 'center', width: 18 }, selected: { borderWidth: nativeTokens.borderWidth.strong }, dot: { backgroundColor: nativeTokens.colors.action, borderRadius: 4, height: 8, width: 8 },
  optionLabel: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium }, pressed: { opacity: 0.72 }, disabled: { opacity: 0.72 },
});
