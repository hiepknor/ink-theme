import { type HTMLAttributes, type ImgHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    description?: ReactNode;
    error?: ReactNode;
    label: ReactNode;
    onFilesChange?: (files: File[]) => void;
    prompt?: ReactNode;
}
export declare const FileUpload: import("react").ForwardRefExoticComponent<FileUploadProps & import("react").RefAttributes<HTMLInputElement>>;
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
export declare const ImageSurface: import("react").ForwardRefExoticComponent<ImageSurfaceProps & import("react").RefAttributes<HTMLImageElement>>;
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
export declare const FileList: import("react").ForwardRefExoticComponent<FileListProps & import("react").RefAttributes<HTMLUListElement>>;
export type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
    alt?: string;
    fallback?: ReactNode;
    name: string;
    size?: AvatarSize;
    src?: string;
}
export declare const Avatar: import("react").ForwardRefExoticComponent<AvatarProps & import("react").RefAttributes<HTMLImageElement>>;
export interface ImageGalleryItem {
    alt: string;
    caption?: ReactNode;
    src: string;
    thumbnailSrc?: string;
}
export interface ImageGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: ImageGalleryItem[];
    lightboxLabel?: string;
}
export declare const ImageGallery: import("react").ForwardRefExoticComponent<ImageGalleryProps & import("react").RefAttributes<HTMLDivElement>>;
