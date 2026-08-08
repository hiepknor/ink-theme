import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type DragEvent, type ImgHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { classes, describedBy } from './shared.js';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
  onFilesChange?: (files: File[]) => void;
  prompt?: ReactNode;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  { 'aria-describedby': ariaDescribedBy, className, description, disabled, error, id: idProp, label, onChange, onFilesChange, prompt = 'Choose files or drop them here', ...props }, forwardedRef,
) {
  const id = idProp ?? `ink-upload-${useId()}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  function receive(files: FileList | null) {
    onFilesChange?.(files ? Array.from(files) : []);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    const files = event.dataTransfer.files;
    if (inputRef.current) inputRef.current.files = files;
    receive(files);
  }

  return <div className="ink-ui-upload-field"><span className="ink-ui-label" id={`${id}-label`}>{label}</span><input {...props} ref={inputRef} id={id} type="file" disabled={disabled} className={classes('ink-ui-upload-input', className)} aria-labelledby={`${id}-label`} aria-invalid={error ? true : undefined} aria-describedby={describedBy(ariaDescribedBy, descriptionId, errorId)} onChange={(event) => { onChange?.(event); receive(event.currentTarget.files); }} /><label className="ink-ui-upload-dropzone" data-dragging={dragging || undefined} data-disabled={disabled || undefined} htmlFor={id} onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={handleDrop}><span className="ink-ui-upload-mark" aria-hidden="true">↑</span><strong>{prompt}</strong><span className="ink-ui-description">{props.accept ? `Accepted: ${props.accept}` : 'Any file type'}</span></label>{description && <div className="ink-ui-description" id={descriptionId}>{description}</div>}{error && <div className="ink-ui-error" id={errorId}>{error}</div>}</div>;
});

export type ImageAspectRatio = 'auto' | 'square' | 'video' | 'portrait';
export type ImageFit = 'cover' | 'contain';
export interface ImageSurfaceProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  alt: string;
  aspectRatio?: ImageAspectRatio;
  caption?: ReactNode;
  fallback?: ReactNode;
  fit?: ImageFit;
  loadingFallback?: ReactNode;
}

export const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  { alt, aspectRatio = 'auto', caption, className, decoding = 'async', fallback = 'Image unavailable', fit = 'cover', loading = 'lazy', loadingFallback = 'Loading image', onError, onLoad, src, ...props }, ref,
) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setFailed(false); setLoaded(false); }, [src]);
  const pending = Boolean(src) && !failed && !loaded;
  return <figure className="ink-ui-image-surface" data-aspect={aspectRatio} data-fit={fit} aria-busy={pending || undefined}><div className="ink-ui-image-stage">{failed || !src ? <div className="ink-ui-image-fallback" role="img" aria-label={alt}><span className="ink-ui-image-mark" aria-hidden="true" />{fallback}</div> : <><img {...props} ref={ref} className={classes('ink-ui-image', className)} src={src} alt={alt} loading={loading} decoding={decoding} onError={(event) => { setFailed(true); setLoaded(false); onError?.(event); }} onLoad={(event) => { setFailed(false); setLoaded(true); onLoad?.(event); }} />{pending && <div className="ink-ui-image-loading" role="status"><span className="ink-ui-spinner" aria-hidden="true" /><span>{loadingFallback}</span></div>}</>}</div>{caption && <figcaption className="ink-ui-image-caption">{caption}</figcaption>}</figure>;
});
