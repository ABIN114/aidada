import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface NoticeBarStyle {
    notice: ViewStyle;
    container: ViewStyle;
    content: TextStyle;
    left6: ViewStyle;
    left15: ViewStyle;
    actionWrap: ViewStyle;
    close: TextStyle;
    link: TextStyle;
}
declare const _default: (variables: Theme) => NoticeBarStyle;
export default _default;
