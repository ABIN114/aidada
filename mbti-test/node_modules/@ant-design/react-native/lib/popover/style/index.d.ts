import { ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface PopoverStyle {
    content: ViewStyle;
    arrow: ViewStyle;
    background: ViewStyle;
}
declare const _default: (theme: Theme) => PopoverStyle;
export default _default;
