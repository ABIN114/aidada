import { FunctionComponent } from 'react';
import { PickerViewStyle } from '../picker-view/style';
import { WithThemeStyles } from '../style';
import { DatePickerViewPropsType } from './PropsType';
export interface DatePickerViewProps extends DatePickerViewPropsType, WithThemeStyles<PickerViewStyle> {
}
declare const DatePickerView: FunctionComponent<DatePickerViewProps>;
export default DatePickerView;
