import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { classes } from './shared.js';
export const Toolbar = forwardRef(function Toolbar({ className, ...props }, ref) {
    return _jsx("div", { ref: ref, role: "toolbar", className: classes('ink-ui-toolbar', className), ...props });
});
export const Sidebar = forwardRef(function Sidebar({ className, ...props }, ref) {
    return _jsx("aside", { ref: ref, className: classes('ink-ui-sidebar', className), ...props });
});
export const Panel = forwardRef(function Panel({ className, ...props }, ref) {
    return _jsx("section", { ref: ref, className: classes('ink-ui-panel', className), ...props });
});
export const StatusBar = forwardRef(function StatusBar({ className, ...props }, ref) {
    return _jsx("div", { ref: ref, role: "status", className: classes('ink-ui-status-bar', className), ...props });
});
export const Tabs = TabsPrimitive.Root;
export const TabsList = forwardRef(function TabsList({ className, ...props }, ref) {
    return _jsx(TabsPrimitive.List, { ref: ref, className: classes('ink-ui-tabs-list', className), ...props });
});
export const TabsTrigger = forwardRef(function TabsTrigger({ className, ...props }, ref) {
    return _jsx(TabsPrimitive.Trigger, { ref: ref, className: classes('ink-ui-tabs-trigger', className), ...props });
});
export const TabsContent = forwardRef(function TabsContent({ className, ...props }, ref) {
    return _jsx(TabsPrimitive.Content, { ref: ref, className: classes('ink-ui-tabs-content', className), ...props });
});
