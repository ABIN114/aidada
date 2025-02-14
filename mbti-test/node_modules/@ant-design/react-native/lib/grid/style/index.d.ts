import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface GridStyle {
    grayBorderBox: ViewStyle;
    icon: ImageStyle;
    text: TextStyle;
}
declare const _default: (theme: Theme) => GridStyle;
export default _default;
