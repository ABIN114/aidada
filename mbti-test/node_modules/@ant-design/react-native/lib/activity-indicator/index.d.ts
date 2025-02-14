import React from 'react';
import { ColorValue } from 'react-native';
import { WithThemeStyles } from '../style';
import { ActivityIndicatorStyle } from './style/index';
export interface ActivityIndicatorNativeProps extends WithThemeStyles<ActivityIndicatorStyle> {
    color?: ColorValue;
    animating?: boolean;
    toast?: boolean;
    size?: number | 'large' | 'small';
    text?: string;
}
export default class RNActivityIndicator extends React.Component<ActivityIndicatorNativeProps, any> {
    static defaultProps: {
        animating: boolean;
        color: string;
        size: string;
        toast: boolean;
    };
    _renderToast(): JSX.Element;
    _renderSpinner(): JSX.Element;
    render(): JSX.Element | null;
}
