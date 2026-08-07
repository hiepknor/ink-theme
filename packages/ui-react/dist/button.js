import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
import { useInkDensity } from './ink-provider.js';
export const Button = forwardRef(function Button({ children, className, density: densityOverride, disabled, loading = false, loadingLabel = 'Loading', type = 'button', variant = 'secondary', ...props }, ref) {
    const density = useInkDensity(densityOverride);
    return (_jsxs("button", { ref: ref, type: type, className: classes('ink-ui-button', className), "data-density": density, "data-loading": loading || undefined, "data-variant": variant, disabled: disabled || loading, "aria-busy": loading || undefined, ...props, children: [_jsx("span", { "aria-hidden": loading || undefined, children: children }), loading && _jsx("span", { className: "ink-ui-sr-only", children: loadingLabel })] }));
});
