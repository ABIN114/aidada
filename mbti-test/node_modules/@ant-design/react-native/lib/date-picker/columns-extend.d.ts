import { PickerColumn, PickerValue } from '../picker-view/PropsType';
import { Precision } from './date-picker-utils';
export declare function getValueExtend(d: PickerColumn[], val: PickerValue[], mode: Precision): {
    dateValue: Date;
    extend: PickerColumn;
};
export declare function usePickerValue(val: Date | undefined, minDate: Date, maxDate: Date, mode: Precision): string[];
