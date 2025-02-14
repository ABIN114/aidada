import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ActionSheetStyle {
    container: ViewStyle;
    wrap: ViewStyle;
    content: ViewStyle;
    mask: ViewStyle;
    title: ViewStyle;
    titleText: TextStyle;
    message: ViewStyle;
    btn: ViewStyle;
    btnText: TextStyle;
    cancelBtn: ViewStyle;
    cancelBtnMask: ViewStyle;
    destructiveBtn: TextStyle;
}
declare const _default: (theme: Theme) => ActionSheetStyle;
export default _default;
