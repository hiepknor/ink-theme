import { type HTMLAttributes } from 'react';
export type SurfaceVariant = 'surface' | 'elevated' | 'recessed';
export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SurfaceVariant;
}
export declare const Surface: import("react").ForwardRefExoticComponent<SurfaceProps & import("react").RefAttributes<HTMLDivElement>>;
