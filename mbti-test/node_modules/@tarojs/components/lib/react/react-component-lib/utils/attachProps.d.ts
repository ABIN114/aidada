declare const getClassName: (classList: DOMTokenList, newProps: any, oldProps: any) => string;
declare const isCoveredByReact: (__eventNameSuffix: string) => boolean;
interface EventCenter {
    [key: string]: EventCenter.EventCallback | undefined;
}
declare namespace EventCenter {
    interface EventCallback {
        (e: Event): any;
        fn?: (e: Event) => any;
    }
}
type HTMLElementWithEvents = HTMLElement & {
    __events?: EventCenter;
};
declare const syncEvent: (node: HTMLElementWithEvents, eventName: string, newEventHandler?: (e: Event) => any) => void;
declare const attachProps: (node: HTMLElementWithEvents, newProps: any, oldProps?: any) => void;
declare function applyUnControlledDefaultValue(node: HTMLElementWithEvents, props: any): void;
export { getClassName, isCoveredByReact, syncEvent, attachProps, applyUnControlledDefaultValue };
