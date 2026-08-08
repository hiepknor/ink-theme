import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { type InkDensity } from './shared.js';
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    label: ReactNode;
}
export declare const TextArea: import("react").ForwardRefExoticComponent<TextAreaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export interface RadioOption {
    disabled?: boolean;
    label: ReactNode;
    value: string;
}
export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
    defaultValue?: string;
    density?: InkDensity;
    label: ReactNode;
    name: string;
    onValueChange?: (value: string) => void;
    options: RadioOption[];
    value?: string;
}
export declare const RadioGroup: import("react").ForwardRefExoticComponent<RadioGroupProps & import("react").RefAttributes<HTMLFieldSetElement>>;
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    density?: InkDensity;
    label: ReactNode;
}
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLInputElement>>;
export interface SelectOption {
    disabled?: boolean;
    label: ReactNode;
    value: string;
}
export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue' | 'onChange' | 'value'> {
    defaultOpen?: boolean;
    defaultValue?: string;
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    label: ReactNode;
    name?: string;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string) => void;
    open?: boolean;
    options: SelectOption[];
    placeholder?: ReactNode;
    required?: boolean;
    value?: string;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface ComboboxOption {
    label: string;
    value: string;
}
export interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'list'> {
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    label: ReactNode;
    options: ComboboxOption[];
}
export declare const Combobox: import("react").ForwardRefExoticComponent<ComboboxProps & import("react").RefAttributes<HTMLInputElement>>;
