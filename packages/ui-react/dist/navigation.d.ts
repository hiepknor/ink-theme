import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    label?: string;
    separator?: ReactNode;
}
export declare const Breadcrumb: import("react").ForwardRefExoticComponent<BreadcrumbProps & import("react").RefAttributes<HTMLElement>>;
export type BreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export declare const BreadcrumbLink: import("react").ForwardRefExoticComponent<BreadcrumbLinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    label?: string;
}
export declare const Pagination: import("react").ForwardRefExoticComponent<PaginationProps & import("react").RefAttributes<HTMLElement>>;
export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    current?: boolean;
}
export declare const PaginationLink: import("react").ForwardRefExoticComponent<PaginationLinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    current?: boolean;
}
export declare const PaginationButton: import("react").ForwardRefExoticComponent<PaginationButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;
export declare const PaginationEllipsis: import("react").ForwardRefExoticComponent<PaginationEllipsisProps & import("react").RefAttributes<HTMLSpanElement>>;
export type PaginationStatusProps = HTMLAttributes<HTMLSpanElement>;
export declare const PaginationStatus: import("react").ForwardRefExoticComponent<PaginationStatusProps & import("react").RefAttributes<HTMLSpanElement>>;
