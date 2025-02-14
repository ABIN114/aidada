import React from 'react';
import ListMap from "../list-map.js";
import Preset from "../preset.js";
import { IProps } from "../preset.js";
interface IState {
    instance: Waterfall;
    isScrolling: boolean;
    scrollDirection: 'forward' | 'backward';
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
    refreshCount: number;
}
declare class Waterfall extends React.PureComponent<IProps, IState> {
    static defaultProps: IProps;
    itemMap: ListMap;
    preset: Preset;
    constructor(props: IProps);
    refresh: () => void;
    _outerRef: any;
    _resetIsScrollingTimeoutId: any;
    _callOnItemsRendered: import("memoize-one").MemoizedFn<(this: any, columnIndex: any, overscanStartIndex: any, overscanStopIndex: any) => any>;
    _callOnScroll: import("memoize-one").MemoizedFn<(this: any, scrollDirection: any, scrollOffset: any, scrollUpdateWasRequested: any, detail: any) => void>;
    _callPropsCallbacks(prevProps?: any, prevState?: any): void;
    // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.
    _getRangeToRender(columnIndex?: number): number[];
    _outerRefSetter: (ref: any) => void;
    _resetIsScrollingDebounced: () => void;
    _resetIsScrolling: () => void;
    _onScroll: (event: any) => void;
    scrollTo(scrollOffset?: number, enhanced?: true): Promise<any>;
    scrollToItem(index: number, align?: string, enhanced?: true): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps, prevState: IState): void;
    componentWillUnmount(): void;
    getRenderItemNode(itemIndex: number, type?: 'node' | 'placeholder'): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getRenderColumnNode(columnIndex: number): React.ReactElement<{}, string | React.JSXElementConstructor<any>>;
    render(): React.ReactElement<{}, string | React.JSXElementConstructor<any>>;
}
export { Waterfall as default };
