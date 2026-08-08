import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Table = forwardRef(function Table({ className, ...props }, ref) {
    return _jsx("div", { className: "ink-ui-table-scroll", children: _jsx("table", { ref: ref, className: classes('ink-ui-table', className), ...props }) });
});
export const TableHeader = forwardRef(function TableHeader(props, ref) { return _jsx("thead", { ref: ref, ...props }); });
export const TableBody = forwardRef(function TableBody(props, ref) { return _jsx("tbody", { ref: ref, ...props }); });
export const TableRow = forwardRef(function TableRow({ className, ...props }, ref) { return _jsx("tr", { ref: ref, className: classes('ink-ui-table-row', className), ...props }); });
export const TableHead = forwardRef(function TableHead({ className, ...props }, ref) { return _jsx("th", { ref: ref, className: classes('ink-ui-table-head', className), ...props }); });
export const TableCell = forwardRef(function TableCell({ className, ...props }, ref) { return _jsx("td", { ref: ref, className: classes('ink-ui-table-cell', className), ...props }); });
export const TableCaption = forwardRef(function TableCaption({ className, ...props }, ref) { return _jsx("caption", { ref: ref, className: classes('ink-ui-table-caption', className), ...props }); });
