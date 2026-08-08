import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { classes, type InkDensity } from './shared.js';
import { useInkDensity } from './ink-provider.js';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  density?: InkDensity;
  loading?: boolean;
  loadingLabel?: string;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    density: densityOverride,
    disabled,
    loading = false,
    loadingLabel = 'Loading',
    type = 'button',
    variant = 'secondary',
    ...props
  },
  ref,
) {
  const density = useInkDensity(densityOverride);
  return (
    <button
      ref={ref}
      type={type}
      className={classes('ink-ui-button', className)}
      data-density={density}
      data-loading={loading || undefined}
      data-variant={variant}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="ink-ui-button-content" aria-hidden={loading || undefined}>{children}</span>
      {loading && <span className="ink-ui-button-spinner" aria-hidden="true" />}
      {loading && <span className="ink-ui-sr-only">{loadingLabel}</span>}
    </button>
  );
});
