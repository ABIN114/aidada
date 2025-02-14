import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface TextareaItemStyle {
    container: ViewStyle;
    input: TextStyle;
    icon: ViewStyle;
    errorIcon: ViewStyle;
    count: ViewStyle;
    countText: TextStyle;
}
declare const _default: (theme: Theme) => TextareaItemStyle;
export default _default;
