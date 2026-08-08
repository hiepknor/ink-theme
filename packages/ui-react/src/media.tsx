import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type DragEvent, type HTMLAttributes, type ImgHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { classes, describedBy } from './shared.js';
import { Dialog, DialogContent } from './overlays.js';

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

export type UploadFileStatus = 'queued' | 'uploading' | 'success' | 'error';
export interface UploadFileItem {
  error?: ReactNode;
  id: string;
  name: string;
  progress?: number;
  size?: number;
  status: UploadFileStatus;
}
export interface FileListProps extends HTMLAttributes<HTMLUListElement> {
  items: UploadFileItem[];
  onRemove?: (item: UploadFileItem) => void;
  onRetry?: (item: UploadFileItem) => void;
  removeLabel?: (item: UploadFileItem) => string;
  retryLabel?: (item: UploadFileItem) => string;
}

const statusLabels: Record<UploadFileStatus, string> = { queued: 'Queued', uploading: 'Uploading', success: 'Uploaded', error: 'Upload failed' };
function formatBytes(value?: number) {
  if (value === undefined) return undefined;
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileList = forwardRef<HTMLUListElement, FileListProps>(function FileList(
  { className, items, onRemove, onRetry, removeLabel = (item) => `Remove ${item.name}`, retryLabel = (item) => `Retry ${item.name}`, ...props }, ref,
) {
  return <ul ref={ref} className={classes('ink-ui-file-list', className)} aria-label="Selected files" {...props}>{items.map((item) => {
    const progress = Math.max(0, Math.min(100, item.progress ?? 0));
    return <li className="ink-ui-file-item" data-status={item.status} key={item.id}><span className="ink-ui-file-mark" aria-hidden="true" /><span className="ink-ui-file-copy"><strong>{item.name}</strong><span className="ink-ui-description">{[formatBytes(item.size), statusLabels[item.status]].filter(Boolean).join(' · ')}</span>{item.status === 'uploading' && <progress aria-label={`Uploading ${item.name}`} max={100} value={progress}>{progress}%</progress>}{item.error && <span className="ink-ui-error">{item.error}</span>}</span><span className="ink-ui-file-actions">{item.status === 'error' && onRetry && <button type="button" className="ink-ui-media-action" aria-label={retryLabel(item)} onClick={() => onRetry(item)}>Retry</button>}{onRemove && <button type="button" className="ink-ui-media-action" aria-label={removeLabel(item)} onClick={() => onRemove(item)}>Remove</button>}</span></li>;
  })}</ul>;
});

export type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  alt?: string;
  fallback?: ReactNode;
  name: string;
  size?: AvatarSize;
  src?: string;
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
}
export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { alt, className, fallback, name, onError, onLoad, size = 'md', src, ...props }, ref,
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const label = alt ?? name;
  return <span className="ink-ui-avatar" data-size={size}>{src && !failed ? <img {...props} ref={ref} className={classes('ink-ui-avatar-image', className)} src={src} alt={label} onError={(event) => { setFailed(true); onError?.(event); }} onLoad={onLoad} /> : <span className="ink-ui-avatar-fallback" role="img" aria-label={label}>{fallback ?? initials(name)}</span>}</span>;
});

export interface ImageGalleryItem { alt: string; caption?: ReactNode; src: string; thumbnailSrc?: string; }
export interface ImageGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: ImageGalleryItem[];
  lightboxLabel?: string;
}

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(function ImageGallery(
  { className, items, lightboxLabel = 'Image preview', ...props }, ref,
) {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected === null ? undefined : items[selected];
  return <><div ref={ref} className={classes('ink-ui-image-gallery', className)} {...props}>{items.map((galleryItem, index) => <button key={`${galleryItem.src}-${index}`} type="button" className="ink-ui-gallery-trigger" aria-label={`Open ${galleryItem.alt}`} onClick={() => setSelected(index)}><ImageSurface src={galleryItem.thumbnailSrc ?? galleryItem.src} alt="" aspectRatio="square" caption={galleryItem.caption} /></button>)}</div><Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent className="ink-ui-lightbox" title={lightboxLabel} {...(item ? { description: item.alt } : {})}>{item && <><ImageSurface src={item.src} alt={item.alt} fit="contain" /><div className="ink-ui-lightbox-navigation"><button type="button" className="ink-ui-media-action" disabled={selected === 0} onClick={() => setSelected((current) => current === null ? null : Math.max(0, current - 1))}>Previous</button><span>{(selected ?? 0) + 1} / {items.length}</span><button type="button" className="ink-ui-media-action" disabled={selected === items.length - 1} onClick={() => setSelected((current) => current === null ? null : Math.min(items.length - 1, current + 1))}>Next</button></div></>}</DialogContent></Dialog></>;
});
