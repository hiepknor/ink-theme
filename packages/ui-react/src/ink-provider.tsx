import { createContext, useContext, type PropsWithChildren } from 'react';
import type { InkDensity } from './shared.js';

const DensityContext = createContext<InkDensity>('default');

export interface InkProviderProps extends PropsWithChildren {
  density?: InkDensity;
}

export function InkProvider({ density = 'default', children }: InkProviderProps) {
  return <DensityContext.Provider value={density}>{children}</DensityContext.Provider>;
}

export function useInkDensity(override?: InkDensity): InkDensity {
  return override ?? useContext(DensityContext);
}
