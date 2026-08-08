import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef, useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { classes, describedBy, type InkDensity } from './shared.js';
import { useInkDensity } from './ink-provider.js';

interface FieldCopyProps { description?: ReactNode; error?: ReactNode; id: string; }
function FieldCopy({ description, error, id }: FieldCopyProps) {
  return <>{description && <div className="ink-ui-description" id={`${id}-description`}>{description}</div>}{error && <div className="ink-ui-error" id={`${id}-error`}>{error}</div>}</>;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  density?: InkDensity; description?: ReactNode; error?: ReactNode; label: ReactNode;
}
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, id: idProp, label, ...props }, ref,
) {
  const id = idProp ?? `ink-textarea-${useId()}`;
  const density = useInkDensity(densityOverride);
  return <div className="ink-ui-field" data-density={density}><label className="ink-ui-label" htmlFor={id}>{label}</label><textarea {...props} ref={ref} id={id} className={classes('ink-ui-input ink-ui-textarea', className)} aria-invalid={ariaInvalid ?? (error ? true : undefined)} aria-describedby={describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined)} /><FieldCopy id={id} description={description} error={error} /></div>;
});

export interface RadioOption { disabled?: boolean; label: ReactNode; value: string; }
export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  defaultValue?: string; density?: InkDensity; label: ReactNode; name: string; onValueChange?: (value: string) => void; options: RadioOption[]; value?: string;
}
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { defaultValue, density: densityOverride, disabled, label, name, onValueChange, options, value, ...inputProps }, ref,
) {
  const density = useInkDensity(densityOverride);
  return <fieldset ref={ref} className="ink-ui-choice-group" data-density={density} disabled={disabled}><legend className="ink-ui-label">{label}</legend>{options.map((option) => <label className="ink-ui-check-label" key={option.value}><input {...inputProps} className="ink-ui-radio" type="radio" name={name} value={option.value} disabled={option.disabled} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} onChange={(event) => onValueChange?.(event.currentTarget.value)} /><span>{option.label}</span></label>)}</fieldset>;
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { density?: InkDensity; label: ReactNode; }
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, density: densityOverride, label, ...props }, ref,
) {
  const density = useInkDensity(densityOverride);
  return <label className="ink-ui-switch-label" data-density={density}><input {...props} ref={ref} type="checkbox" role="switch" className={classes('ink-ui-switch-input', className)} /><span className="ink-ui-switch-track" aria-hidden="true"><span /></span><span>{label}</span></label>;
});

export interface SelectOption { disabled?: boolean; label: ReactNode; value: string; }
export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue' | 'onChange' | 'value'> {
  defaultOpen?: boolean; defaultValue?: string; density?: InkDensity; description?: ReactNode;
  error?: ReactNode; label: ReactNode; name?: string; onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void; open?: boolean; options: SelectOption[];
  placeholder?: ReactNode; required?: boolean; value?: string;
}
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, defaultOpen, defaultValue, density: densityOverride, description, disabled, error, id: idProp, label, name, onOpenChange, onValueChange, open, options, placeholder = 'Select an option', required, value, ...triggerProps }, ref,
) {
  const id = idProp ?? `ink-select-${useId()}`;
  const density = useInkDensity(densityOverride);
  return <div className="ink-ui-field" data-density={density}><label className="ink-ui-label" htmlFor={id}>{label}</label><SelectPrimitive.Root {...(defaultOpen === undefined ? {} : { defaultOpen })} {...(defaultValue === undefined ? {} : { defaultValue })} {...(disabled === undefined ? {} : { disabled })} {...(name === undefined ? {} : { name })} {...(onOpenChange === undefined ? {} : { onOpenChange })} {...(onValueChange === undefined ? {} : { onValueChange })} {...(open === undefined ? {} : { open })} {...(required === undefined ? {} : { required })} {...(value === undefined ? {} : { value })}><SelectPrimitive.Trigger {...triggerProps} ref={ref} id={id} className={classes('ink-ui-input ink-ui-select-trigger', className)} aria-invalid={ariaInvalid ?? (error ? true : undefined)} aria-describedby={describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined)}><SelectPrimitive.Value placeholder={placeholder} /><SelectPrimitive.Icon className="ink-ui-select-icon" aria-hidden="true"><svg viewBox="0 0 12 8" focusable="false"><path d="M1 1.5 6 6.5l5-5" /></svg></SelectPrimitive.Icon></SelectPrimitive.Trigger><SelectPrimitive.Portal><SelectPrimitive.Content className="ink-ui-select-content" data-density={density} position="popper" sideOffset={4}><SelectPrimitive.ScrollUpButton className="ink-ui-select-scroll" aria-label="Scroll up">↑</SelectPrimitive.ScrollUpButton><SelectPrimitive.Viewport className="ink-ui-select-viewport">{options.map((option) => <SelectPrimitive.Item className="ink-ui-select-item" {...(option.disabled === undefined ? {} : { disabled: option.disabled })} key={option.value} value={option.value}><SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText><SelectPrimitive.ItemIndicator className="ink-ui-select-indicator" aria-hidden="true">✓</SelectPrimitive.ItemIndicator></SelectPrimitive.Item>)}</SelectPrimitive.Viewport><SelectPrimitive.ScrollDownButton className="ink-ui-select-scroll" aria-label="Scroll down">↓</SelectPrimitive.ScrollDownButton></SelectPrimitive.Content></SelectPrimitive.Portal></SelectPrimitive.Root><FieldCopy id={id} description={description} error={error} /></div>;
});

export interface ComboboxOption { label: string; value: string; }
export interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'list'> { density?: InkDensity; description?: ReactNode; error?: ReactNode; label: ReactNode; options: ComboboxOption[]; }
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  { 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, id: idProp, label, options, ...props }, ref,
) {
  const id = idProp ?? `ink-combobox-${useId()}`;
  const listId = `${id}-options`;
  const density = useInkDensity(densityOverride);
  return <div className="ink-ui-field" data-density={density}><label className="ink-ui-label" htmlFor={id}>{label}</label><input {...props} ref={ref} id={id} list={listId} role="combobox" aria-autocomplete="list" className={classes('ink-ui-input ink-ui-combobox', className)} aria-invalid={ariaInvalid ?? (error ? true : undefined)} aria-describedby={describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined)} /><datalist id={listId}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</datalist><FieldCopy id={id} description={description} error={error} /></div>;
});
