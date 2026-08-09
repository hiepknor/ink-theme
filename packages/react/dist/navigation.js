import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, forwardRef } from 'react';
import { classes } from './shared.js';
export const Breadcrumb = forwardRef(function Breadcrumb({ children, className, label = 'Breadcrumb', separator = '/', ...props }, ref) {
    const items = Children.toArray(children);
    return _jsx("nav", { ref: ref, "aria-label": label, className: classes('ink-ui-breadcrumb', className), ...props, children: _jsx("ol", { children: items.map((item, index) => _jsxs("li", { children: [index > 0 && _jsx("span", { className: "ink-ui-breadcrumb-separator", "aria-hidden": "true", children: separator }), item] }, index)) }) });
});
export const BreadcrumbLink = forwardRef(function BreadcrumbLink({ className, ...props }, ref) {
    return _jsx("a", { ref: ref, className: classes('ink-ui-breadcrumb-link', className), ...props });
});
export const Pagination = forwardRef(function Pagination({ className, label = 'Pagination', ...props }, ref) {
    return _jsx("nav", { ref: ref, "aria-label": label, className: classes('ink-ui-pagination', className), ...props });
});
export const PaginationLink = forwardRef(function PaginationLink({ className, current, ...props }, ref) {
    return _jsx("a", { ref: ref, className: classes('ink-ui-pagination-item ink-ui-pagination-link', className), "aria-current": current ? 'page' : undefined, "data-current": current || undefined, ...props });
});
export const PaginationButton = forwardRef(function PaginationButton({ className, current, type = 'button', ...props }, ref) {
    return _jsx("button", { ref: ref, type: type, className: classes('ink-ui-pagination-item ink-ui-pagination-button', className), "aria-current": current ? 'page' : undefined, "data-current": current || undefined, ...props });
});
export const PaginationEllipsis = forwardRef(function PaginationEllipsis({ className, children = '…', ...props }, ref) {
    return _jsx("span", { ref: ref, className: classes('ink-ui-pagination-ellipsis', className), "aria-hidden": "true", ...props, children: children });
});
export const PaginationStatus = forwardRef(function PaginationStatus({ className, ...props }, ref) {
    return _jsx("span", { ref: ref, className: classes('ink-ui-pagination-status', className), ...props });
});
