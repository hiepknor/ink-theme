import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import type { SurfaceTone } from './contracts';

export interface SurfaceProps extends Omit<ViewProps, 'style'> {
  padding?: boolean;
  style?: StyleProp<ViewStyle>;
  tone?: SurfaceTone;
}

export function Surface({ padding = true, style, tone = 'default', ...props }: SurfaceProps) {
  return <View style={[styles.base, toneStyles[tone], padding && styles.padding, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: { borderColor: nativeTokens.colors.border, borderWidth: nativeTokens.borderWidth.default },
  padding: { padding: nativeTokens.spacing.lg },
});

const toneStyles = StyleSheet.create({
  default: { backgroundColor: nativeTokens.colors.surface },
  elevated: { backgroundColor: nativeTokens.colors.elevated },
  recessed: { backgroundColor: nativeTokens.colors.recessed },
});
