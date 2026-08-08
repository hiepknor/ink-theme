import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Badge = forwardRef(function Badge({ className, tone = 'neutral', ...props }, ref) {
    return _jsx("span", { ref: ref, className: classes('ink-ui-badge', className), "data-tone": tone, ...props });
});
export const StatusMark = forwardRef(function StatusMark({ className, label, tone = 'neutral', ...props }, ref) {
    return _jsxs("span", { ref: ref, className: classes('ink-ui-status', className), "data-tone": tone, ...props, children: [_jsx("span", { className: "ink-ui-status-glyph", "aria-hidden": "true" }), label] });
});
export const Spinner = forwardRef(function Spinner({ className, label = 'Loading', ...props }, ref) {
    return _jsxs("span", { ref: ref, role: "status", "aria-label": label, className: classes('ink-ui-spinner-wrap', className), ...props, children: [_jsx("span", { className: "ink-ui-spinner", "aria-hidden": "true" }), _jsx("span", { className: "ink-ui-sr-only", children: label })] });
});
export const EmptyState = forwardRef(function EmptyState({ actions, className, description, title, ...props }, ref) {
    return _jsxs("div", { ref: ref, className: classes('ink-ui-empty-state', className), ...props, children: [_jsx("div", { className: "ink-ui-empty-mark", "aria-hidden": "true" }), _jsx("strong", { children: title }), description && _jsx("div", { className: "ink-ui-description", children: description }), actions && _jsx("div", { className: "ink-ui-empty-actions", children: actions })] });
});
