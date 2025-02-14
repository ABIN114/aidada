import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CheckboxStyle } from '../checkbox/style';
import { WithThemeStyles } from '../style';
import { RadioPropsType } from './PropsType';
export interface RadioProps extends RadioPropsType, WithThemeStyles<CheckboxStyle> {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
declare const AntmRadio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<unknown>>;
export default AntmRadio;
