import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface PaginationStyle {
    container: ViewStyle;
    numberStyle: ViewStyle;
    totalStyle: TextStyle;
    activeTextStyle: TextStyle;
    indicatorStyle: ViewStyle;
    pointStyle: ViewStyle;
    pointActiveStyle: ViewStyle;
    spaceStyle: ViewStyle;
}
declare const _default: (theme: Theme) => PaginationStyle;
export default _default;
