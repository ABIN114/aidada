import { ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface CheckboxStyle {
    checkbox_wrapper: ViewStyle;
    checkbox_wave: ViewStyle;
    checkbox: ViewStyle;
    checkbox_checked: ViewStyle;
    checkbox_disabled: ViewStyle;
    checkbox_inner: ViewStyle;
    checkbox_inner_disabled: ViewStyle;
    checkbox_inner_after: ViewStyle;
    checkbox_inner_after_disabled: ViewStyle;
    checkbox_label: ViewStyle;
    checkbox_label_disabled: ViewStyle;
    checkbox_inner_indeterminate: ViewStyle;
    checkbox_inner_after_indeterminate: ViewStyle;
}
declare const _default: (theme: Theme) => CheckboxStyle;
export default _default;
