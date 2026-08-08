import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';
import { classes } from './shared.js';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<ComponentRef<typeof AccordionPrimitive.Item>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(function AccordionItem(
  { className, ...props }, ref,
) {
  return <AccordionPrimitive.Item ref={ref} className={classes('ink-ui-accordion-item', className)} {...props} />;
});

export const AccordionTrigger = forwardRef<ComponentRef<typeof AccordionPrimitive.Trigger>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(function AccordionTrigger(
  { children, className, ...props }, ref,
) {
  return <AccordionPrimitive.Header className="ink-ui-accordion-header"><AccordionPrimitive.Trigger ref={ref} className={classes('ink-ui-accordion-trigger', className)} {...props}>{children}<span aria-hidden="true">+</span></AccordionPrimitive.Trigger></AccordionPrimitive.Header>;
});

export const AccordionContent = forwardRef<ComponentRef<typeof AccordionPrimitive.Content>, ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(function AccordionContent(
  { className, ...props }, ref,
) {
  return <AccordionPrimitive.Content ref={ref} className={classes('ink-ui-accordion-content', className)} {...props} />;
});
