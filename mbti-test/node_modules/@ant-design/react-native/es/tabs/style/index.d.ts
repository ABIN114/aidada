import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface TabBarStyle {
    container: ViewStyle;
    tabs: ViewStyle;
    tab: ViewStyle;
    underline: ViewStyle;
    textStyle: TextStyle;
}
declare const _default: (theme: Theme) => TabBarStyle;
export default _default;
