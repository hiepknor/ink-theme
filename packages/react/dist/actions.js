import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
import { InkProvider, useInkDensity } from './ink-provider.js';
export const IconButton = forwardRef(function IconButton({ className, density: densityOverride, label, type = 'button', variant = 'secondary', ...props }, ref) {
    const density = useInkDensity(densityOverride);
    return _jsx("button", { ref: ref, type: type, "aria-label": label, className: classes('ink-ui-icon-button', className), "data-density": density, "data-variant": variant, ...props });
});
export const ButtonGroup = forwardRef(function ButtonGroup({ children, className, density: densityOverride, label, ...props }, ref) {
    const density = useInkDensity(densityOverride);
    return (_jsx(InkProvider, { density: density, children: _jsx("div", { ref: ref, role: "group", "aria-label": label, className: classes('ink-ui-button-group', className), "data-density": density, ...props, children: children }) }));
});
