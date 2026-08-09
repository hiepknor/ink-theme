import { useRef, useState, type ReactNode } from 'react';
import { AccessibilityInfo, findNodeHandle, Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { useInkDensity } from './InkProvider';
import type { InkDensity } from './contracts';
import { useReducedMotion } from './useReducedMotion';

export interface SelectOption { disabled?: boolean; label: string; value: string; }
export interface SelectProps {
  density?: InkDensity; description?: ReactNode; disabled?: boolean; error?: ReactNode; label: string; onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void; open?: boolean; options: SelectOption[]; placeholder?: string; style?: StyleProp<ViewStyle>; value?: string;
}
export function Select({ density: densityOverride, description, disabled = false, error, label, onOpenChange, onValueChange, open: openProp, options, placeholder = 'Select an option', style, value }: SelectProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<View>(null);
  const density = useInkDensity(densityOverride);
  const reducedMotion = useReducedMotion();
  const open = openProp ?? internalOpen;
  const selected = options.find((option) => option.value === value);
  const setOpen = (next: boolean) => { if (openProp === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const choose = (next: string) => { onValueChange?.(next); setOpen(false); };
  const restoreTriggerFocus = () => { const handle = findNodeHandle(triggerRef.current); if (handle) AccessibilityInfo.setAccessibilityFocus(handle); };
  return <View style={[styles.field, style]}><Text style={styles.label}>{label}</Text><Pressable accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ disabled, expanded: open }} disabled={disabled} onPress={() => setOpen(true)} ref={triggerRef}
    style={({ pressed }) => [styles.trigger, { minHeight: nativeTokens.controlHeight[density] }, pressed && !disabled && styles.pressed, disabled && styles.disabled, Boolean(error) && styles.invalid]}>
    <Text style={[styles.value, !selected && styles.placeholder]}>{selected?.label ?? placeholder}</Text><View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.chevron, open && styles.chevronOpen]} />
  </Pressable>{description && !error ? <Text style={styles.description}>{description}</Text> : null}{error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
  <Modal animationType={reducedMotion ? 'none' : 'fade'} onDismiss={restoreTriggerFocus} onRequestClose={() => setOpen(false)} transparent visible={open}><View style={styles.backdrop}><Pressable accessibilityLabel="Close options" accessibilityRole="button" onPress={() => setOpen(false)} style={StyleSheet.absoluteFill} /><View accessibilityLabel={`${label} options`} accessibilityRole="menu" accessibilityViewIsModal style={styles.sheet}><View style={styles.sheetHeader}><Text style={styles.sheetTitle}>{label}</Text><Text style={styles.sheetHint}>Choose one option</Text></View><ScrollView>{options.map((option) => {
    const checked = option.value === value;
    return <Pressable accessibilityLabel={option.label} accessibilityRole="menuitem" accessibilityState={{ checked, disabled: Boolean(option.disabled) }} disabled={option.disabled} key={option.value} onPress={() => choose(option.value)}
      style={({ pressed }) => [styles.option, { minHeight: nativeTokens.controlHeight[density] }, checked && styles.optionSelected, pressed && styles.pressed, option.disabled && styles.disabled]}><Text allowFontScaling={false} style={styles.optionMark}>{checked ? '✓' : ''}</Text><Text style={styles.optionLabel}>{option.label}</Text></Pressable>;
  })}</ScrollView></View></View></Modal></View>;
}
const styles = StyleSheet.create({
  field: { gap: nativeTokens.spacing.xs }, label: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, fontWeight: nativeTokens.fontWeight.medium }, trigger: { alignItems: 'center', backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderWidth: nativeTokens.borderWidth.default, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: nativeTokens.spacing.md, paddingVertical: nativeTokens.spacing.xs }, value: { color: nativeTokens.colors.foreground, flex: 1, flexShrink: 1, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.medium }, placeholder: { color: nativeTokens.colors.foregroundSubtle }, chevron: { borderBottomColor: nativeTokens.colors.foreground, borderBottomWidth: 2, borderRightColor: nativeTokens.colors.foreground, borderRightWidth: 2, flexShrink: 0, height: 9, marginLeft: nativeTokens.spacing.sm, transform: [{ rotate: '45deg' }], width: 9 }, chevronOpen: { transform: [{ rotate: '225deg' }] }, invalid: { borderWidth: nativeTokens.borderWidth.strong }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.72 }, description: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm }, error: { borderLeftColor: nativeTokens.colors.statusDanger, borderLeftWidth: nativeTokens.borderWidth.strong, color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.sm, paddingLeft: nativeTokens.spacing.sm },
  backdrop: { backgroundColor: 'rgba(0,0,0,0.45)', flex: 1, justifyContent: 'flex-end' }, sheet: { backgroundColor: nativeTokens.colors.surface, borderColor: nativeTokens.colors.borderStrong, borderTopWidth: nativeTokens.borderWidth.strong, maxHeight: '70%', padding: nativeTokens.spacing.lg }, sheetHeader: { borderBottomColor: nativeTokens.colors.border, borderBottomWidth: nativeTokens.borderWidth.default, gap: nativeTokens.spacing.xs, paddingBottom: nativeTokens.spacing.md }, sheetTitle: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold }, sheetHint: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm }, option: { alignItems: 'center', borderBottomColor: nativeTokens.colors.border, borderBottomWidth: nativeTokens.borderWidth.default, flexDirection: 'row', gap: nativeTokens.spacing.sm, paddingHorizontal: nativeTokens.spacing.sm }, optionSelected: { backgroundColor: nativeTokens.colors.recessed }, optionMark: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.bold, width: 20 }, optionLabel: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md },
});
