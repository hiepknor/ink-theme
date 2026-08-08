import * as ToastPrimitive from '@radix-ui/react-toast';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef, type HTMLAttributes, type ReactNode } from 'react';
import { classes } from './shared.js';

export type FeedbackTone = 'neutral' | 'ok' | 'warning' | 'danger';

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

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> { title?: ReactNode; tone?: FeedbackTone; }
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ children, className, title, tone = 'neutral', ...props }, ref) {
  return <div ref={ref} role={tone === 'danger' ? 'alert' : 'status'} className={classes('ink-ui-alert', className)} data-tone={tone} {...props}>{title && <strong className="ink-ui-alert-title">{title}</strong>}<div>{children}</div></div>;
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
