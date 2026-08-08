import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { classes } from './shared.js';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> { closeLabel?: string; description?: string; title: string; }
export const DialogContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(function DialogContent({ children, className, closeLabel = 'Close dialog', description, title, ...props }, ref) {
  return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="ink-ui-overlay" /><DialogPrimitive.Content ref={ref} className={classes('ink-ui-dialog', className)} {...props}><DialogPrimitive.Title className="ink-ui-overlay-title">{title}</DialogPrimitive.Title>{description && <DialogPrimitive.Description className="ink-ui-description">{description}</DialogPrimitive.Description>}<div className="ink-ui-overlay-body">{children}</div><DialogPrimitive.Close className="ink-ui-overlay-close" aria-label={closeLabel}>×</DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;
});

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> { closeLabel?: string; description?: string; side?: DrawerSide; title: string; }
export const DrawerContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DrawerContentProps>(function DrawerContent({ children, className, closeLabel = 'Close drawer', description, side = 'right', title, ...props }, ref) {
  return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="ink-ui-overlay" /><DialogPrimitive.Content ref={ref} className={classes('ink-ui-drawer', className)} data-side={side} {...props}><DialogPrimitive.Title className="ink-ui-overlay-title">{title}</DialogPrimitive.Title>{description && <DialogPrimitive.Description className="ink-ui-description">{description}</DialogPrimitive.Description>}<div className="ink-ui-overlay-body">{children}</div><DialogPrimitive.Close className="ink-ui-overlay-close" aria-label={closeLabel}>×</DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;
});

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export interface PopoverContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> { closeLabel?: string; }
export const PopoverContent = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(function PopoverContent({ children, className, closeLabel = 'Close popover', sideOffset = 6, ...props }, ref) {
  return <PopoverPrimitive.Portal><PopoverPrimitive.Content ref={ref} sideOffset={sideOffset} className={classes('ink-ui-popover', className)} {...props}>{children}<PopoverPrimitive.Close className="ink-ui-overlay-close" aria-label={closeLabel}>×</PopoverPrimitive.Close><PopoverPrimitive.Arrow className="ink-ui-overlay-arrow" /></PopoverPrimitive.Content></PopoverPrimitive.Portal>;
});

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(function TooltipContent({ children, className, sideOffset = 6, ...props }, ref) {
  return <TooltipPrimitive.Portal><TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={classes('ink-ui-tooltip', className)} {...props}>{children}<TooltipPrimitive.Arrow className="ink-ui-overlay-arrow" /></TooltipPrimitive.Content></TooltipPrimitive.Portal>;
});

export const Menu = MenuPrimitive.Root;
export const MenuTrigger = MenuPrimitive.Trigger;
export const MenuContent = forwardRef<ElementRef<typeof MenuPrimitive.Content>, ComponentPropsWithoutRef<typeof MenuPrimitive.Content>>(function MenuContent({ className, sideOffset = 6, ...props }, ref) {
  return <MenuPrimitive.Portal><MenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={classes('ink-ui-menu', className)} {...props} /></MenuPrimitive.Portal>;
});
export const MenuItem = forwardRef<ElementRef<typeof MenuPrimitive.Item>, ComponentPropsWithoutRef<typeof MenuPrimitive.Item>>(function MenuItem({ className, ...props }, ref) {
  return <MenuPrimitive.Item ref={ref} className={classes('ink-ui-menu-item', className)} {...props} />;
});
export const MenuSeparator = forwardRef<ElementRef<typeof MenuPrimitive.Separator>, ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>>(function MenuSeparator({ className, ...props }, ref) {
  return <MenuPrimitive.Separator ref={ref} className={classes('ink-ui-menu-separator', className)} {...props} />;
});
