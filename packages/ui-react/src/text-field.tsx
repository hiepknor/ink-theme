import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { classes, describedBy, type InkDensity } from './shared.js';
import { useInkDensity } from './ink-provider.js';
import { ErrorMessage, type FeedbackLive } from './feedback.js';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  density?: InkDensity;
  description?: ReactNode;
  error?: ReactNode;
  errorLive?: FeedbackLive;
  hideLabel?: boolean;
  label: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    className,
    density: densityOverride,
    description,
    error,
    errorLive = 'off',
    hideLabel = false,
    id: idProp,
    label,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? `ink-field-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const density = useInkDensity(densityOverride);

  return (
    <div className="ink-ui-field" data-density={density}>
      <label className={classes('ink-ui-label', hideLabel && 'ink-ui-sr-only')} htmlFor={id}>{label}</label>
      <input
        {...props}
        ref={ref}
        id={id}
        className={classes('ink-ui-input', className)}
        aria-describedby={describedBy(ariaDescribedBy, descriptionId, errorId)}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
      />
      {description && <div className="ink-ui-description" id={descriptionId}>{description}</div>}
      {error && <ErrorMessage id={errorId} live={errorLive}>{error}</ErrorMessage>}
    </div>
  );
});
