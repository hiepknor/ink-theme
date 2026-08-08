import { createElement as _createElement } from "react";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef, useId } from 'react';
import { classes, describedBy } from './shared.js';
import { useInkDensity } from './ink-provider.js';
function FieldCopy({ description, error, id }) {
    return _jsxs(_Fragment, { children: [description && _jsx("div", { className: "ink-ui-description", id: `${id}-description`, children: description }), error && _jsx("div", { className: "ink-ui-error", id: `${id}-error`, children: error })] });
}
export const TextArea = forwardRef(function TextArea({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, id: idProp, label, ...props }, ref) {
    const id = idProp ?? `ink-textarea-${useId()}`;
    const density = useInkDensity(densityOverride);
    return _jsxs("div", { className: "ink-ui-field", "data-density": density, children: [_jsx("label", { className: "ink-ui-label", htmlFor: id, children: label }), _jsx("textarea", { ...props, ref: ref, id: id, className: classes('ink-ui-input ink-ui-textarea', className), "aria-invalid": ariaInvalid ?? (error ? true : undefined), "aria-describedby": describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined) }), _jsx(FieldCopy, { id: id, description: description, error: error })] });
});
export const RadioGroup = forwardRef(function RadioGroup({ defaultValue, density: densityOverride, disabled, label, name, onValueChange, options, value, ...inputProps }, ref) {
    const density = useInkDensity(densityOverride);
    return _jsxs("fieldset", { ref: ref, className: "ink-ui-choice-group", "data-density": density, disabled: disabled, children: [_jsx("legend", { className: "ink-ui-label", children: label }), options.map((option) => _jsxs("label", { className: "ink-ui-check-label", children: [_jsx("input", { ...inputProps, className: "ink-ui-radio", type: "radio", name: name, value: option.value, disabled: option.disabled, checked: value === undefined ? undefined : value === option.value, defaultChecked: value === undefined ? defaultValue === option.value : undefined, onChange: (event) => onValueChange?.(event.currentTarget.value) }), _jsx("span", { className: "ink-ui-radio-control", "aria-hidden": "true" }), _jsx("span", { children: option.label })] }, option.value))] });
});
export const Switch = forwardRef(function Switch({ className, density: densityOverride, label, ...props }, ref) {
    const density = useInkDensity(densityOverride);
    return _jsxs("label", { className: "ink-ui-switch-label", "data-density": density, children: [_jsx("input", { ...props, ref: ref, type: "checkbox", role: "switch", className: classes('ink-ui-switch-input', className) }), _jsx("span", { className: "ink-ui-switch-track", "aria-hidden": "true", children: _jsx("span", {}) }), _jsx("span", { children: label })] });
});
export const Select = forwardRef(function Select({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, defaultOpen, defaultValue, density: densityOverride, description, disabled, error, id: idProp, label, name, onOpenChange, onValueChange, open, options, placeholder = 'Select an option', required, value, ...triggerProps }, ref) {
    const id = idProp ?? `ink-select-${useId()}`;
    const density = useInkDensity(densityOverride);
    return _jsxs("div", { className: "ink-ui-field", "data-density": density, children: [_jsx("label", { className: "ink-ui-label", htmlFor: id, children: label }), _jsxs(SelectPrimitive.Root, { ...(defaultOpen === undefined ? {} : { defaultOpen }), ...(defaultValue === undefined ? {} : { defaultValue }), ...(disabled === undefined ? {} : { disabled }), ...(name === undefined ? {} : { name }), ...(onOpenChange === undefined ? {} : { onOpenChange }), ...(onValueChange === undefined ? {} : { onValueChange }), ...(open === undefined ? {} : { open }), ...(required === undefined ? {} : { required }), ...(value === undefined ? {} : { value }), children: [_jsxs(SelectPrimitive.Trigger, { ...triggerProps, ref: ref, id: id, className: classes('ink-ui-input ink-ui-select-trigger', className), "aria-invalid": ariaInvalid ?? (error ? true : undefined), "aria-describedby": describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined), children: [_jsx(SelectPrimitive.Value, { placeholder: placeholder }), _jsx(SelectPrimitive.Icon, { className: "ink-ui-select-icon", "aria-hidden": "true", children: _jsx("svg", { viewBox: "0 0 12 8", focusable: "false", children: _jsx("path", { d: "M1 1.5 6 6.5l5-5" }) }) })] }), _jsx(SelectPrimitive.Portal, { children: _jsxs(SelectPrimitive.Content, { className: "ink-ui-select-content", "data-density": density, position: "popper", sideOffset: 4, children: [_jsx(SelectPrimitive.ScrollUpButton, { className: "ink-ui-select-scroll", "aria-label": "Scroll up", children: "\u2191" }), _jsx(SelectPrimitive.Viewport, { className: "ink-ui-select-viewport", children: options.map((option) => _createElement(SelectPrimitive.Item, { className: "ink-ui-select-item", ...(option.disabled === undefined ? {} : { disabled: option.disabled }), key: option.value, value: option.value },
                                        _jsx(SelectPrimitive.ItemText, { children: option.label }),
                                        _jsx(SelectPrimitive.ItemIndicator, { className: "ink-ui-select-indicator", "aria-hidden": "true", children: "\u2713" }))) }), _jsx(SelectPrimitive.ScrollDownButton, { className: "ink-ui-select-scroll", "aria-label": "Scroll down", children: "\u2193" })] }) })] }), _jsx(FieldCopy, { id: id, description: description, error: error })] });
});
export const Combobox = forwardRef(function Combobox({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, className, density: densityOverride, description, error, id: idProp, label, options, ...props }, ref) {
    const id = idProp ?? `ink-combobox-${useId()}`;
    const listId = `${id}-options`;
    const density = useInkDensity(densityOverride);
    return _jsxs("div", { className: "ink-ui-field", "data-density": density, children: [_jsx("label", { className: "ink-ui-label", htmlFor: id, children: label }), _jsx("input", { ...props, ref: ref, id: id, list: listId, role: "combobox", "aria-autocomplete": "list", className: classes('ink-ui-input ink-ui-combobox', className), "aria-invalid": ariaInvalid ?? (error ? true : undefined), "aria-describedby": describedBy(ariaDescribedBy, description ? `${id}-description` : undefined, error ? `${id}-error` : undefined) }), _jsx("datalist", { id: listId, children: options.map((option) => _jsx("option", { value: option.value, children: option.label }, option.value)) }), _jsx(FieldCopy, { id: id, description: description, error: error })] });
});
