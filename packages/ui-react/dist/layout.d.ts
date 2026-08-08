import { type CSSProperties, type HTMLAttributes } from 'react';
export type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch';
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    align?: LayoutAlign;
    gap?: LayoutGap;
}
export declare const Stack: import("react").ForwardRefExoticComponent<StackProps & import("react").RefAttributes<HTMLDivElement>>;
export interface InlineProps extends StackProps {
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
}
export declare const Inline: import("react").ForwardRefExoticComponent<InlineProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    decorative?: boolean;
    orientation?: 'horizontal' | 'vertical';
}
export declare const Separator: import("react").ForwardRefExoticComponent<SeparatorProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const VisuallyHidden: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
export declare const layoutGapStyle: (gap: LayoutGap) => CSSProperties;
