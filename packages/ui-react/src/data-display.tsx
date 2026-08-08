import { forwardRef, type ChangeEvent, type HTMLAttributes, type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { classes } from './shared.js';
import { Select, type SelectOption } from './forms.js';
import { Alert, ErrorState, type FeedbackLive } from './feedback.js';
import { Pagination, PaginationButton, PaginationEllipsis, PaginationStatus } from './navigation.js';

export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ className, ...props }, ref) {
  return <div className="ink-ui-table-scroll"><table ref={ref} className={classes('ink-ui-table', className)} {...props} /></div>;
});
export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHeader(props, ref) { return <thead ref={ref} {...props} />; });
export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody(props, ref) { return <tbody ref={ref} {...props} />; });
export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow({ className, ...props }, ref) { return <tr ref={ref} className={classes('ink-ui-table-row', className)} {...props} />; });
export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHead({ className, ...props }, ref) { return <th ref={ref} className={classes('ink-ui-table-head', className)} {...props} />; });
export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell({ className, ...props }, ref) { return <td ref={ref} className={classes('ink-ui-table-cell', className)} {...props} />; });
export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(function TableCaption({ className, ...props }, ref) { return <caption ref={ref} className={classes('ink-ui-table-caption', className)} {...props} />; });

export type DataTableSortDirection = 'ascending' | 'descending';
export interface DataTableSort { columnId: string; direction: DataTableSortDirection; }
export interface DataTableColumn<Row> {
  align?: 'start' | 'center' | 'end';
  cell: (row: Row) => ReactNode;
  header: ReactNode;
  id: string;
  sortable?: boolean;
}
export interface DataTablePagination {
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
  totalLabel?: ReactNode;
}
export interface DataTableProps<Row> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  caption: ReactNode;
  columns: DataTableColumn<Row>[];
  empty?: ReactNode;
  error?: ReactNode;
  errorActions?: ReactNode;
  errorLive?: FeedbackLive;
  errorMode?: 'replace' | 'stale';
  errorTitle?: ReactNode;
  getRowId: (row: Row) => string;
  loading?: boolean;
  loadingLabel?: ReactNode;
  onSelectionChange?: (selectedIds: string[]) => void;
  onSortChange?: (sort: DataTableSort) => void;
  pagination?: DataTablePagination;
  rows: Row[];
  selectedRowIds?: string[];
  sort?: DataTableSort;
  toolbar?: ReactNode;
}

function SelectionControl({ checked, indeterminate, label, onChange }: { checked: boolean; indeterminate?: boolean; label: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <label className="ink-ui-table-check"><input type="checkbox" checked={checked} ref={(node) => { if (node) node.indeterminate = Boolean(indeterminate); }} aria-label={label} onChange={onChange} /><span aria-hidden="true" /></label>;
}

function paginationItems(page: number, pageCount: number): Array<number | 'ellipsis-start' | 'ellipsis-end'> {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  const visible = Array.from(pages).filter((item) => item >= 1 && item <= pageCount).sort((a, b) => a - b);
  const result: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [];
  visible.forEach((item, index) => {
    const previous = visible[index - 1];
    if (previous !== undefined && item - previous > 1) result.push(previous === 1 ? 'ellipsis-start' : 'ellipsis-end');
    result.push(item);
  });
  return result;
}

export function DataTable<Row>({ caption, className, columns, empty = 'No results', error, errorActions, errorLive = 'polite', errorMode = 'replace', errorTitle = 'Unable to load data', getRowId, loading = false, loadingLabel = 'Loading data', onSelectionChange, onSortChange, pagination, rows, selectedRowIds = [], sort, toolbar, ...props }: DataTableProps<Row>) {
  const selectable = Boolean(onSelectionChange);
  const rowIds = rows.map(getRowId);
  const selected = new Set(selectedRowIds);
  const selectedVisible = rowIds.filter((id) => selected.has(id));
  const allSelected = rowIds.length > 0 && selectedVisible.length === rowIds.length;
  function toggleAll(checked: boolean) {
    const next = new Set(selectedRowIds);
    rowIds.forEach((id) => checked ? next.add(id) : next.delete(id));
    onSelectionChange?.(Array.from(next));
  }
  function toggleRow(id: string, checked: boolean) {
    const next = new Set(selectedRowIds);
    checked ? next.add(id) : next.delete(id);
    onSelectionChange?.(Array.from(next));
  }
  const replaceError = error !== undefined && (errorMode === 'replace' || rows.length === 0);
  const stateContent = replaceError ? <ErrorState title={errorTitle} description={error} actions={errorActions} live={errorLive} /> : (loading ? loadingLabel : (rows.length === 0 ? empty : undefined));
  const pageCount = Math.max(1, pagination?.pageCount ?? 1);
  const currentPage = Math.min(pageCount, Math.max(1, pagination?.page ?? 1));
  return <div className={classes('ink-ui-data-table', className)} aria-busy={loading || undefined} {...props}>{toolbar}{error !== undefined && !replaceError && <Alert tone="danger" live={errorLive} title={errorTitle}>{error}<div className="ink-ui-alert-actions">{errorActions}</div></Alert>}<Table><TableCaption>{caption}</TableCaption><TableHeader><TableRow>{selectable && <TableHead className="ink-ui-table-select" scope="col"><SelectionControl checked={allSelected} indeterminate={!allSelected && selectedVisible.length > 0} label="Select all rows" onChange={(event) => toggleAll(event.currentTarget.checked)} /></TableHead>}{columns.map((column) => {
    const active = sort?.columnId === column.id;
    return <TableHead key={column.id} scope="col" aria-sort={active ? sort.direction : column.sortable ? 'none' : undefined} data-align={column.align}>{column.sortable ? <button type="button" className="ink-ui-table-sort" onClick={() => onSortChange?.({ columnId: column.id, direction: active && sort.direction === 'ascending' ? 'descending' : 'ascending' })}>{column.header}<span aria-hidden="true">{active ? (sort.direction === 'ascending' ? '↑' : '↓') : '↕'}</span></button> : column.header}</TableHead>;
  })}</TableRow></TableHeader><TableBody>{stateContent !== undefined ? <TableRow><TableCell className="ink-ui-table-state" colSpan={columns.length + (selectable ? 1 : 0)}>{loading && <span className="ink-ui-spinner" aria-hidden="true" />}{stateContent}</TableCell></TableRow> : rows.map((row) => {
    const id = getRowId(row);
    return <TableRow key={id} data-selected={selected.has(id) || undefined}>{selectable && <TableCell className="ink-ui-table-select"><SelectionControl checked={selected.has(id)} label={`Select row ${id}`} onChange={(event) => toggleRow(id, event.currentTarget.checked)} /></TableCell>}{columns.map((column) => <TableCell key={column.id} data-align={column.align}>{column.cell(row)}</TableCell>)}</TableRow>;
  })}</TableBody></Table>{pagination && <div className="ink-ui-data-pagination"><span className="ink-ui-description">{pagination.totalLabel}</span><PaginationStatus aria-live="polite">Page {currentPage} of {pageCount}</PaginationStatus><Pagination label="Table pagination"><PaginationButton aria-label="Previous page" disabled={currentPage <= 1} onClick={() => pagination.onPageChange(currentPage - 1)}>←</PaginationButton>{paginationItems(currentPage, pageCount).map((item) => typeof item === 'number' ? <PaginationButton key={item} current={item === currentPage} aria-label={item === currentPage ? `Page ${item}` : `Go to page ${item}`} onClick={() => pagination.onPageChange(item)}>{item}</PaginationButton> : <PaginationEllipsis key={item} />)}<PaginationButton aria-label="Next page" disabled={currentPage >= pageCount} onClick={() => pagination.onPageChange(currentPage + 1)}>→</PaginationButton></Pagination></div>}</div>;
}

export interface DataTableToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  actions?: ReactNode;
  filters?: ReactNode;
  onSearchChange?: (value: string) => void;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
}
export const DataTableToolbar = forwardRef<HTMLDivElement, DataTableToolbarProps>(function DataTableToolbar({ actions, className, filters, onSearchChange, searchLabel = 'Search table', searchPlaceholder = 'Search', searchValue, ...props }, ref) {
  return <div ref={ref} className={classes('ink-ui-data-toolbar', className)} {...props}><label className="ink-ui-data-search"><span className="ink-ui-sr-only">{searchLabel}</span><span aria-hidden="true">⌕</span><input type="search" value={searchValue} placeholder={searchPlaceholder} aria-label={searchLabel} onChange={(event) => onSearchChange?.(event.currentTarget.value)} /></label>{filters && <div className="ink-ui-data-filters" aria-label="Table filters">{filters}</div>}{actions && <div className="ink-ui-data-actions">{actions}</div>}</div>;
});

export interface DataTableFilterProps {
  label: ReactNode;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: ReactNode;
  value?: string;
}
export function DataTableFilter({ label, onValueChange, options, placeholder, value }: DataTableFilterProps) {
  return <div className="ink-ui-data-filter"><Select className="ink-ui-data-filter-trigger" density="compact" label={label} options={options} {...(onValueChange ? { onValueChange } : {})} {...(placeholder ? { placeholder } : {})} {...(value !== undefined ? { value } : {})} /></div>;
}

export interface FilterChipProps extends HTMLAttributes<HTMLSpanElement> { label: ReactNode; onRemove?: () => void; removeLabel?: string; }
export const FilterChip = forwardRef<HTMLSpanElement, FilterChipProps>(function FilterChip({ className, label, onRemove, removeLabel = 'Remove filter', ...props }, ref) {
  return <span ref={ref} className={classes('ink-ui-filter-chip', className)} {...props}>{label}{onRemove && <button type="button" aria-label={removeLabel} onClick={onRemove}>×</button>}</span>;
});
