import { nativeTokens } from '@hiepknor/ink-tokens/react-native';

export type InkDensity = keyof typeof nativeTokens.controlHeight;
export type ButtonVariant = 'primary' | 'secondary' | 'quiet';
export type SurfaceTone = 'default' | 'elevated' | 'recessed';
export type FeedbackTone = 'neutral' | 'ok' | 'warning' | 'danger';
export type FeedbackLive = 'off' | 'polite' | 'assertive';

export const inkDensities = Object.freeze(Object.keys(nativeTokens.controlHeight) as InkDensity[]);
export const buttonVariants = Object.freeze(['primary', 'secondary', 'quiet'] as const);
export const surfaceTones = Object.freeze(['default', 'elevated', 'recessed'] as const);
export const feedbackTones = Object.freeze(['neutral', 'ok', 'warning', 'danger'] as const);

export function resolveDensity(inherited: InkDensity, override?: InkDensity): InkDensity {
  return override ?? inherited;
}
