import { ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface SwitchStyle {
    switch: ViewStyle;
    switch_inner: ViewStyle;
    switch_handle: ViewStyle;
    switch_checked: ViewStyle;
    switch_unchecked: ViewStyle;
    switch_inner_checked: ViewStyle;
    switch_inner_unchecked: ViewStyle;
    switch_handle_checked: ViewStyle;
    switch_handle_unchecked: ViewStyle;
    switch_checked_disabled: ViewStyle;
    switch_unchecked_disabled: ViewStyle;
    switch_handle_disabled: ViewStyle;
}
declare const _default: (theme: Theme) => SwitchStyle;
export default _default;
