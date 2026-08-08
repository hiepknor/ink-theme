import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
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
