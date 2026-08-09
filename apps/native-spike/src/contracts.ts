import { nativeTokens } from '@hiepknor/ink-tokens/react-native';

export type InkDensity = keyof typeof nativeTokens.controlHeight;
export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export const inkDensities = Object.freeze(Object.keys(nativeTokens.controlHeight) as InkDensity[]);
export const buttonVariants = Object.freeze(['primary', 'secondary', 'quiet'] as const);

export function resolveDensity(inherited: InkDensity, override?: InkDensity): InkDensity {
  return override ?? inherited;
}
