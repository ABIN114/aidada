import React from 'react';
import { WithThemeStyles } from '../style';
import { PickerViewPropsType } from './PropsType';
import { PickerViewStyle } from './style';
export interface PickerViewProps extends PickerViewPropsType, WithThemeStyles<PickerViewStyle> {
}
declare const PickerView: React.ForwardRefExoticComponent<PickerViewProps & React.RefAttributes<any>>;
export default PickerView;
