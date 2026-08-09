import { type PropsWithChildren } from 'react';
import type { InkDensity } from './shared.js';
export interface InkProviderProps extends PropsWithChildren {
    density?: InkDensity;
}
export declare function InkProvider({ density, children }: InkProviderProps): import("react").JSX.Element;
export declare function useInkDensity(override?: InkDensity): InkDensity;
