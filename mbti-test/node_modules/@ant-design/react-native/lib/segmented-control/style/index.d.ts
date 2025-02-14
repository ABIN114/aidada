import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface SegmentControlStyle {
    segment: ViewStyle;
    item: ViewStyle;
    itemLeftRadius: ViewStyle;
    itemRightRadius: ViewStyle;
    itemText: TextStyle;
}
declare const _default: (theme: Theme) => SegmentControlStyle;
export default _default;
