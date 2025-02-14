import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ActivityIndicatorStyle {
    container: ViewStyle;
    innerContainer: ViewStyle;
    wrapper: ViewStyle;
    tip: TextStyle;
    toast: TextStyle;
    spinner: ViewStyle;
}
declare const _default: (theme: Theme) => ActivityIndicatorStyle;
export default _default;
