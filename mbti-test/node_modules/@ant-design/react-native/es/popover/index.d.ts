import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Placement } from 'react-native-modal-popover/lib/PopoverGeometry';
import { WithThemeStyles } from '../style';
import { PopoverStyle } from './style';
export interface PopoverProps extends WithThemeStyles<PopoverStyle> {
    triggerStyle?: StyleProp<ViewStyle>;
    onSelect?: (node: any, index?: number) => void;
    overlay: React.ReactNode;
    disabled?: boolean;
    renderOverlayComponent?: (node: React.ReactNode, closePopover: () => void) => React.ReactNode;
    placement?: Placement | 'auto';
    duration?: number;
    easing?: (show: boolean) => (value: number) => number;
    useNativeDriver?: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
}
export interface PopoverItemProps {
    value: any;
    [key: string]: any;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare class PopoverItem extends React.PureComponent<PopoverItemProps> {
    static displayName: 'PopoverItem';
    render(): JSX.Element;
}
export default class Popover extends React.PureComponent<PopoverProps, any> {
    static defaultProps: {
        onSelect: () => void;
    };
    static Item: typeof PopoverItem;
    onSelect: (value: any, closePopover: any) => void;
    renderOverlay: (closePopover: any) => React.ReactNode;
    render(): JSX.Element;
}
