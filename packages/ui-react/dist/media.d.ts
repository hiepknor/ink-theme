import { type ImgHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
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
