import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface PromptStyle {
    message: TextStyle;
    inputGroup: ViewStyle;
    inputWrapper: ViewStyle;
    input: TextStyle;
    inputFirst: ViewStyle;
    inputLast: ViewStyle;
}
declare const _default: (variables: Theme) => PromptStyle;
export default _default;
