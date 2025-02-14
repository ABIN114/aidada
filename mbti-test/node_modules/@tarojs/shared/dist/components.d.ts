declare const touchEvents: {
    bindTouchStart: string;
    bindTouchMove: string;
    bindTouchEnd: string;
    bindTouchCancel: string;
    bindLongTap: string;
};
declare const animation: {
    animation: string;
    bindAnimationStart: string;
    bindAnimationIteration: string;
    bindAnimationEnd: string;
    bindTransitionEnd: string;
};
declare function singleQuote(s: string): string;
declare const internalComponents: Record<string, Record<string, string>>;
declare const controlledComponent: Set<string>;
declare const focusComponents: Set<string>;
declare const voidElements: Set<string>;
declare const nestElements: Map<string, number>;
export { touchEvents, animation, singleQuote, internalComponents, controlledComponent, focusComponents, voidElements, nestElements };
