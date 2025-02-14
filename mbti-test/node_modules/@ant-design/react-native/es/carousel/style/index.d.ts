import { ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface CarouselStyle {
    pagination: ViewStyle;
    paginationX: ViewStyle;
    paginationY: ViewStyle;
    pointStyle: ViewStyle;
    pointActiveStyle: ViewStyle;
    spaceStyle: ViewStyle;
    wrapperStyle: ViewStyle;
}
declare const _default: (theme: Theme) => CarouselStyle;
export default _default;
