import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CheckboxStyle } from '../checkbox/style';
import { WithThemeStyles } from '../style';
import { RadioGroupPropsType } from './PropsType';
export interface RadioGroupProps extends RadioGroupPropsType, WithThemeStyles<CheckboxStyle> {
    style?: StyleProp<ViewStyle>;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<any>>>;
export default _default;
