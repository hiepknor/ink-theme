import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type InkDensity } from './shared.js';
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    hideLabel?: boolean;
    label: ReactNode;
}
export declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
