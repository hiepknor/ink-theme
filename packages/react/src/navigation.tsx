import { Children, forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { classes } from './shared.js';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> { label?: string; separator?: ReactNode; }
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { children, className, label = 'Breadcrumb', separator = '/', ...props }, ref,
) {
  const items = Children.toArray(children);
  return <nav ref={ref} aria-label={label} className={classes('ink-ui-breadcrumb', className)} {...props}><ol>{items.map((item, index) => <li key={index}>{index > 0 && <span className="ink-ui-breadcrumb-separator" aria-hidden="true">{separator}</span>}{item}</li>)}</ol></nav>;
});

export type BreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function BreadcrumbLink({ className, ...props }, ref) {
  return <a ref={ref} className={classes('ink-ui-breadcrumb-link', className)} {...props} />;
});

export interface PaginationProps extends HTMLAttributes<HTMLElement> { label?: string; }
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination({ className, label = 'Pagination', ...props }, ref) {
  return <nav ref={ref} aria-label={label} className={classes('ink-ui-pagination', className)} {...props} />;
});

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { current?: boolean; }
export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationLink({ className, current, ...props }, ref) {
  return <a ref={ref} className={classes('ink-ui-pagination-item ink-ui-pagination-link', className)} aria-current={current ? 'page' : undefined} data-current={current || undefined} {...props} />;
});

export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { current?: boolean; }
export const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(function PaginationButton({ className, current, type = 'button', ...props }, ref) {
  return <button ref={ref} type={type} className={classes('ink-ui-pagination-item ink-ui-pagination-button', className)} aria-current={current ? 'page' : undefined} data-current={current || undefined} {...props} />;
});

export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;
export const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(function PaginationEllipsis({ className, children = '…', ...props }, ref) {
  return <span ref={ref} className={classes('ink-ui-pagination-ellipsis', className)} aria-hidden="true" {...props}>{children}</span>;
});

export type PaginationStatusProps = HTMLAttributes<HTMLSpanElement>;
export const PaginationStatus = forwardRef<HTMLSpanElement, PaginationStatusProps>(function PaginationStatus({ className, ...props }, ref) {
  return <span ref={ref} className={classes('ink-ui-pagination-status', className)} {...props} />;
});
