import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface TabBarStyle {
    tabbar: ViewStyle;
    content: ViewStyle;
    tabs: ViewStyle;
    barItem: ViewStyle;
    barIcon: ImageStyle;
    barItemSelected: ViewStyle;
    barItemTitle: TextStyle;
    contentItem: ViewStyle;
    contentItemSelected: ViewStyle;
    badge: ViewStyle;
    badgeText: TextStyle;
}
declare const _default: (theme: Theme) => TabBarStyle;
export default _default;
