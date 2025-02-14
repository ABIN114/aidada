/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/createComponent.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
import React from 'react';
interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
}
interface StencilReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
    forwardedRef: React.RefObject<ElementType>;
    ref?: React.Ref<any>;
}
declare const createReactComponent: <PropType, ElementType extends HTMLStencilElement, ContextStateType = any, ExpandedPropsTypes = any>(tagName: string, ReactComponentContext?: React.Context<ContextStateType>, manipulatePropsFunction?: (originalProps: StencilReactInternalProps<ElementType>, propsToPass: any) => ExpandedPropsTypes, defineCustomElement?: () => void) => React.ForwardRefExoticComponent<React.PropsWithoutRef<import("./utils/index.js").StencilReactExternalProps<PropType, ElementType>> & React.RefAttributes<ElementType>>;
export { HTMLStencilElement, createReactComponent };
