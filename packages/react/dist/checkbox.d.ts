import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type InkDensity } from './shared.js';
import { type FeedbackLive } from './feedback.js';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    errorLive?: FeedbackLive;
    label: ReactNode;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
