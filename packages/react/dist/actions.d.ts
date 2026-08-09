import { type ButtonHTMLAttributes, type HTMLAttributes } from 'react';
import { type InkDensity } from './shared.js';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    density?: InkDensity;
    label: string;
    variant?: 'primary' | 'secondary' | 'quiet';
}
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    density?: InkDensity;
    label: string;
}
export declare const ButtonGroup: import("react").ForwardRefExoticComponent<ButtonGroupProps & import("react").RefAttributes<HTMLDivElement>>;
