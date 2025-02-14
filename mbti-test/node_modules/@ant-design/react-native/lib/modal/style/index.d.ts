import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ModalStyle {
    container: ViewStyle;
    wrap: ViewStyle;
    popupContainer: ViewStyle;
    innerContainer: ViewStyle;
    popupSlideUp: ViewStyle;
    popupSlideDown: ViewStyle;
    footer: ViewStyle;
    header: TextStyle;
    body: ViewStyle;
    maskClosable: ViewStyle;
    closeWrap: ViewStyle;
    close: TextStyle;
    buttonGroupH: ViewStyle;
    buttonGroupV: ViewStyle;
    buttonWrapH: ViewStyle;
    buttonWrapV: ViewStyle;
    buttonText: TextStyle;
    operationContainer: ViewStyle;
    operationBody: ViewStyle;
    buttonTextOperation: TextStyle;
}
declare const _default: (theme: Theme) => ModalStyle;
export default _default;
