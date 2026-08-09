import { forwardRef, useId, type ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface TextAreaProps extends Omit<TextInputProps, 'multiline'> { density?: InkDensity; description?: ReactNode; error?: ReactNode; label: string; }
export const TextArea = forwardRef<TextInput, TextAreaProps>(function TextArea({ density: densityOverride, description, editable = true, error, label, nativeID: nativeIdProp, numberOfLines = 4, ...props }, ref) {
  const nativeID = nativeIdProp ?? `ink-textarea-${useId()}`;
  const labelId = `${nativeID}-label`;
  const density = useInkDensity(densityOverride);
  return <View style={styles.field}><Text nativeID={labelId} style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} accessibilityLabelledBy={labelId}
    accessibilityState={{ disabled: !editable }} aria-invalid={Boolean(error)} editable={editable} multiline nativeID={nativeID} numberOfLines={numberOfLines} ref={ref}
    placeholderTextColor={nativeTokens.colors.foregroundSubtle} style={[styles.input, { minHeight: nativeTokens.controlHeight[density] * 2.5 }, !editable && styles.disabled, Boolean(error) && styles.invalid]} textAlignVertical="top" {...props} />
    {description && !error ? <Text style={styles.description}>{description}</Text> : null}{error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}</View>;
});
const styles = StyleSheet.create({
  field: { gap: nativeTokens.spacing.xs }, label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium },
  input: { backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.medium, padding: nativeTokens.spacing.md },
  invalid: { borderWidth: nativeTokens.borderWidth.strong }, disabled: { backgroundColor: nativeTokens.colors.recessed, opacity: 0.55 }, description: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm },
  error: { borderLeftColor: nativeTokens.colors.statusDanger, borderLeftWidth: nativeTokens.borderWidth.strong, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, paddingLeft: nativeTokens.spacing.sm },
});
