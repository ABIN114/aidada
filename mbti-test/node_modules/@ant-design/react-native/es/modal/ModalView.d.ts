import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CallbackOnBackHandler } from './PropsType';
export interface IModalPropTypes {
    wrapStyle?: StyleProp<ViewStyle>;
    maskStyle?: StyleProp<ViewStyle>;
    style?: {};
    children?: React.ReactNode;
    animationType: 'none' | 'fade' | 'slide-up' | 'slide-down';
    animationDuration?: number;
    visible: boolean;
    maskClosable?: boolean;
    animateAppear?: boolean;
    onClose?: () => void;
    onAnimationEnd?: (visible: boolean) => void;
    onRequestClose?: CallbackOnBackHandler;
}
export default class RCModal extends React.Component<IModalPropTypes, any> {
    static defaultProps: IModalPropTypes;
    animMask: any;
    animDialog: any;
    constructor(props: IModalPropTypes);
    UNSAFE_componentWillReceiveProps(nextProps: IModalPropTypes): void;
    shouldComponentUpdate(nextProps: IModalPropTypes, nextState: any): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IModalPropTypes): void;
    componentWillUnmount(): void;
    onBackAndroid: () => boolean;
    animateMask: (visible: boolean) => void;
    stopMaskAnim: () => void;
    stopDialogAnim: () => void;
    animateDialog: (visible: boolean) => void;
    close: () => void;
    onMaskClose: () => void;
    getPosition: (visible: boolean) => number;
    getScale: (visible: boolean) => 1 | 1.05;
    getOpacity: (visible: boolean) => 1 | 0;
    render(): any;
}
