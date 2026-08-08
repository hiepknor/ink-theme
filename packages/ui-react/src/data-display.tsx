import { forwardRef, type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { classes } from './shared.js';

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
