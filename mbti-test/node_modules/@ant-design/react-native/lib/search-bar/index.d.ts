import React from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputFocusEventData, TextInputProps, TextStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { SearchBarPropsType, SearchBarState } from './PropsType';
import { SearchBarStyle } from './style/index';
export interface SearchBarProps extends SearchBarPropsType, WithThemeStyles<SearchBarStyle>, Omit<TextInputProps, 'onChange'> {
    onChangeText?: (text: string) => void;
    onSubmitEditing?: (event: {
        nativeEvent: {
            text: string;
        };
    }) => void;
    style?: StyleProp<TextStyle>;
}
export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps: {
        placeholder: string;
        onSubmit: () => void;
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onClear: () => void;
        showCancelButton: boolean;
        disabled: boolean;
    };
    static contextType: React.Context<{}>;
    inputRef: TextInput | null;
    constructor(props: SearchBarProps);
    UNSAFE_componentWillReceiveProps(nextProps: SearchBarProps): void;
    onSubmit: (_: {
        nativeEvent: {
            text: string;
        };
    }) => void;
    onChangeText: (value: string) => void;
    onCancel: () => void;
    onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    render(): JSX.Element;
}
