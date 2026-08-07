import './styles.css';
export function classes(...values) {
    return values.filter(Boolean).join(' ');
}
export function describedBy(...values) {
    const result = values.filter(Boolean).join(' ');
    return result || undefined;
}
