import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classes } from './shared.js';
import { Select } from './forms.js';
import { Alert, ErrorState } from './feedback.js';
export const Table = forwardRef(function Table({ className, ...props }, ref) {
    return _jsx("div", { className: "ink-ui-table-scroll", children: _jsx("table", { ref: ref, className: classes('ink-ui-table', className), ...props }) });
});
export const TableHeader = forwardRef(function TableHeader(props, ref) { return _jsx("thead", { ref: ref, ...props }); });
export const TableBody = forwardRef(function TableBody(props, ref) { return _jsx("tbody", { ref: ref, ...props }); });
export const TableRow = forwardRef(function TableRow({ className, ...props }, ref) { return _jsx("tr", { ref: ref, className: classes('ink-ui-table-row', className), ...props }); });
export const TableHead = forwardRef(function TableHead({ className, ...props }, ref) { return _jsx("th", { ref: ref, className: classes('ink-ui-table-head', className), ...props }); });
export const TableCell = forwardRef(function TableCell({ className, ...props }, ref) { return _jsx("td", { ref: ref, className: classes('ink-ui-table-cell', className), ...props }); });
export const TableCaption = forwardRef(function TableCaption({ className, ...props }, ref) { return _jsx("caption", { ref: ref, className: classes('ink-ui-table-caption', className), ...props }); });
function SelectionControl({ checked, indeterminate, label, onChange }) {
    return _jsxs("label", { className: "ink-ui-table-check", children: [_jsx("input", { type: "checkbox", checked: checked, ref: (node) => { if (node)
                    node.indeterminate = Boolean(indeterminate); }, "aria-label": label, onChange: onChange }), _jsx("span", { "aria-hidden": "true" })] });
}
export function DataTable({ caption, className, columns, empty = 'No results', error, errorActions, errorLive = 'polite', errorMode = 'replace', errorTitle = 'Unable to load data', getRowId, loading = false, loadingLabel = 'Loading data', onSelectionChange, onSortChange, pagination, rows, selectedRowIds = [], sort, toolbar, ...props }) {
    const selectable = Boolean(onSelectionChange);
    const rowIds = rows.map(getRowId);
    const selected = new Set(selectedRowIds);
    const selectedVisible = rowIds.filter((id) => selected.has(id));
    const allSelected = rowIds.length > 0 && selectedVisible.length === rowIds.length;
    function toggleAll(checked) {
        const next = new Set(selectedRowIds);
        rowIds.forEach((id) => checked ? next.add(id) : next.delete(id));
        onSelectionChange?.(Array.from(next));
    }
    function toggleRow(id, checked) {
        const next = new Set(selectedRowIds);
        checked ? next.add(id) : next.delete(id);
        onSelectionChange?.(Array.from(next));
    }
    const replaceError = error !== undefined && (errorMode === 'replace' || rows.length === 0);
    const stateContent = replaceError ? _jsx(ErrorState, { title: errorTitle, description: error, actions: errorActions, live: errorLive }) : (loading ? loadingLabel : (rows.length === 0 ? empty : undefined));
    return _jsxs("div", { className: classes('ink-ui-data-table', className), "aria-busy": loading || undefined, ...props, children: [toolbar, error !== undefined && !replaceError && _jsxs(Alert, { tone: "danger", live: errorLive, title: errorTitle, children: [error, _jsx("div", { className: "ink-ui-alert-actions", children: errorActions })] }), _jsxs(Table, { children: [_jsx(TableCaption, { children: caption }), _jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectable && _jsx(TableHead, { className: "ink-ui-table-select", scope: "col", children: _jsx(SelectionControl, { checked: allSelected, indeterminate: !allSelected && selectedVisible.length > 0, label: "Select all rows", onChange: (event) => toggleAll(event.currentTarget.checked) }) }), columns.map((column) => {
                                    const active = sort?.columnId === column.id;
                                    return _jsx(TableHead, { scope: "col", "aria-sort": active ? sort.direction : column.sortable ? 'none' : undefined, "data-align": column.align, children: column.sortable ? _jsxs("button", { type: "button", className: "ink-ui-table-sort", onClick: () => onSortChange?.({ columnId: column.id, direction: active && sort.direction === 'ascending' ? 'descending' : 'ascending' }), children: [column.header, _jsx("span", { "aria-hidden": "true", children: active ? (sort.direction === 'ascending' ? '↑' : '↓') : '↕' })] }) : column.header }, column.id);
                                })] }) }), _jsx(TableBody, { children: stateContent !== undefined ? _jsx(TableRow, { children: _jsxs(TableCell, { className: "ink-ui-table-state", colSpan: columns.length + (selectable ? 1 : 0), children: [loading && _jsx("span", { className: "ink-ui-spinner", "aria-hidden": "true" }), stateContent] }) }) : rows.map((row) => {
                            const id = getRowId(row);
                            return _jsxs(TableRow, { "data-selected": selected.has(id) || undefined, children: [selectable && _jsx(TableCell, { className: "ink-ui-table-select", children: _jsx(SelectionControl, { checked: selected.has(id), label: `Select row ${id}`, onChange: (event) => toggleRow(id, event.currentTarget.checked) }) }), columns.map((column) => _jsx(TableCell, { "data-align": column.align, children: column.cell(row) }, column.id))] }, id);
                        }) })] }), pagination && _jsxs("div", { className: "ink-ui-data-pagination", children: [_jsx("span", { className: "ink-ui-description", children: pagination.totalLabel }), _jsxs("span", { children: ["Page ", pagination.page, " of ", Math.max(1, pagination.pageCount)] }), _jsxs("div", { className: "ink-ui-data-pagination-actions", children: [_jsx("button", { type: "button", className: "ink-ui-media-action", disabled: pagination.page <= 1, onClick: () => pagination.onPageChange(pagination.page - 1), children: "Previous" }), _jsx("button", { type: "button", className: "ink-ui-media-action", disabled: pagination.page >= pagination.pageCount, onClick: () => pagination.onPageChange(pagination.page + 1), children: "Next" })] })] })] });
}
export const DataTableToolbar = forwardRef(function DataTableToolbar({ actions, className, filters, onSearchChange, searchLabel = 'Search table', searchPlaceholder = 'Search', searchValue, ...props }, ref) {
    return _jsxs("div", { ref: ref, className: classes('ink-ui-data-toolbar', className), ...props, children: [_jsxs("label", { className: "ink-ui-data-search", children: [_jsx("span", { className: "ink-ui-sr-only", children: searchLabel }), _jsx("span", { "aria-hidden": "true", children: "\u2315" }), _jsx("input", { type: "search", value: searchValue, placeholder: searchPlaceholder, "aria-label": searchLabel, onChange: (event) => onSearchChange?.(event.currentTarget.value) })] }), filters && _jsx("div", { className: "ink-ui-data-filters", "aria-label": "Table filters", children: filters }), actions && _jsx("div", { className: "ink-ui-data-actions", children: actions })] });
});
export function DataTableFilter({ label, onValueChange, options, placeholder, value }) {
    return _jsx("div", { className: "ink-ui-data-filter", children: _jsx(Select, { className: "ink-ui-data-filter-trigger", density: "compact", label: label, options: options, ...(onValueChange ? { onValueChange } : {}), ...(placeholder ? { placeholder } : {}), ...(value !== undefined ? { value } : {}) }) });
}
export const FilterChip = forwardRef(function FilterChip({ className, label, onRemove, removeLabel = 'Remove filter', ...props }, ref) {
    return _jsxs("span", { ref: ref, className: classes('ink-ui-filter-chip', className), ...props, children: [label, onRemove && _jsx("button", { type: "button", "aria-label": removeLabel, onClick: onRemove, children: "\u00D7" })] });
});
