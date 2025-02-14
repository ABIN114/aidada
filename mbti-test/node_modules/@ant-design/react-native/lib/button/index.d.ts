import React from 'react';
import { GestureResponderEvent, StyleProp, TouchableHighlightProps, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { ButtonPropsType } from './PropsType';
import { ButtonStyles } from './style/index';
export interface ButtonProps extends ButtonPropsType, WithThemeStyles<ButtonStyles>, TouchableHighlightProps {
    activeStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export default class Button extends React.Component<ButtonProps, any> {
    static defaultProps: {
        pressIn: boolean;
        disabled: boolean;
        loading: boolean;
        onPress: (_?: any) => void;
        onPressIn: (_?: any) => void;
        onPressOut: (_?: any) => void;
        onShowUnderlay: (_?: any) => void;
        onHideUnderlay: (_?: any) => void;
    };
    constructor(props: ButtonProps);
    onPressIn: (event: GestureResponderEvent) => void;
    onPressOut: (event: GestureResponderEvent) => void;
    onShowUnderlay: () => void;
    onHideUnderlay: () => void;
    render(): JSX.Element;
}
