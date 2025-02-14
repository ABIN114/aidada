import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import alert from './alert';
import operation from './operation';
import prompt from './prompt';
import { CallbackOnBackHandler, ModalPropsType } from './PropsType';
import { ModalStyle } from './style/index';
export interface ModalProps extends ModalPropsType<TextStyle>, WithThemeStyles<ModalStyle> {
    style?: StyleProp<ViewStyle>;
    bodyStyle?: StyleProp<ViewStyle>;
    onRequestClose?: CallbackOnBackHandler;
    children?: React.ReactNode;
}
declare class AntmModal extends React.Component<ModalProps, any> {
    static defaultProps: {
        visible: boolean;
        closable: boolean;
        maskClosable: boolean;
        style: {};
        bodyStyle: {};
        animationType: string;
        onClose(): void;
        footer: never[];
        transparent: boolean;
        popup: boolean;
        animateAppear: boolean;
        operation: boolean;
    };
    static alert: typeof alert;
    static operation: typeof operation;
    static prompt: typeof prompt;
    static contextType: React.Context<{}>;
    render(): JSX.Element;
}
export default AntmModal;
