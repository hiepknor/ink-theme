import { type HTMLAttributes, type ReactNode } from 'react';
export type FeedbackTone = 'neutral' | 'ok' | 'warning' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: FeedbackTone;
}
export declare const Badge: import("react").ForwardRefExoticComponent<BadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface StatusMarkProps extends HTMLAttributes<HTMLSpanElement> {
    label: string;
    tone?: FeedbackTone;
}
export declare const StatusMark: import("react").ForwardRefExoticComponent<StatusMarkProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    label?: string;
}
export declare const Spinner: import("react").ForwardRefExoticComponent<SpinnerProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: ReactNode;
    description?: ReactNode;
    title: ReactNode;
}
export declare const EmptyState: import("react").ForwardRefExoticComponent<EmptyStateProps & import("react").RefAttributes<HTMLDivElement>>;
