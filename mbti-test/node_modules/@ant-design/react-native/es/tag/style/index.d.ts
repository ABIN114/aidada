import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface TagStyle {
    tag: ViewStyle;
    wrap: ViewStyle;
    wrapSmall: ViewStyle;
    text: TextStyle;
    textSmall: TextStyle;
    normalWrap: ViewStyle;
    normalText: TextStyle;
    activeWrap: ViewStyle;
    activeText: TextStyle;
    disabledWrap: ViewStyle;
    disabledText: TextStyle;
    close: ViewStyle;
}
declare const _default: (theme: Theme) => TagStyle;
export default _default;
