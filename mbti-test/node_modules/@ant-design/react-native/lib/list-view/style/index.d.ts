import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface ListStyle {
    underlayColor: ViewStyle;
    Header: TextStyle;
    Footer: TextStyle;
    Body: ViewStyle;
    BodyBottomLine: ViewStyle;
    Item: ViewStyle;
    Line: ViewStyle;
    Thumb: ImageStyle;
    Content: TextStyle;
    Extra: TextStyle;
    Brief: ViewStyle;
    BriefText: TextStyle;
    Arrow: ViewStyle;
    ArrowV: ViewStyle;
    multipleLine: ViewStyle;
    multipleThumb: ImageStyle;
    column: ViewStyle;
}
declare const _default: (variables: Theme) => ListStyle;
export default _default;
