import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { classes, describedBy } from './shared.js';
import { Dialog, DialogContent } from './overlays.js';
import { ErrorMessage } from './feedback.js';
export const FileUpload = forwardRef(function FileUpload({ 'aria-describedby': ariaDescribedBy, className, description, disabled, error, errorLive = 'off', id: idProp, label, onChange, onFilesChange, prompt = 'Choose files or drop them here', ...props }, forwardedRef) {
    const id = idProp ?? `ink-upload-${useId()}`;
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    useImperativeHandle(forwardedRef, () => inputRef.current);
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    function receive(files) {
        onFilesChange?.(files ? Array.from(files) : []);
    }
    function handleDrop(event) {
        event.preventDefault();
        setDragging(false);
        if (disabled)
            return;
        const files = event.dataTransfer.files;
        if (inputRef.current)
            inputRef.current.files = files;
        receive(files);
    }
    return _jsxs("div", { className: "ink-ui-upload-field", children: [_jsx("span", { className: "ink-ui-label", id: `${id}-label`, children: label }), _jsx("input", { ...props, ref: inputRef, id: id, type: "file", disabled: disabled, className: classes('ink-ui-upload-input', className), "aria-labelledby": `${id}-label`, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy(ariaDescribedBy, descriptionId, errorId), onChange: (event) => { onChange?.(event); receive(event.currentTarget.files); } }), _jsxs("label", { className: "ink-ui-upload-dropzone", "data-dragging": dragging || undefined, "data-disabled": disabled || undefined, htmlFor: id, onDragEnter: (event) => { event.preventDefault(); if (!disabled)
                    setDragging(true); }, onDragOver: (event) => event.preventDefault(), onDragLeave: () => setDragging(false), onDrop: handleDrop, children: [_jsx("span", { className: "ink-ui-upload-mark", "aria-hidden": "true", children: "\u2191" }), _jsx("strong", { children: prompt }), _jsx("span", { className: "ink-ui-description", children: props.accept ? `Accepted: ${props.accept}` : 'Any file type' })] }), description && _jsx("div", { className: "ink-ui-description", id: descriptionId, children: description }), error && _jsx(ErrorMessage, { id: errorId, live: errorLive, children: error })] });
});
export const ImageSurface = forwardRef(function ImageSurface({ alt, aspectRatio = 'auto', caption, className, decoding = 'async', fallback = 'Image unavailable', fallbackDescription, fit = 'cover', loading = 'lazy', loadingFallback = 'Loading image', onError, onLoad, onRetry, retryLabel = 'Retry', src, ...props }, ref) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { setFailed(false); setLoaded(false); }, [src]);
    const pending = Boolean(src) && !failed && !loaded;
    const state = !src ? 'empty' : failed ? 'error' : loaded ? 'ready' : 'loading';
    return _jsxs("figure", { className: "ink-ui-image-surface", "data-aspect": aspectRatio, "data-fit": fit, "data-state": state, "aria-busy": pending || undefined, children: [_jsx("div", { className: "ink-ui-image-stage", children: failed || !src ? _jsxs("div", { className: "ink-ui-image-fallback", children: [_jsx("span", { className: "ink-ui-sr-only", role: "img", "aria-label": alt }), _jsx("span", { className: "ink-ui-image-mark", "aria-hidden": "true" }), _jsxs("span", { className: "ink-ui-image-fallback-copy", "aria-live": failed ? 'polite' : undefined, children: [_jsx("strong", { children: fallback }), fallbackDescription && _jsx("span", { children: fallbackDescription })] }), failed && onRetry && _jsx("button", { type: "button", className: "ink-ui-media-action", onClick: onRetry, children: retryLabel })] }) : _jsxs(_Fragment, { children: [_jsx("img", { ...props, ref: ref, className: classes('ink-ui-image', className), src: src, alt: alt, loading: loading, decoding: decoding, onError: (event) => { setFailed(true); setLoaded(false); onError?.(event); }, onLoad: (event) => { setFailed(false); setLoaded(true); onLoad?.(event); } }), pending && _jsxs("div", { className: "ink-ui-image-loading", role: "status", children: [_jsx("span", { className: "ink-ui-spinner", "aria-hidden": "true" }), _jsx("span", { children: loadingFallback })] })] }) }), caption && _jsx("figcaption", { className: "ink-ui-image-caption", children: caption })] });
});
const statusLabels = { queued: 'Queued', uploading: 'Uploading', success: 'Uploaded', error: 'Upload failed' };
function formatBytes(value) {
    if (value === undefined)
        return undefined;
    if (value < 1024)
        return `${value} B`;
    if (value < 1024 * 1024)
        return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}
export const FileList = forwardRef(function FileList({ className, items, onRemove, onRetry, removeLabel = (item) => `Remove ${item.name}`, retryLabel = (item) => `Retry ${item.name}`, ...props }, ref) {
    return _jsx("ul", { ref: ref, className: classes('ink-ui-file-list', className), "aria-label": "Selected files", ...props, children: items.map((item) => {
            const progress = Math.max(0, Math.min(100, item.progress ?? 0));
            return _jsxs("li", { className: "ink-ui-file-item", "data-status": item.status, children: [_jsx("span", { className: "ink-ui-file-mark", "aria-hidden": "true" }), _jsxs("span", { className: "ink-ui-file-copy", children: [_jsx("strong", { children: item.name }), _jsx("span", { className: "ink-ui-description", children: [formatBytes(item.size), statusLabels[item.status]].filter(Boolean).join(' · ') }), item.status === 'uploading' && _jsxs("progress", { "aria-label": `Uploading ${item.name}`, max: 100, value: progress, children: [progress, "%"] }), item.error && _jsx("span", { className: "ink-ui-error", children: item.error })] }), _jsxs("span", { className: "ink-ui-file-actions", children: [item.status === 'error' && onRetry && _jsx("button", { type: "button", className: "ink-ui-media-action", "aria-label": retryLabel(item), onClick: () => onRetry(item), children: "Retry" }), onRemove && _jsx("button", { type: "button", className: "ink-ui-media-action", "aria-label": removeLabel(item), onClick: () => onRemove(item), children: "Remove" })] })] }, item.id);
        }) });
});
function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
}
export const Avatar = forwardRef(function Avatar({ alt, className, fallback, name, onError, onLoad, size = 'md', src, ...props }, ref) {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);
    const label = alt ?? name;
    return _jsx("span", { className: "ink-ui-avatar", "data-size": size, children: src && !failed ? _jsx("img", { ...props, ref: ref, className: classes('ink-ui-avatar-image', className), src: src, alt: label, onError: (event) => { setFailed(true); onError?.(event); }, onLoad: onLoad }) : _jsx("span", { className: "ink-ui-avatar-fallback", role: "img", "aria-label": label, children: fallback ?? initials(name) }) });
});
export const ImageGallery = forwardRef(function ImageGallery({ className, items, lightboxLabel = 'Image preview', ...props }, ref) {
    const [selected, setSelected] = useState(null);
    const item = selected === null ? undefined : items[selected];
    return _jsxs(_Fragment, { children: [_jsx("div", { ref: ref, className: classes('ink-ui-image-gallery', className), ...props, children: items.map((galleryItem, index) => _jsx("button", { type: "button", className: "ink-ui-gallery-trigger", "aria-label": `Open ${galleryItem.alt}`, onClick: () => setSelected(index), children: _jsx(ImageSurface, { src: galleryItem.thumbnailSrc ?? galleryItem.src, alt: "", aspectRatio: "square", caption: galleryItem.caption }) }, `${galleryItem.src}-${index}`)) }), _jsx(Dialog, { open: selected !== null, onOpenChange: (open) => { if (!open)
                    setSelected(null); }, children: _jsx(DialogContent, { className: "ink-ui-lightbox", title: lightboxLabel, ...(item ? { description: item.alt } : {}), children: item && _jsxs(_Fragment, { children: [_jsx(ImageSurface, { src: item.src, alt: item.alt, fit: "contain" }), _jsxs("div", { className: "ink-ui-lightbox-navigation", children: [_jsx("button", { type: "button", className: "ink-ui-media-action", disabled: selected === 0, onClick: () => setSelected((current) => current === null ? null : Math.max(0, current - 1)), children: "Previous" }), _jsxs("span", { children: [(selected ?? 0) + 1, " / ", items.length] }), _jsx("button", { type: "button", className: "ink-ui-media-action", disabled: selected === items.length - 1, onClick: () => setSelected((current) => current === null ? null : Math.min(items.length - 1, current + 1)), children: "Next" })] })] }) }) })] });
});
