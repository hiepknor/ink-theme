import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from 'react';
import { classes, describedBy } from './shared.js';
import { useInkDensity } from './ink-provider.js';
export const Checkbox = forwardRef(function Checkbox({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, id: idProp, label, ...props }, ref) {
    const generatedId = useId();
    const id = idProp ?? `ink-checkbox-${generatedId}`;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const density = useInkDensity(densityOverride);
    return (_jsxs("div", { className: "ink-ui-check-field", "data-density": density, children: [_jsxs("label", { className: "ink-ui-check-label", htmlFor: id, children: [_jsx("input", { ...props, ref: ref, id: id, type: "checkbox", className: classes('ink-ui-checkbox', className), "aria-describedby": describedBy(ariaDescribedBy, descriptionId, errorId), "aria-invalid": ariaInvalid ?? (error ? true : undefined) }), _jsx("span", { className: "ink-ui-checkbox-control", "aria-hidden": "true" }), _jsx("span", { children: label })] }), description && _jsx("div", { className: "ink-ui-description ink-ui-check-copy", id: descriptionId, children: description }), error && _jsx("div", { className: "ink-ui-error ink-ui-check-copy", id: errorId, children: error })] }));
});
