import { ActivityIndicator, Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { ButtonVariant, InkDensity } from './contracts';
import { useReducedMotion } from './useReducedMotion';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  density?: InkDensity;
  loading?: boolean;
  loadingLabel?: string;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

export function Button({ accessibilityLabel, children, density: densityOverride, disabled, loading = false, loadingLabel = 'Loading', style, variant = 'secondary', ...props }: ButtonProps) {
  const density = useInkDensity(densityOverride);
  const reducedMotion = useReducedMotion();
  const blocked = disabled || loading;
  return <Pressable
    accessibilityRole="button"
    accessibilityLabel={loading ? loadingLabel : accessibilityLabel}
    accessibilityState={{ busy: loading, disabled: blocked }}
    disabled={blocked}
    style={({ pressed }) => [styles.base, variantStyles[variant], { minHeight: nativeTokens.controlHeight[density] }, pressed && !blocked && styles.pressed, blocked && styles.disabled, style]}
    {...props}
  >
    {loading ? reducedMotion
      ? <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.staticSpinner, variant === 'primary' && styles.staticSpinnerPrimary]} />
      : <ActivityIndicator color={variant === 'primary' ? nativeTokens.colors.actionInk : nativeTokens.colors.action} style={styles.spinner} /> : null}
    <Text accessibilityElementsHidden={loading} importantForAccessibility={loading ? 'no-hide-descendants' : 'auto'} style={[styles.label, variant === 'primary' && styles.primaryLabel, loading && styles.loadingLabel]}>{children}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, boxShadow: '2px 2px 0 #111111', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: nativeTokens.spacing.md, paddingVertical: nativeTokens.spacing.xs },
  label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium },
  primaryLabel: { color: nativeTokens.colors.actionInk },
  pressed: { boxShadow: [], transform: [{ translateX: 2 }, { translateY: 2 }] },
  disabled: { opacity: 0.55 },
  loadingLabel: { opacity: 0 },
  spinner: { position: 'absolute' },
  staticSpinner: { borderColor: nativeTokens.colors.action, borderRadius: 8, borderStyle: 'dashed', borderWidth: 2, height: 16, opacity: 0.65, position: 'absolute', width: 16 },
  staticSpinnerPrimary: { borderColor: nativeTokens.colors.actionInk },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: nativeTokens.colors.action, boxShadow: '3px 3px 0 #111111' },
  secondary: { backgroundColor: nativeTokens.colors.surface },
  quiet: { backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: [] },
});
