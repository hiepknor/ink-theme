import * as ToastPrimitive from '@radix-ui/react-toast';
import { Component, type ComponentPropsWithoutRef, type ErrorInfo, type HTMLAttributes, type ReactNode } from 'react';
export type FeedbackTone = 'neutral' | 'ok' | 'warning' | 'danger';
export type FeedbackLive = 'off' | 'polite' | 'assertive';
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
    live?: FeedbackLive;
    title?: ReactNode;
    tone?: FeedbackTone;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
    live?: FeedbackLive;
}
export declare const ErrorMessage: import("react").ForwardRefExoticComponent<ErrorMessageProps & import("react").RefAttributes<HTMLDivElement>>;
export interface FormError {
    fieldId: string;
    label: ReactNode;
    message: ReactNode;
}
export interface FormErrorSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    errors: FormError[];
    focusOnMount?: boolean;
    live?: FeedbackLive;
    title?: ReactNode;
}
export declare const FormErrorSummary: import("react").ForwardRefExoticComponent<FormErrorSummaryProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    actions?: ReactNode;
    description?: ReactNode;
    details?: ReactNode;
    live?: FeedbackLive;
    title: ReactNode;
}
export declare const ErrorState: import("react").ForwardRefExoticComponent<ErrorStateProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ErrorBoundaryFallbackProps {
    error: Error;
    reset: () => void;
}
export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
    onError?: (error: Error, info: ErrorInfo) => void;
    resetKeys?: readonly unknown[];
}
interface ErrorBoundaryState {
    error: Error | null;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    componentDidUpdate(previousProps: ErrorBoundaryProps): void;
    reset: () => void;
    render(): string | number | bigint | boolean | import("react").JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | Iterable<ReactNode> | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | import("react").ReactPortal | null | undefined> | null | undefined;
}
export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    actions?: ReactNode;
    label?: string;
    live?: FeedbackLive;
    title: ReactNode;
    tone?: Exclude<FeedbackTone, 'ok'>;
}
export declare const Banner: import("react").ForwardRefExoticComponent<BannerProps & import("react").RefAttributes<HTMLElement>>;
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
export {};
