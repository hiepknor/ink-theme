import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { forwardRef } from 'react';
import { classes } from './shared.js';
export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = forwardRef(function AccordionItem({ className, ...props }, ref) {
    return _jsx(AccordionPrimitive.Item, { ref: ref, className: classes('ink-ui-accordion-item', className), ...props });
});
export const AccordionTrigger = forwardRef(function AccordionTrigger({ children, className, ...props }, ref) {
    return _jsx(AccordionPrimitive.Header, { className: "ink-ui-accordion-header", children: _jsxs(AccordionPrimitive.Trigger, { ref: ref, className: classes('ink-ui-accordion-trigger', className), ...props, children: [children, _jsx("span", { "aria-hidden": "true", children: "+" })] }) });
});
export const AccordionContent = forwardRef(function AccordionContent({ className, ...props }, ref) {
    return _jsx(AccordionPrimitive.Content, { ref: ref, className: classes('ink-ui-accordion-content', className), ...props });
});
