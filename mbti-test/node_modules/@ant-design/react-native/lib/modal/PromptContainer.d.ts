import React from 'react';
import { TextStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { CallbackOnBackHandler, CallbackOrActions } from './PropsType';
import { PromptStyle } from './style/prompt';
export interface PropmptContainerProps extends WithThemeStyles<PromptStyle> {
    title: React.ReactNode;
    message?: React.ReactNode;
    type?: 'default' | 'login-password' | 'secure-text';
    defaultValue?: string;
    actions: CallbackOrActions<TextStyle>;
    onAnimationEnd?: (visible: boolean) => void;
    placeholders?: string[];
    onBackHandler?: CallbackOnBackHandler;
}
export default class PropmptContainer extends React.Component<PropmptContainerProps, any> {
    static defaultProps: {
        type: string;
        defaultValue: string;
    };
    static contextType: React.Context<{}>;
    constructor(props: PropmptContainerProps);
    onBackAndroid: () => boolean;
    onClose: () => void;
    onChangeText(type: string, value: string): void;
    render(): JSX.Element;
}
