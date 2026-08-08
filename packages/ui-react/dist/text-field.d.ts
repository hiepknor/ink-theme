import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type InkDensity } from './shared.js';
import { type FeedbackLive } from './feedback.js';
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    density?: InkDensity;
    description?: ReactNode;
    error?: ReactNode;
    errorLive?: FeedbackLive;
    hideLabel?: boolean;
    label: ReactNode;
}
export declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
