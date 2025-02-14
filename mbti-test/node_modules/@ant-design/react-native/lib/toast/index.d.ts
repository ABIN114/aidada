import React from 'react';
interface IToastConfigurable {
    duration?: number;
    onClose?: () => void;
    mask?: boolean;
    stackable?: boolean;
}
interface IToastProps extends IToastConfigurable {
    content: string | React.ReactNode;
}
declare function remove(key: number): void;
declare function removeAll(): void;
declare const _default: {
    SHORT: number;
    LONG: number;
    defaultConfig: IToastConfigurable;
    getConfig: () => {
        duration?: number | undefined;
        onClose?: (() => void) | undefined;
        mask?: boolean | undefined;
        stackable?: boolean | undefined;
    };
    config(props: IToastConfigurable): void;
    /**
     * @deprecated use Toast.info instead
     */
    show(props: string | IToastProps, duration?: number | undefined, mask?: boolean | undefined): number;
    /**
     *
     * @param props: toast props
     */
    info(props: string | IToastProps, duration?: number | undefined, onClose?: (() => void) | undefined, mask?: boolean | undefined): number;
    /**
     *
     * @param props: toast props
     */
    success(props: string | IToastProps, duration?: number | undefined, onClose?: (() => void) | undefined, mask?: boolean | undefined): number;
    /**
     *
     * @param props: toast props
     */
    fail(props: string | IToastProps, duration?: number | undefined, onClose?: (() => void) | undefined, mask?: boolean | undefined): number;
    /**
     *
     * @param props: toast props
     */
    offline(props: string | IToastProps, duration?: number | undefined, onClose?: (() => void) | undefined, mask?: boolean | undefined): number;
    /**
     *
     * @param props: toast props
     */
    loading(props: string | IToastProps, duration?: number | undefined, onClose?: (() => void) | undefined, mask?: boolean | undefined): number;
    remove: typeof remove;
    removeAll: typeof removeAll;
};
export default _default;
