import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from 'react';
import { classes, type InkDensity } from './shared.js';
import { InkProvider, useInkDensity } from './ink-provider.js';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  density?: InkDensity;
  label: string;
  variant?: 'primary' | 'secondary' | 'quiet';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, density: densityOverride, label, type = 'button', variant = 'secondary', ...props }, ref,
) {
  const density = useInkDensity(densityOverride);
  return <button ref={ref} type={type} aria-label={label} className={classes('ink-ui-icon-button', className)} data-density={density} data-variant={variant} {...props} />;
});

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  density?: InkDensity;
  label: string;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { children, className, density: densityOverride, label, ...props }, ref,
) {
  const density = useInkDensity(densityOverride);
  return (
    <InkProvider density={density}>
      <div ref={ref} role="group" aria-label={label} className={classes('ink-ui-button-group', className)} data-density={density} {...props}>{children}</div>
    </InkProvider>
  );
});
