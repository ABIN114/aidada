import React from 'react';
import { PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend } from '../picker-view/PropsType';
import { PickerPropsType } from './PropsType';
export interface PickerProps extends PickerPropsType {
}
export { PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend };
declare const Picker: React.ForwardRefExoticComponent<PickerProps & React.RefAttributes<import("./Picker").PickerActions>>;
export default Picker;
