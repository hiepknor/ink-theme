import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { classes, describedBy } from './shared.js';
export const FileUpload = forwardRef(function FileUpload({ 'aria-describedby': ariaDescribedBy, className, description, disabled, error, id: idProp, label, onChange, onFilesChange, prompt = 'Choose files or drop them here', ...props }, forwardedRef) {
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
                    setDragging(true); }, onDragOver: (event) => event.preventDefault(), onDragLeave: () => setDragging(false), onDrop: handleDrop, children: [_jsx("span", { className: "ink-ui-upload-mark", "aria-hidden": "true", children: "\u2191" }), _jsx("strong", { children: prompt }), _jsx("span", { className: "ink-ui-description", children: props.accept ? `Accepted: ${props.accept}` : 'Any file type' })] }), description && _jsx("div", { className: "ink-ui-description", id: descriptionId, children: description }), error && _jsx("div", { className: "ink-ui-error", id: errorId, children: error })] });
});
export const ImageSurface = forwardRef(function ImageSurface({ alt, aspectRatio = 'auto', caption, className, decoding = 'async', fallback = 'Image unavailable', fit = 'cover', loading = 'lazy', loadingFallback = 'Loading image', onError, onLoad, src, ...props }, ref) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { setFailed(false); setLoaded(false); }, [src]);
    const pending = Boolean(src) && !failed && !loaded;
    return _jsxs("figure", { className: "ink-ui-image-surface", "data-aspect": aspectRatio, "data-fit": fit, "aria-busy": pending || undefined, children: [_jsx("div", { className: "ink-ui-image-stage", children: failed || !src ? _jsxs("div", { className: "ink-ui-image-fallback", role: "img", "aria-label": alt, children: [_jsx("span", { className: "ink-ui-image-mark", "aria-hidden": "true" }), fallback] }) : _jsxs(_Fragment, { children: [_jsx("img", { ...props, ref: ref, className: classes('ink-ui-image', className), src: src, alt: alt, loading: loading, decoding: decoding, onError: (event) => { setFailed(true); setLoaded(false); onError?.(event); }, onLoad: (event) => { setFailed(false); setLoaded(true); onLoad?.(event); } }), pending && _jsxs("div", { className: "ink-ui-image-loading", role: "status", children: [_jsx("span", { className: "ink-ui-spinner", "aria-hidden": "true" }), _jsx("span", { children: loadingFallback })] })] }) }), caption && _jsx("figcaption", { className: "ink-ui-image-caption", children: caption })] });
});
