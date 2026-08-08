import * as ToastPrimitive from '@radix-ui/react-toast';
import { Component, forwardRef, useEffect, useImperativeHandle, useRef, type ComponentPropsWithoutRef, type ComponentRef, type ErrorInfo, type HTMLAttributes, type ReactNode } from 'react';
import { classes } from './shared.js';

export type FeedbackTone = 'neutral' | 'ok' | 'warning' | 'danger';
export type FeedbackLive = 'off' | 'polite' | 'assertive';

function liveRegion(live: FeedbackLive) {
  if (live === 'assertive') return { role: 'alert' as const, 'aria-live': 'assertive' as const };
  if (live === 'polite') return { role: 'status' as const, 'aria-live': 'polite' as const };
  return {};
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: FeedbackTone; }
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ className, tone = 'neutral', ...props }, ref) {
  return <span ref={ref} className={classes('ink-ui-badge', className)} data-tone={tone} {...props} />;
});

export interface StatusMarkProps extends HTMLAttributes<HTMLSpanElement> { label: string; tone?: FeedbackTone; }
export const StatusMark = forwardRef<HTMLSpanElement, StatusMarkProps>(function StatusMark({ className, label, tone = 'neutral', ...props }, ref) {
  return <span ref={ref} className={classes('ink-ui-status', className)} data-tone={tone} {...props}><span className="ink-ui-status-glyph" aria-hidden="true" />{label}</span>;
});

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> { label?: string; }
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner({ className, label = 'Loading', ...props }, ref) {
  return <span ref={ref} role="status" aria-label={label} className={classes('ink-ui-spinner-wrap', className)} {...props}><span className="ink-ui-spinner" aria-hidden="true" /><span className="ink-ui-sr-only">{label}</span></span>;
});

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> { actions?: ReactNode; description?: ReactNode; title: ReactNode; }
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState({ actions, className, description, title, ...props }, ref) {
  return <div ref={ref} className={classes('ink-ui-empty-state', className)} {...props}><div className="ink-ui-empty-mark" aria-hidden="true" /><strong>{title}</strong>{description && <div className="ink-ui-description">{description}</div>}{actions && <div className="ink-ui-empty-actions">{actions}</div>}</div>;
});

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> { live?: FeedbackLive; title?: ReactNode; tone?: FeedbackTone; }
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ children, className, live = 'off', title, tone = 'neutral', ...props }, ref) {
  return <div ref={ref} {...liveRegion(live)} className={classes('ink-ui-alert', className)} data-tone={tone} {...props}>{title && <strong className="ink-ui-alert-title">{title}</strong>}<div>{children}</div></div>;
});

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> { live?: FeedbackLive; }
export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(function ErrorMessage({ className, live = 'off', ...props }, ref) {
  return <div ref={ref} {...liveRegion(live)} className={classes('ink-ui-error', className)} {...props} />;
});

export interface FormError { fieldId: string; label: ReactNode; message: ReactNode; }
export interface FormErrorSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  errors: FormError[];
  focusOnMount?: boolean;
  live?: FeedbackLive;
  title?: ReactNode;
}
export const FormErrorSummary = forwardRef<HTMLDivElement, FormErrorSummaryProps>(function FormErrorSummary({ className, errors, focusOnMount = false, live = 'assertive', title = 'Review the highlighted fields', ...props }, forwardedRef) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);
  useEffect(() => { if (focusOnMount && errors.length > 0) ref.current?.focus(); }, [errors.length, focusOnMount]);
  if (errors.length === 0) return null;
  return <div ref={ref} tabIndex={-1} {...liveRegion(live)} className={classes('ink-ui-error-summary', className)} {...props}><strong className="ink-ui-error-summary-title">{title}</strong><ul>{errors.map((error) => <li key={error.fieldId}><a href={`#${error.fieldId}`}>{error.label}: {error.message}</a></li>)}</ul></div>;
});

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  actions?: ReactNode;
  description?: ReactNode;
  details?: ReactNode;
  live?: FeedbackLive;
  title: ReactNode;
}
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState({ actions, className, description, details, live = 'off', title, ...props }, ref) {
  return <div ref={ref} {...liveRegion(live)} className={classes('ink-ui-error-state', className)} {...props}><span className="ink-ui-error-state-mark" aria-hidden="true" /><strong>{title}</strong>{description && <div className="ink-ui-description">{description}</div>}{details && <details><summary>Technical details</summary><div>{details}</div></details>}{actions && <div className="ink-ui-error-state-actions">{actions}</div>}</div>;
});

export interface ErrorBoundaryFallbackProps { error: Error; reset: () => void; }
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  onError?: (error: Error, info: ErrorInfo) => void;
  resetKeys?: readonly unknown[];
}
interface ErrorBoundaryState { error: Error | null; }
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };
  static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { this.props.onError?.(error, info); }
  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (this.state.error && this.props.resetKeys && previousProps.resetKeys && (this.props.resetKeys.length !== previousProps.resetKeys.length || this.props.resetKeys.some((key, index) => !Object.is(key, previousProps.resetKeys?.[index])))) this.setState({ error: null });
  }
  reset = () => this.setState({ error: null });
  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (typeof this.props.fallback === 'function') return this.props.fallback({ error, reset: this.reset });
    if (this.props.fallback !== undefined) return this.props.fallback;
    return <ErrorState title="Something went wrong" description="This section could not be displayed." actions={<button type="button" className="ink-ui-recovery-action" onClick={this.reset}>Try again</button>} />;
  }
}

export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  actions?: ReactNode;
  label?: string;
  live?: FeedbackLive;
  title: ReactNode;
  tone?: Exclude<FeedbackTone, 'ok'>;
}
export const Banner = forwardRef<HTMLElement, BannerProps>(function Banner({ actions, children, className, label = 'System notice', live = 'polite', title, tone = 'warning', ...props }, ref) {
  return <section ref={ref} aria-label={label} {...liveRegion(live)} className={classes('ink-ui-banner', className)} data-tone={tone} {...props}><span className="ink-ui-banner-mark" aria-hidden="true" /><div className="ink-ui-banner-copy"><strong>{title}</strong>{children && <div>{children}</div>}</div>{actions && <div className="ink-ui-banner-actions">{actions}</div>}</section>;
});

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> { label: string; max?: number; value?: number; }
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress({ className, label, max = 100, value, ...props }, ref) {
  const safeMax = Math.max(1, max);
  const bounded = value === undefined ? undefined : Math.min(safeMax, Math.max(0, value));
  return <div ref={ref} className={classes('ink-ui-progress-wrap', className)} {...props}><div className="ink-ui-progress-copy"><span>{label}</span><span>{bounded === undefined ? 'In progress' : `${Math.round((bounded / safeMax) * 100)}%`}</span></div><div className="ink-ui-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={bounded}><span style={{ width: bounded === undefined ? undefined : `${(bounded / safeMax) * 100}%` }} /></div></div>;
});

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> { label?: string; }
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton({ className, label = 'Loading content', ...props }, ref) {
  return <div ref={ref} role="status" aria-label={label} className={classes('ink-ui-skeleton', className)} {...props} />;
});

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = forwardRef<ComponentRef<typeof ToastPrimitive.Viewport>, ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(function ToastViewport({ className, ...props }, ref) { return <ToastPrimitive.Viewport ref={ref} className={classes('ink-ui-toast-viewport', className)} {...props} />; });
export interface ToastProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> { tone?: FeedbackTone; }
export const Toast = forwardRef<ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(function Toast({ className, tone = 'neutral', ...props }, ref) { return <ToastPrimitive.Root ref={ref} className={classes('ink-ui-toast', className)} data-tone={tone} {...props} />; });
export const ToastTitle = forwardRef<ComponentRef<typeof ToastPrimitive.Title>, ComponentPropsWithoutRef<typeof ToastPrimitive.Title>>(function ToastTitle({ className, ...props }, ref) { return <ToastPrimitive.Title ref={ref} className={classes('ink-ui-toast-title', className)} {...props} />; });
export const ToastDescription = forwardRef<ComponentRef<typeof ToastPrimitive.Description>, ComponentPropsWithoutRef<typeof ToastPrimitive.Description>>(function ToastDescription({ className, ...props }, ref) { return <ToastPrimitive.Description ref={ref} className={classes('ink-ui-description', className)} {...props} />; });
export const ToastAction = forwardRef<ComponentRef<typeof ToastPrimitive.Action>, ComponentPropsWithoutRef<typeof ToastPrimitive.Action>>(function ToastAction({ className, ...props }, ref) { return <ToastPrimitive.Action ref={ref} className={classes('ink-ui-toast-action', className)} {...props} />; });
export const ToastClose = forwardRef<ComponentRef<typeof ToastPrimitive.Close>, ComponentPropsWithoutRef<typeof ToastPrimitive.Close>>(function ToastClose({ className, ...props }, ref) { return <ToastPrimitive.Close ref={ref} className={classes('ink-ui-toast-close', className)} {...props} />; });
