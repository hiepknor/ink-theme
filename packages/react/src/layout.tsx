import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { classes } from './shared.js';

export type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  align?: LayoutAlign;
  gap?: LayoutGap;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { align = 'stretch', gap = 'md', className, ...props }, ref,
) {
  return <div ref={ref} className={classes('ink-ui-stack', className)} data-align={align} data-gap={gap} {...props} />;
});

export interface InlineProps extends StackProps {
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { align = 'center', gap = 'md', justify = 'start', wrap = true, className, ...props }, ref,
) {
  return <div ref={ref} className={classes('ink-ui-inline', className)} data-align={align} data-gap={gap} data-justify={justify} data-wrap={wrap} {...props} />;
});

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { decorative = true, orientation = 'horizontal', className, ...props }, ref,
) {
  return <div ref={ref} role={decorative ? 'none' : 'separator'} aria-orientation={decorative ? undefined : orientation} className={classes('ink-ui-separator', className)} data-orientation={orientation} {...props} />;
});

export const VisuallyHidden = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function VisuallyHidden(
  { className, ...props }, ref,
) {
  return <span ref={ref} className={classes('ink-ui-sr-only', className)} {...props} />;
});

export const layoutGapStyle = (gap: LayoutGap): CSSProperties => ({ '--ink-ui-layout-gap': `var(--ink-dimension-spacing-${gap})` } as CSSProperties);
