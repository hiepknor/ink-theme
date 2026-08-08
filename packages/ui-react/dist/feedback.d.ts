import * as ToastPrimitive from '@radix-ui/react-toast';
import { type ComponentPropsWithoutRef, type HTMLAttributes, type ReactNode } from 'react';
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
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    tone?: FeedbackTone;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    label: string;
    max?: number;
    value?: number;
}
export declare const Progress: import("react").ForwardRefExoticComponent<ProgressProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
}
export declare const Skeleton: import("react").ForwardRefExoticComponent<SkeletonProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ToastProvider: import("react").FC<ToastPrimitive.ToastProviderProps>;
export declare const ToastViewport: import("react").ForwardRefExoticComponent<Omit<ToastPrimitive.ToastViewportProps & import("react").RefAttributes<HTMLOListElement>, "ref"> & import("react").RefAttributes<HTMLOListElement>>;
export interface ToastProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
    tone?: FeedbackTone;
}
export declare const Toast: import("react").ForwardRefExoticComponent<ToastProps & import("react").RefAttributes<HTMLLIElement>>;
export declare const ToastTitle: import("react").ForwardRefExoticComponent<Omit<ToastPrimitive.ToastTitleProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ToastDescription: import("react").ForwardRefExoticComponent<Omit<ToastPrimitive.ToastDescriptionProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ToastAction: import("react").ForwardRefExoticComponent<Omit<ToastPrimitive.ToastActionProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export declare const ToastClose: import("react").ForwardRefExoticComponent<Omit<ToastPrimitive.ToastCloseProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
