import { forwardRef, type HTMLAttributes } from 'react';
import { classes } from './shared.js';

export type SurfaceVariant = 'surface' | 'elevated' | 'recessed';

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { variant = 'surface', className, ...props },
  ref,
) {
  return <div ref={ref} className={classes('ink-ui-surface', className)} data-variant={variant} {...props} />;
});

export type CardProps = HTMLAttributes<HTMLElement>;
export const Card = forwardRef<HTMLElement, CardProps>(function Card({ className, ...props }, ref) {
  return <article ref={ref} className={classes('ink-ui-card', className)} {...props} />;
});
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={classes('ink-ui-card-header', className)} {...props} />;
});
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function CardTitle({ className, ...props }, ref) {
  return <h3 ref={ref} className={classes('ink-ui-card-title', className)} {...props} />;
});
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={classes('ink-ui-card-description', className)} {...props} />;
});
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={classes('ink-ui-card-content', className)} {...props} />;
});
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={classes('ink-ui-card-footer', className)} {...props} />;
});
