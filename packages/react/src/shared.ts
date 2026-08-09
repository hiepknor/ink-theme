import './styles.css';

export type InkDensity = 'compact' | 'default' | 'touch';

export function classes(...values: Array<string | undefined | false>): string {
  return values.filter(Boolean).join(' ');
}

export function describedBy(...values: Array<string | undefined>): string | undefined {
  const result = values.filter(Boolean).join(' ');
  return result || undefined;
}
