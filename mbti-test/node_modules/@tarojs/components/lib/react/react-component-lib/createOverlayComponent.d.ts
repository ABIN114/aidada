/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/createOverlayComponent.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
import React from 'react';
import { OverlayEventDetail } from "../interfaces-f526f1a2.js";
import { StencilReactForwardedRef } from "./utils/index.js";
interface OverlayElement extends HTMLElement {
    present: () => Promise<void>;
    dismiss: (data?: any, role?: string | undefined) => Promise<boolean>;
}
interface ReactOverlayProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onDidDismiss?: (event: CustomEvent<OverlayEventDetail>) => void;
    onDidPresent?: (event: CustomEvent<OverlayEventDetail>) => void;
    onWillDismiss?: (event: CustomEvent<OverlayEventDetail>) => void;
    onWillPresent?: (event: CustomEvent<OverlayEventDetail>) => void;
}
declare const createOverlayComponent: <OverlayComponent extends object, OverlayType extends OverlayElement>(tagName: string, controller: {
    create: (options: any) => Promise<OverlayType>;
}, customElement?: any) => React.ForwardRefExoticComponent<React.PropsWithoutRef<OverlayComponent & ReactOverlayProps & {
    forwardedRef?: StencilReactForwardedRef<OverlayType>;
}> & React.RefAttributes<OverlayType>>;
export { ReactOverlayProps, createOverlayComponent };
