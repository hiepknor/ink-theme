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
