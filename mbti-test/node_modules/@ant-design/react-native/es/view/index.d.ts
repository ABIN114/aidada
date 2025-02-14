import React from 'react';
import { StyleProp, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
interface ViewInterface extends ViewProps, TextProps {
    children?: React.ReactNode | React.ReactText;
    style?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
}
declare class AntmView extends React.PureComponent<ViewInterface> {
    render(): JSX.Element;
}
export default AntmView;
