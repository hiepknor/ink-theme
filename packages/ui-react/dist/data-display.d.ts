import { type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
export declare const TableHeader: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableRow: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & import("react").RefAttributes<HTMLTableRowElement>>;
export declare const TableHead: import("react").ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableCell: import("react").ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableCaption: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableCaptionElement> & import("react").RefAttributes<HTMLTableCaptionElement>>;
