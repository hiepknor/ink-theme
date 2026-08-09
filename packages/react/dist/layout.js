import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Stack = forwardRef(function Stack({ align = 'stretch', gap = 'md', className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-stack', className), "data-align": align, "data-gap": gap, ...props });
});
export const Inline = forwardRef(function Inline({ align = 'center', gap = 'md', justify = 'start', wrap = true, className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-inline', className), "data-align": align, "data-gap": gap, "data-justify": justify, "data-wrap": wrap, ...props });
});
export const Separator = forwardRef(function Separator({ decorative = true, orientation = 'horizontal', className, ...props }, ref) {
    return _jsx("div", { ref: ref, role: decorative ? 'none' : 'separator', "aria-orientation": decorative ? undefined : orientation, className: classes('ink-ui-separator', className), "data-orientation": orientation, ...props });
});
export const VisuallyHidden = forwardRef(function VisuallyHidden({ className, ...props }, ref) {
    return _jsx("span", { ref: ref, className: classes('ink-ui-sr-only', className), ...props });
});
export const layoutGapStyle = (gap) => ({ '--ink-ui-layout-gap': `var(--ink-dimension-spacing-${gap})` });
