import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { classes, describedBy } from './shared.js';
import { useInkDensity } from './ink-provider.js';
export const TextField = forwardRef(function TextField({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, hideLabel = false, id: idProp, label, ...props }, ref) {
    const generatedId = useId();
    const id = idProp ?? `ink-field-${generatedId}`;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const density = useInkDensity(densityOverride);
    return (_jsxs("div", { className: "ink-ui-field", "data-density": density, children: [_jsx("label", { className: classes('ink-ui-label', hideLabel && 'ink-ui-sr-only'), htmlFor: id, children: label }), description && _jsx("div", { className: "ink-ui-description", id: descriptionId, children: description }), _jsx("input", { ...props, ref: ref, id: id, className: classes('ink-ui-input', className), "aria-describedby": describedBy(ariaDescribedBy, descriptionId, errorId), "aria-invalid": ariaInvalid ?? (error ? true : undefined) }), error && _jsx("div", { className: "ink-ui-error", id: errorId, children: error })] }));
});
