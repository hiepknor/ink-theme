import { Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface CheckboxProps extends Omit<PressableProps, 'children' | 'onPress' | 'style'> {
  checked: boolean;
  density?: InkDensity;
  label: string;
  onCheckedChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({ checked, density: densityOverride, disabled = false, label, onCheckedChange, style, ...props }: CheckboxProps) {
  const density = useInkDensity(densityOverride);
  const blocked = Boolean(disabled);
  return <Pressable
    accessibilityRole="checkbox"
    accessibilityState={{ checked, disabled: blocked }}
    disabled={blocked}
    onPress={() => onCheckedChange?.(!checked)}
    style={({ pressed }) => [styles.base, { minHeight: nativeTokens.controlHeight[density] }, pressed && !blocked && styles.pressed, blocked && styles.disabled, style]}
    {...props}
  >
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.box, checked && styles.boxChecked]}>
      {checked ? <View style={styles.mark}><View style={styles.markShort} /><View style={styles.markLong} /></View> : null}
    </View>
    <Text style={styles.label}>{label}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', gap: nativeTokens.spacing.sm, paddingHorizontal: nativeTokens.spacing.xs },
  box: { alignItems: 'center', backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, height: 18, justifyContent: 'center', width: 18 },
  boxChecked: { backgroundColor: nativeTokens.colors.action },
  mark: { height: 8, width: 11 },
  markShort: { backgroundColor: nativeTokens.colors.actionInk, height: 2, left: 0, position: 'absolute', top: 4, transform: [{ rotate: '45deg' }], width: 6 },
  markLong: { backgroundColor: nativeTokens.colors.actionInk, height: 2, left: 3, position: 'absolute', top: 3, transform: [{ rotate: '-45deg' }], width: 10 },
  label: { color: nativeTokens.colors.foreground, flexShrink: 1, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.72 },
});
