import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const DensityContext = createContext('default');
export function InkProvider({ density = 'default', children }) {
    return _jsx(DensityContext.Provider, { value: density, children: children });
}
export function useInkDensity(override) {
    return override ?? useContext(DensityContext);
}
