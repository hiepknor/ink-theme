import { useId, type ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface TextFieldProps extends TextInputProps {
  density?: InkDensity;
  description?: ReactNode;
  error?: ReactNode;
  label: string;
}

export function TextField({ density: densityOverride, description, editable = true, error, label, nativeID: nativeIdProp, ...props }: TextFieldProps) {
  const generatedId = useId();
  const nativeID = nativeIdProp ?? `ink-field-${generatedId}`;
  const labelId = `${nativeID}-label`;
  const density = useInkDensity(densityOverride);
  return <View style={styles.field}>
    <Text nativeID={labelId} style={styles.label}>{label}</Text>
    <TextInput
      accessibilityLabel={label}
      accessibilityLabelledBy={labelId}
      accessibilityState={{ disabled: !editable }}
      aria-invalid={Boolean(error)}
      editable={editable}
      nativeID={nativeID}
      placeholderTextColor={nativeTokens.colors.foregroundSubtle}
      style={[styles.input, { minHeight: nativeTokens.controlHeight[density] }, !editable && styles.disabled, Boolean(error) && styles.invalid]}
      {...props}
    />
    {description && !error ? <Text style={styles.description}>{description}</Text> : null}
    {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  field: { gap: nativeTokens.spacing.xs },
  label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.bold },
  input: { backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, paddingHorizontal: nativeTokens.spacing.md },
  invalid: { borderWidth: nativeTokens.borderWidth.strong },
  disabled: { backgroundColor: nativeTokens.colors.recessed, opacity: 0.55 },
  description: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm },
  error: { borderLeftColor: nativeTokens.colors.statusDanger, borderLeftWidth: nativeTokens.borderWidth.strong, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, paddingLeft: nativeTokens.spacing.sm },
});
