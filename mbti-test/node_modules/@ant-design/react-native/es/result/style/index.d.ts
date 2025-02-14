import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ResultStyle {
    result: ViewStyle;
    imgWrap: ViewStyle;
    img: ImageStyle;
    title: ViewStyle;
    titleText: TextStyle;
    message: ViewStyle;
    messageText: TextStyle;
    buttonWrap: ViewStyle;
    button: ViewStyle;
}
declare const _default: (theme: Theme) => ResultStyle;
export default _default;
