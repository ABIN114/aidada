import * as React from 'react';
import { AccessibilityProps, StyleProp, ViewStyle } from 'react-native';
import { WithThemeStyles } from '../style';
import { CheckboxPropsType } from './PropsType';
import { CheckboxStyle } from './style/index';
export interface CheckboxProps extends CheckboxPropsType, WithThemeStyles<CheckboxStyle>, AccessibilityProps {
    style?: StyleProp<ViewStyle>;
}
export interface RefCheckboxProps {
    onPress: () => void;
}
declare const AntmCheckbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<any>>;
export default AntmCheckbox;
