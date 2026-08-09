import { StyleSheet, Text, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import type { FeedbackLive, FeedbackTone } from './contracts';

export interface AlertProps extends Omit<ViewProps, 'style'> {
  children: string;
  live?: FeedbackLive;
  style?: StyleProp<ViewStyle>;
  title?: string;
  tone?: FeedbackTone;
}

export function Alert({ children, live = 'off', style, title, tone = 'neutral', ...props }: AlertProps) {
  const liveRegion = live === 'off' ? 'none' : live;
  return <View accessible accessibilityLiveRegion={liveRegion} accessibilityRole={live === 'assertive' ? 'alert' : undefined}
    style={[styles.base, toneStyles[tone], style]} {...props}>
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.mark, markStyles[tone]]} />
    <View style={styles.copy}>{title ? <Text style={styles.title}>{title}</Text> : null}<Text style={styles.body}>{children}</Text></View>
  </View>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'stretch', backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, flexDirection: 'row' },
  mark: { backgroundColor: nativeTokens.colors.foreground, width: 6 }, copy: { flex: 1, gap: nativeTokens.spacing.xs, padding: nativeTokens.spacing.md },
  title: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.bold }, body: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm, lineHeight: 21 },
});
const toneStyles = StyleSheet.create({ neutral: {}, ok: {}, warning: { borderWidth: nativeTokens.borderWidth.strong }, danger: { borderWidth: nativeTokens.borderWidth.strong } });
const markStyles = StyleSheet.create({ neutral: {}, ok: { width: 10 }, warning: { width: 14 }, danger: { width: 18 } });
