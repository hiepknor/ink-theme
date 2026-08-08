import { forwardRef, type HTMLAttributes } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { classes } from './shared.js';

export const Toolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Toolbar({ className, ...props }, ref) {
  return <div ref={ref} role="toolbar" className={classes('ink-ui-toolbar', className)} {...props} />;
});
export const Sidebar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Sidebar({ className, ...props }, ref) {
  return <aside ref={ref} className={classes('ink-ui-sidebar', className)} {...props} />;
});
export const Panel = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Panel({ className, ...props }, ref) {
  return <section ref={ref} className={classes('ink-ui-panel', className)} {...props} />;
});
export const StatusBar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatusBar({ className, ...props }, ref) {
  return <div ref={ref} role="status" className={classes('ink-ui-status-bar', className)} {...props} />;
});

export const Tabs = TabsPrimitive.Root;
export const TabsList = forwardRef<HTMLDivElement, TabsPrimitive.TabsListProps>(function TabsList({ className, ...props }, ref) {
  return <TabsPrimitive.List ref={ref} className={classes('ink-ui-tabs-list', className)} {...props} />;
});
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsPrimitive.TabsTriggerProps>(function TabsTrigger({ className, ...props }, ref) {
  return <TabsPrimitive.Trigger ref={ref} className={classes('ink-ui-tabs-trigger', className)} {...props} />;
});
export const TabsContent = forwardRef<HTMLDivElement, TabsPrimitive.TabsContentProps>(function TabsContent({ className, ...props }, ref) {
  return <TabsPrimitive.Content ref={ref} className={classes('ink-ui-tabs-content', className)} {...props} />;
});
