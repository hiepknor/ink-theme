import { useState, type ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';

export interface SelectOption { disabled?: boolean; label: string; value: string; }
export interface SelectProps {
  density?: InkDensity; description?: ReactNode; disabled?: boolean; error?: ReactNode; label: string; onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void; open?: boolean; options: SelectOption[]; placeholder?: string; style?: StyleProp<ViewStyle>; value?: string;
}
export function Select({ density: densityOverride, description, disabled = false, error, label, onOpenChange, onValueChange, open: openProp, options, placeholder = 'Select an option', style, value }: SelectProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const density = useInkDensity(densityOverride);
  const open = openProp ?? internalOpen;
  const selected = options.find((option) => option.value === value);
  const setOpen = (next: boolean) => { if (openProp === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const choose = (next: string) => { onValueChange?.(next); setOpen(false); };
  return <View style={[styles.field, style]}><Text style={styles.label}>{label}</Text><Pressable accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ disabled, expanded: open }} disabled={disabled} onPress={() => setOpen(true)}
    style={({ pressed }) => [styles.trigger, { minHeight: nativeTokens.controlHeight[density] }, pressed && !disabled && styles.pressed, disabled && styles.disabled, Boolean(error) && styles.invalid]}>
    <Text style={[styles.value, !selected && styles.placeholder]}>{selected?.label ?? placeholder}</Text><Text accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.chevron, open && styles.chevronOpen]}>⌄</Text>
  </Pressable>{description && !error ? <Text style={styles.description}>{description}</Text> : null}{error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
  <Modal animationType="fade" onRequestClose={() => setOpen(false)} transparent visible={open}><Pressable accessibilityLabel="Close options" accessibilityRole="button" onPress={() => setOpen(false)} style={styles.backdrop}><View accessibilityLabel={`${label} options`} accessibilityRole="menu" style={styles.sheet}><View style={styles.sheetHeader}><Text style={styles.sheetTitle}>{label}</Text><Text style={styles.sheetHint}>Choose one option</Text></View><ScrollView>{options.map((option) => {
    const checked = option.value === value;
    return <Pressable accessibilityLabel={option.label} accessibilityRole="menuitem" accessibilityState={{ checked, disabled: Boolean(option.disabled) }} disabled={option.disabled} key={option.value} onPress={() => choose(option.value)}
      style={({ pressed }) => [styles.option, { minHeight: nativeTokens.controlHeight[density] }, checked && styles.optionSelected, pressed && styles.pressed, option.disabled && styles.disabled]}><Text style={styles.optionMark}>{checked ? '✓' : ''}</Text><Text style={styles.optionLabel}>{option.label}</Text></Pressable>;
  })}</ScrollView></View></Pressable></Modal></View>;
}
const styles = StyleSheet.create({
  field: { gap: nativeTokens.spacing.xs }, label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.bold }, trigger: { alignItems: 'center', backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: nativeTokens.spacing.md }, value: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md }, placeholder: { color: nativeTokens.colors.foregroundSubtle }, chevron: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, transform: [{ rotate: '0deg' }] }, chevronOpen: { transform: [{ rotate: '180deg' }] }, invalid: { borderWidth: nativeTokens.borderWidth.strong }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.72 }, description: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm }, error: { borderLeftColor: nativeTokens.colors.statusDanger, borderLeftWidth: nativeTokens.borderWidth.strong, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, paddingLeft: nativeTokens.spacing.sm },
  backdrop: { backgroundColor: 'rgba(0,0,0,0.45)', flex: 1, justifyContent: 'flex-end' }, sheet: { backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderTopWidth: nativeTokens.borderWidth.strong, maxHeight: '70%', padding: nativeTokens.spacing.lg }, sheetHeader: { borderBottomColor: nativeTokens.colors.border, borderBottomWidth: nativeTokens.borderWidth.default, gap: nativeTokens.spacing.xs, paddingBottom: nativeTokens.spacing.md }, sheetTitle: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold }, sheetHint: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm }, option: { alignItems: 'center', borderBottomColor: nativeTokens.colors.border, borderBottomWidth: nativeTokens.borderWidth.default, flexDirection: 'row', gap: nativeTokens.spacing.sm, paddingHorizontal: nativeTokens.spacing.sm }, optionSelected: { backgroundColor: nativeTokens.colors.recessed }, optionMark: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.bold, width: 20 }, optionLabel: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md },
});
