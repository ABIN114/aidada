import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface CardStyle {
    card: ViewStyle;
    full: ViewStyle;
    headerWrap: ViewStyle;
    headerTitle: ViewStyle;
    headerImage: ImageStyle;
    headerContentWrap: ViewStyle;
    headerContent: TextStyle;
    headerExtraWrap: ViewStyle;
    headerExtra: TextStyle;
    body: ViewStyle;
    footerWrap: ViewStyle;
    footerContent: TextStyle;
    footerExtra: TextStyle;
}
declare const _default: (theme: Theme) => CardStyle;
export default _default;
