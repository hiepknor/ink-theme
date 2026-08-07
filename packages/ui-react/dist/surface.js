import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Surface = forwardRef(function Surface({ variant = 'surface', className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-surface', className), "data-variant": variant, ...props });
});
