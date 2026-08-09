import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { classes } from './shared.js';
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogContent = forwardRef(function DialogContent({ children, className, closeLabel = 'Close dialog', description, title, ...props }, ref) {
    return _jsxs(DialogPrimitive.Portal, { children: [_jsx(DialogPrimitive.Overlay, { className: "ink-ui-overlay" }), _jsxs(DialogPrimitive.Content, { ref: ref, className: classes('ink-ui-dialog', className), ...props, children: [_jsx(DialogPrimitive.Title, { className: "ink-ui-overlay-title", children: title }), description && _jsx(DialogPrimitive.Description, { className: "ink-ui-description", children: description }), _jsx("div", { className: "ink-ui-overlay-body", children: children }), _jsx(DialogPrimitive.Close, { className: "ink-ui-overlay-close", "aria-label": closeLabel, children: "\u00D7" })] })] });
});
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export const DrawerContent = forwardRef(function DrawerContent({ children, className, closeLabel = 'Close drawer', description, side = 'right', title, ...props }, ref) {
    return _jsxs(DialogPrimitive.Portal, { children: [_jsx(DialogPrimitive.Overlay, { className: "ink-ui-overlay" }), _jsxs(DialogPrimitive.Content, { ref: ref, className: classes('ink-ui-drawer', className), "data-side": side, ...props, children: [_jsx(DialogPrimitive.Title, { className: "ink-ui-overlay-title", children: title }), description && _jsx(DialogPrimitive.Description, { className: "ink-ui-description", children: description }), _jsx("div", { className: "ink-ui-overlay-body", children: children }), _jsx(DialogPrimitive.Close, { className: "ink-ui-overlay-close", "aria-label": closeLabel, children: "\u00D7" })] })] });
});
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = forwardRef(function PopoverContent({ children, className, closeLabel = 'Close popover', sideOffset = 6, ...props }, ref) {
    return _jsx(PopoverPrimitive.Portal, { children: _jsxs(PopoverPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: classes('ink-ui-popover', className), ...props, children: [children, _jsx(PopoverPrimitive.Close, { className: "ink-ui-overlay-close", "aria-label": closeLabel, children: "\u00D7" }), _jsx(PopoverPrimitive.Arrow, { className: "ink-ui-overlay-arrow" })] }) });
});
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = forwardRef(function TooltipContent({ children, className, sideOffset = 6, ...props }, ref) {
    return _jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: classes('ink-ui-tooltip', className), ...props, children: [children, _jsx(TooltipPrimitive.Arrow, { className: "ink-ui-overlay-arrow" })] }) });
});
export const Menu = MenuPrimitive.Root;
export const MenuTrigger = MenuPrimitive.Trigger;
export const MenuContent = forwardRef(function MenuContent({ className, sideOffset = 6, ...props }, ref) {
    return _jsx(MenuPrimitive.Portal, { children: _jsx(MenuPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: classes('ink-ui-menu', className), ...props }) });
});
export const MenuItem = forwardRef(function MenuItem({ className, ...props }, ref) {
    return _jsx(MenuPrimitive.Item, { ref: ref, className: classes('ink-ui-menu-item', className), ...props });
});
export const MenuSeparator = forwardRef(function MenuSeparator({ className, ...props }, ref) {
    return _jsx(MenuPrimitive.Separator, { ref: ref, className: classes('ink-ui-menu-separator', className), ...props });
});
