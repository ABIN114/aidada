import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface InputItemStyle {
    container: ViewStyle;
    text: TextStyle;
    input: TextStyle;
    inputDisabled: TextStyle;
    inputErrorColor: TextStyle;
    clear: ViewStyle;
    extra: TextStyle;
    errorIcon: ViewStyle;
}
declare const _default: (theme: Theme) => InputItemStyle;
export default _default;
