import { Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { ButtonVariant, InkDensity } from './contracts';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  children: string;
  density?: InkDensity;
  label: string;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

export function IconButton({ children, density: densityOverride, disabled = false, label, style, variant = 'secondary', ...props }: IconButtonProps) {
  const density = useInkDensity(densityOverride);
  const size = nativeTokens.controlHeight[density];
  const blocked = Boolean(disabled);
  return <Pressable accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ disabled: blocked }} disabled={blocked}
    style={({ pressed }) => [styles.base, variantStyles[variant], { height: size, width: size }, pressed && !blocked && styles.pressed, blocked && styles.disabled, style]} {...props}>
    <Text accessibilityElementsHidden allowFontScaling={false} importantForAccessibility="no-hide-descendants" style={[styles.glyph, variant === 'primary' && styles.primaryGlyph]}>{children}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, justifyContent: 'center' },
  glyph: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold },
  primaryGlyph: { color: nativeTokens.colors.actionInk },
  pressed: { boxShadow: [], transform: [{ translateX: 1 }, { translateY: 1 }] },
  disabled: { opacity: 0.55 },
});
const variantStyles = StyleSheet.create({ primary: { backgroundColor: nativeTokens.colors.action, boxShadow: '2px 2px 0 #111111' }, secondary: { backgroundColor: nativeTokens.colors.surface }, quiet: { backgroundColor: 'transparent', borderColor: 'transparent' } });
