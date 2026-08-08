import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { classes, describedBy, type InkDensity } from './shared.js';
import { useInkDensity } from './ink-provider.js';
import { ErrorMessage, type FeedbackLive } from './feedback.js';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  density?: InkDensity;
  description?: ReactNode;
  error?: ReactNode;
  errorLive?: FeedbackLive;
  label: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    className,
    density: densityOverride,
    description,
    error,
    errorLive = 'off',
    id: idProp,
    label,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? `ink-checkbox-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const density = useInkDensity(densityOverride);

  return (
    <div className="ink-ui-check-field" data-density={density}>
      <label className="ink-ui-check-label" htmlFor={id}>
        <input
          {...props}
          ref={ref}
          id={id}
          type="checkbox"
          className={classes('ink-ui-checkbox', className)}
          aria-describedby={describedBy(ariaDescribedBy, descriptionId, errorId)}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        />
        <span className="ink-ui-checkbox-control" aria-hidden="true" />
        <span>{label}</span>
      </label>
      {description && <div className="ink-ui-description ink-ui-check-copy" id={descriptionId}>{description}</div>}
      {error && <ErrorMessage className="ink-ui-check-copy" id={errorId} live={errorLive}>{error}</ErrorMessage>}
    </div>
  );
});
