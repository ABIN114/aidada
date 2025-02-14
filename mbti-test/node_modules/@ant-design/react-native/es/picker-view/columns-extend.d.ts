import { PickerColumn, PickerValue } from './PropsType';
export declare function getColumns(d: PickerColumn | PickerColumn[], val: PickerValue[], cols: number, cascade: boolean): PickerColumn[];
export declare function getValueExtend(d: PickerColumn | PickerColumn[], val: PickerValue[], cols: number, cascade: boolean): {
    nextValue: (string | number)[];
    extend: import("./PropsType").PickerColumnItem[];
};
