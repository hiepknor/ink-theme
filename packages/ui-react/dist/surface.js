import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Surface = forwardRef(function Surface({ variant = 'surface', className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-surface', className), "data-variant": variant, ...props });
});
export const Card = forwardRef(function Card({ className, ...props }, ref) {
    return _jsx("article", { ref: ref, className: classes('ink-ui-card', className), ...props });
});
export const CardHeader = forwardRef(function CardHeader({ className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-card-header', className), ...props });
});
export const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
    return _jsx("h3", { ref: ref, className: classes('ink-ui-card-title', className), ...props });
});
export const CardDescription = forwardRef(function CardDescription({ className, ...props }, ref) {
    return _jsx("p", { ref: ref, className: classes('ink-ui-card-description', className), ...props });
});
export const CardContent = forwardRef(function CardContent({ className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-card-content', className), ...props });
});
export const CardFooter = forwardRef(function CardFooter({ className, ...props }, ref) {
    return _jsx("div", { ref: ref, className: classes('ink-ui-card-footer', className), ...props });
});
