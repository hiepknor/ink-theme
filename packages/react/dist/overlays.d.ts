import { type ComponentPropsWithoutRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
export declare const Dialog: import("react").FC<DialogPrimitive.DialogProps>;
export declare const DialogTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DialogClose: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    closeLabel?: string;
    description?: string;
    title: string;
}
export declare const DialogContent: import("react").ForwardRefExoticComponent<DialogContentProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Drawer: import("react").FC<DialogPrimitive.DialogProps>;
export declare const DrawerTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DrawerClose: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    closeLabel?: string;
    description?: string;
    side?: DrawerSide;
    title: string;
}
export declare const DrawerContent: import("react").ForwardRefExoticComponent<DrawerContentProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Popover: import("react").FC<PopoverPrimitive.PopoverProps>;
export declare const PopoverTrigger: import("react").ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface PopoverContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
    closeLabel?: string;
}
export declare const PopoverContent: import("react").ForwardRefExoticComponent<PopoverContentProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const TooltipProvider: import("react").FC<TooltipPrimitive.TooltipProviderProps>;
export declare const Tooltip: import("react").FC<TooltipPrimitive.TooltipProps>;
export declare const TooltipTrigger: import("react").ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const TooltipContent: import("react").ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const Menu: import("react").FC<MenuPrimitive.DropdownMenuProps>;
export declare const MenuTrigger: import("react").ForwardRefExoticComponent<MenuPrimitive.DropdownMenuTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const MenuContent: import("react").ForwardRefExoticComponent<Omit<MenuPrimitive.DropdownMenuContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const MenuItem: import("react").ForwardRefExoticComponent<Omit<MenuPrimitive.DropdownMenuItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const MenuSeparator: import("react").ForwardRefExoticComponent<Omit<MenuPrimitive.DropdownMenuSeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
