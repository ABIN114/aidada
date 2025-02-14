import React from 'react';
import { TextStyle } from 'react-native';
import { Action, CallbackOnBackHandler } from './PropsType';
export interface OperationContainerProps {
    actions: Action<TextStyle>[];
    onAnimationEnd?: (visible: boolean) => void;
    onBackHandler?: CallbackOnBackHandler;
}
export default class OperationContainer extends React.Component<OperationContainerProps, any> {
    constructor(props: OperationContainerProps);
    onBackAndroid: () => boolean;
    onClose: () => void;
    render(): JSX.Element;
}
