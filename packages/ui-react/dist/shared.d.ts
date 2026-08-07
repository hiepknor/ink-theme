import './styles.css';
export type InkDensity = 'compact' | 'default' | 'touch';
export declare function classes(...values: Array<string | undefined | false>): string;
export declare function describedBy(...values: Array<string | undefined>): string | undefined;
