import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface BadgeStyle {
    wrap: ViewStyle;
    textCornerWrap: ViewStyle;
    dot: ViewStyle;
    dotSizelarge: ViewStyle;
    textDom: ViewStyle;
    textCorner: ViewStyle;
    textCornerlarge: ViewStyle;
    text: TextStyle;
}
declare const _default: (theme: Theme) => BadgeStyle;
export default _default;
