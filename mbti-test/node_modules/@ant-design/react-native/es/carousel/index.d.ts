import React from 'react';
import { LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import CarouselStyles, { CarouselStyle } from './style/index';
export interface CarouselPropsType extends WithThemeStyles<CarouselStyle>, ScrollViewProps {
    accessibilityLabel?: string;
    pageStyle?: ViewStyle;
    children?: React.ReactNode;
    selectedIndex?: number;
    dots?: boolean;
    vertical?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    infinite?: boolean;
}
export interface CarouselProps extends CarouselPropsType {
    style?: StyleProp<ViewStyle>;
    dotStyle?: StyleProp<ViewStyle>;
    dotActiveStyle?: StyleProp<ViewStyle>;
    pagination?: (props: PaginationProps) => React.ReactNode;
    afterChange?: (index: number) => void;
}
interface NativeScrollPoint {
    x: number;
    y: number;
}
interface TargetedEvent {
    target: number;
}
export interface CarouselState {
    width: number;
    height: number;
    selectedIndex: number;
    afterSelectedIndex: number;
    isScrolling: boolean;
    offset: NativeScrollPoint;
}
export interface PaginationProps {
    vertical?: boolean;
    current: number;
    count: number;
    styles: ReturnType<typeof CarouselStyles>;
    dotStyle?: StyleProp<ViewStyle>;
    dotActiveStyle?: StyleProp<ViewStyle>;
}
declare class Carousel extends React.PureComponent<CarouselProps, CarouselState> {
    static defaultProps: CarouselProps;
    private count;
    private scrollview;
    constructor(props: CarouselProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: CarouselProps): void;
    private autoplayTimer;
    private scrollEndTimter;
    componentWillUnmount(): void;
    onScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onTouchStartForWeb: () => void;
    onTouchEndForWeb: () => void;
    onScrollForWeb: (e: any) => void;
    onLayout: (e: NativeSyntheticEvent<TargetedEvent & {
        layout: LayoutRectangle;
    }>) => void;
    updateIndex: (currentOffset: NativeScrollPoint) => void;
    scrollToStart: () => void;
    scrollToEnd: () => void;
    scrollNextPage: () => void;
    /**
     * go to index
     * @param index
     * @param animated
     */
    goTo(index: number, animated?: boolean): void;
    render(): JSX.Element | null;
    private autoplay;
    private renderScroll;
    private renderDots;
}
export default Carousel;
