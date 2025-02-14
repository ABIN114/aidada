import { TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../style';
export interface StepperStyle {
    container: ViewStyle;
    input: TextStyle;
    stepWrap: ViewStyle;
    stepText: TextStyle;
    stepDisabled: ViewStyle;
    disabledStepTextColor: TextStyle;
    highlightStepTextColor: TextStyle;
    highlightStepBorderColor: ViewStyle;
}
declare const _default: (theme: Theme) => StepperStyle;
export default _default;
