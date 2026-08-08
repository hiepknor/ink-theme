import { type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
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
