import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface AccordionStyle {
    container: ViewStyle;
    header: ViewStyle;
    arrow: TextStyle;
    headerWrap: ViewStyle;
    headerText: TextStyle;
    content: ViewStyle;
    contentText: TextStyle;
}
declare const _default: (theme: Theme) => AccordionStyle;
export default _default;
