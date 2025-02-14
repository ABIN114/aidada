/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/interfaces.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
interface EventEmitter<T = any> {
    emit: (data?: T) => CustomEvent<T>;
}
interface StyleReactProps {
    class?: string;
    className?: string;
    style?: {
        [key: string]: any;
    };
}
interface OverlayEventDetail<T = any> {
    data?: T;
    role?: string;
}
interface OverlayInterface {
    el: HTMLElement;
    animated: boolean;
    keyboardClose: boolean;
    overlayIndex: number;
    presented: boolean;
    enterAnimation?: any;
    leaveAnimation?: any;
    didPresent: EventEmitter<void>;
    willPresent: EventEmitter<void>;
    willDismiss: EventEmitter<OverlayEventDetail>;
    didDismiss: EventEmitter<OverlayEventDetail>;
    present(): Promise<void>;
    dismiss(data?: any, role?: string): Promise<boolean>;
}
export { EventEmitter, StyleReactProps, OverlayEventDetail, OverlayInterface };
