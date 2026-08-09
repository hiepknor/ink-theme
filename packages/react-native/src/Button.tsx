import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { ButtonVariant, InkDensity } from './contracts';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  density?: InkDensity;
  loading?: boolean;
  loadingLabel?: string;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

export function Button({ children, density: densityOverride, disabled, loading = false, loadingLabel = 'Loading', style, variant = 'secondary', ...props }: ButtonProps) {
  const density = useInkDensity(densityOverride);
  const blocked = disabled || loading;
  return <Pressable
    accessibilityRole="button"
    accessibilityState={{ busy: loading, disabled: blocked }}
    disabled={blocked}
    style={({ pressed }) => [styles.base, variantStyles[variant], { minHeight: nativeTokens.controlHeight[density] }, pressed && !blocked && styles.pressed, blocked && styles.disabled, style]}
    {...props}
  >
    {loading ? <><ActivityIndicator color={variant === 'primary' ? nativeTokens.colors.actionInk : nativeTokens.colors.action} /><Text style={styles.visuallyHidden}>{loadingLabel}</Text></> : <Text style={[styles.label, variant === 'primary' && styles.primaryLabel]}>{children}</Text>}
  </Pressable>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, flexDirection: 'row', justifyContent: 'center', paddingHorizontal: nativeTokens.spacing.md, paddingVertical: nativeTokens.spacing.xs },
  label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium },
  primaryLabel: { color: nativeTokens.colors.actionInk },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.45 },
  visuallyHidden: { height: 1, opacity: 0, position: 'absolute', width: 1 },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: nativeTokens.colors.action },
  secondary: { backgroundColor: nativeTokens.colors.surface },
  quiet: { backgroundColor: 'transparent', borderColor: 'transparent' },
});
