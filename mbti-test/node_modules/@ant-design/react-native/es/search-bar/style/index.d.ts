import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface SearchBarStyle {
    input: TextStyle;
    inputWrapper: ViewStyle;
    wrapper: ViewStyle;
    cancelTextContainer: ViewStyle;
    cancelText: TextStyle;
    search: TextStyle;
}
declare const _default: (theme: Theme) => SearchBarStyle;
export default _default;
