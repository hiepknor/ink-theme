import { type HTMLAttributes, type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { type SelectOption } from './forms.js';
import { type FeedbackLive } from './feedback.js';
export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
export declare const TableHeader: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableRow: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & import("react").RefAttributes<HTMLTableRowElement>>;
export declare const TableHead: import("react").ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableCell: import("react").ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableCaption: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableCaptionElement> & import("react").RefAttributes<HTMLTableCaptionElement>>;
export type DataTableSortDirection = 'ascending' | 'descending';
export interface DataTableSort {
    columnId: string;
    direction: DataTableSortDirection;
}
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
export declare function DataTable<Row>({ caption, className, columns, empty, error, errorActions, errorLive, errorMode, errorTitle, getRowId, loading, loadingLabel, onSelectionChange, onSortChange, pagination, rows, selectedRowIds, sort, toolbar, ...props }: DataTableProps<Row>): import("react").JSX.Element;
export interface DataTableToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    actions?: ReactNode;
    filters?: ReactNode;
    onSearchChange?: (value: string) => void;
    searchLabel?: string;
    searchPlaceholder?: string;
    searchValue?: string;
}
export declare const DataTableToolbar: import("react").ForwardRefExoticComponent<DataTableToolbarProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DataTableFilterProps {
    label: ReactNode;
    onValueChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: ReactNode;
    value?: string;
}
export declare function DataTableFilter({ label, onValueChange, options, placeholder, value }: DataTableFilterProps): import("react").JSX.Element;
export interface FilterChipProps extends HTMLAttributes<HTMLSpanElement> {
    label: ReactNode;
    onRemove?: () => void;
    removeLabel?: string;
}
export declare const FilterChip: import("react").ForwardRefExoticComponent<FilterChipProps & import("react").RefAttributes<HTMLSpanElement>>;
