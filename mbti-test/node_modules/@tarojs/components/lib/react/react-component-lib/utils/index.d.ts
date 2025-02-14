/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/utils/index.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
import React from 'react';
import { StyleReactProps } from "../../interfaces-f526f1a2.js";
type StencilReactExternalProps<PropType, ElementType> = PropType & Omit<React.HTMLAttributes<ElementType>, 'style'> & StyleReactProps;
type StencilReactForwardedRef<T> = ((instance: T | null) => void) | React.MutableRefObject<T | null> | null;
declare const setRef: (ref: StencilReactForwardedRef<any> | React.Ref<any> | undefined, value: any) => void;
declare const mergeRefs: (...refs: (StencilReactForwardedRef<any> | React.Ref<any> | undefined)[]) => React.RefCallback<any>;
declare const createForwardRef: <PropType, ElementType>(ReactComponent: any, displayName: string) => React.ForwardRefExoticComponent<React.PropsWithoutRef<StencilReactExternalProps<PropType, ElementType>> & React.RefAttributes<ElementType>>;
declare const defineCustomElement: (tagName: string, customElement: any) => void;
export { StencilReactExternalProps, StencilReactForwardedRef, setRef, mergeRefs, createForwardRef, defineCustomElement };
export * from "./attachProps.js";
export * from "./case.js";
