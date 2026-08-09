import { type ButtonHTMLAttributes } from 'react';
import { type InkDensity } from './shared.js';
export type ButtonVariant = 'primary' | 'secondary' | 'quiet';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    density?: InkDensity;
    loading?: boolean;
    loadingLabel?: string;
    variant?: ButtonVariant;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
