import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ToastStyle {
    container: ViewStyle;
    innerContainer: ViewStyle;
    innerWrap: ViewStyle;
    iconToast: ViewStyle;
    textToast: ViewStyle;
    content: TextStyle;
    image: TextStyle;
    centering: ViewStyle;
}
declare const _default: (theme: Theme) => ToastStyle;
export default _default;
