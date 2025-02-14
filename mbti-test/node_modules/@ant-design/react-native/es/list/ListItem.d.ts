import React from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { BriefProps as BriefBasePropsType, ListItemPropsType } from './PropsType';
import { ListStyle } from './style/index';
export interface ListItemProps extends ListItemPropsType, WithThemeStyles<ListStyle> {
    onPress?: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    delayLongPress?: number;
    onLongPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
}
export interface BriefProps extends BriefBasePropsType, WithThemeStyles<Pick<ListStyle, 'Brief' | 'BriefText'>> {
}
export declare class Brief extends React.Component<BriefProps, any> {
    render(): JSX.Element;
}
export default class Item extends React.Component<ListItemProps, any> {
    static defaultProps: Partial<ListItemProps>;
    static Brief: typeof Brief;
    render(): JSX.Element;
}
