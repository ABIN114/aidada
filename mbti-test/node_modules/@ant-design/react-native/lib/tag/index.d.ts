import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { TagPropsType } from './PropsType';
import { TagStyle } from './style/index';
export interface TagNativeProps extends TagPropsType, WithThemeStyles<TagStyle> {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export default class Tag extends React.Component<TagNativeProps, any> {
    static defaultProps: {
        disabled: boolean;
        small: boolean;
        selected: boolean;
        closable: boolean;
        onClose(): void;
        afterClose(): void;
        onChange(): void;
        onLongPress(): void;
    };
    constructor(props: TagNativeProps);
    UNSAFE_componentWillReceiveProps(nextProps: TagNativeProps): void;
    onPress: () => void;
    handleLongPress: () => void;
    onTagClose: () => void;
    render(): JSX.Element;
}
