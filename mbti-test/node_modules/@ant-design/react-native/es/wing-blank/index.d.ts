import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface WingBlankProps {
    style?: StyleProp<ViewStyle>;
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}
declare class WingBlank extends React.Component<WingBlankProps, any> {
    static defaultProps: {
        size: string;
    };
    render(): JSX.Element;
}
export default WingBlank;
