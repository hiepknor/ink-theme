import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Component, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { classes } from './shared.js';
function liveRegion(live) {
    if (live === 'assertive')
        return { role: 'alert', 'aria-live': 'assertive' };
    if (live === 'polite')
        return { role: 'status', 'aria-live': 'polite' };
    return {};
}
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
export const Alert = forwardRef(function Alert({ children, className, live = 'off', title, tone = 'neutral', ...props }, ref) {
    return _jsxs("div", { ref: ref, ...liveRegion(live), className: classes('ink-ui-alert', className), "data-tone": tone, ...props, children: [title && _jsx("strong", { className: "ink-ui-alert-title", children: title }), _jsx("div", { children: children })] });
});
export const ErrorMessage = forwardRef(function ErrorMessage({ className, live = 'off', ...props }, ref) {
    return _jsx("div", { ref: ref, ...liveRegion(live), className: classes('ink-ui-error', className), ...props });
});
export const FormErrorSummary = forwardRef(function FormErrorSummary({ className, errors, focusOnMount = false, live = 'assertive', title = 'Review the highlighted fields', ...props }, forwardedRef) {
    const ref = useRef(null);
    useImperativeHandle(forwardedRef, () => ref.current);
    useEffect(() => { if (focusOnMount && errors.length > 0)
        ref.current?.focus(); }, [errors.length, focusOnMount]);
    if (errors.length === 0)
        return null;
    return _jsxs("div", { ref: ref, tabIndex: -1, ...liveRegion(live), className: classes('ink-ui-error-summary', className), ...props, children: [_jsx("strong", { className: "ink-ui-error-summary-title", children: title }), _jsx("ul", { children: errors.map((error) => _jsx("li", { children: _jsxs("a", { href: `#${error.fieldId}`, children: [error.label, ": ", error.message] }) }, error.fieldId)) })] });
});
export const ErrorState = forwardRef(function ErrorState({ actions, className, description, details, live = 'off', title, ...props }, ref) {
    return _jsxs("div", { ref: ref, ...liveRegion(live), className: classes('ink-ui-error-state', className), ...props, children: [_jsx("span", { className: "ink-ui-error-state-mark", "aria-hidden": "true" }), _jsx("strong", { children: title }), description && _jsx("div", { className: "ink-ui-description", children: description }), details && _jsxs("details", { children: [_jsx("summary", { children: "Technical details" }), _jsx("div", { children: details })] }), actions && _jsx("div", { className: "ink-ui-error-state-actions", children: actions })] });
});
export class ErrorBoundary extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error, info) { this.props.onError?.(error, info); }
    componentDidUpdate(previousProps) {
        if (this.state.error && this.props.resetKeys && previousProps.resetKeys && (this.props.resetKeys.length !== previousProps.resetKeys.length || this.props.resetKeys.some((key, index) => !Object.is(key, previousProps.resetKeys?.[index]))))
            this.setState({ error: null });
    }
    reset = () => this.setState({ error: null });
    render() {
        const { error } = this.state;
        if (!error)
            return this.props.children;
        if (typeof this.props.fallback === 'function')
            return this.props.fallback({ error, reset: this.reset });
        if (this.props.fallback !== undefined)
            return this.props.fallback;
        return _jsx(ErrorState, { title: "Something went wrong", description: "This section could not be displayed.", actions: _jsx("button", { type: "button", className: "ink-ui-recovery-action", onClick: this.reset, children: "Try again" }) });
    }
}
export const Banner = forwardRef(function Banner({ actions, children, className, label = 'System notice', live = 'polite', title, tone = 'warning', ...props }, ref) {
    return _jsxs("section", { ref: ref, "aria-label": label, ...liveRegion(live), className: classes('ink-ui-banner', className), "data-tone": tone, ...props, children: [_jsx("span", { className: "ink-ui-banner-mark", "aria-hidden": "true" }), _jsxs("div", { className: "ink-ui-banner-copy", children: [_jsx("strong", { children: title }), children && _jsx("div", { children: children })] }), actions && _jsx("div", { className: "ink-ui-banner-actions", children: actions })] });
});
export const Progress = forwardRef(function Progress({ className, label, max = 100, value, ...props }, ref) {
    const safeMax = Math.max(1, max);
    const bounded = value === undefined ? undefined : Math.min(safeMax, Math.max(0, value));
    return _jsxs("div", { ref: ref, className: classes('ink-ui-progress-wrap', className), ...props, children: [_jsxs("div", { className: "ink-ui-progress-copy", children: [_jsx("span", { children: label }), _jsx("span", { children: bounded === undefined ? 'In progress' : `${Math.round((bounded / safeMax) * 100)}%` })] }), _jsx("div", { className: "ink-ui-progress", role: "progressbar", "aria-label": label, "aria-valuemin": 0, "aria-valuemax": safeMax, "aria-valuenow": bounded, children: _jsx("span", { style: { width: bounded === undefined ? undefined : `${(bounded / safeMax) * 100}%` } }) })] });
});
export const Skeleton = forwardRef(function Skeleton({ className, label = 'Loading content', ...props }, ref) {
    return _jsx("div", { ref: ref, role: "status", "aria-label": label, className: classes('ink-ui-skeleton', className), ...props });
});
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = forwardRef(function ToastViewport({ className, ...props }, ref) { return _jsx(ToastPrimitive.Viewport, { ref: ref, className: classes('ink-ui-toast-viewport', className), ...props }); });
export const Toast = forwardRef(function Toast({ className, tone = 'neutral', ...props }, ref) { return _jsx(ToastPrimitive.Root, { ref: ref, className: classes('ink-ui-toast', className), "data-tone": tone, ...props }); });
export const ToastTitle = forwardRef(function ToastTitle({ className, ...props }, ref) { return _jsx(ToastPrimitive.Title, { ref: ref, className: classes('ink-ui-toast-title', className), ...props }); });
export const ToastDescription = forwardRef(function ToastDescription({ className, ...props }, ref) { return _jsx(ToastPrimitive.Description, { ref: ref, className: classes('ink-ui-description', className), ...props }); });
export const ToastAction = forwardRef(function ToastAction({ className, ...props }, ref) { return _jsx(ToastPrimitive.Action, { ref: ref, className: classes('ink-ui-toast-action', className), ...props }); });
export const ToastClose = forwardRef(function ToastClose({ className, ...props }, ref) { return _jsx(ToastPrimitive.Close, { ref: ref, className: classes('ink-ui-toast-close', className), ...props }); });
