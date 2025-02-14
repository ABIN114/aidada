import * as React from 'react';
import AgreeItem from './AgreeItem';
import { CheckboxProps } from './Checkbox';
import CheckboxItem from './CheckboxItem';
import { CheckboxForwardedRef } from './PropsType';
export interface CompoundedComponent extends React.ForwardRefExoticComponent<CheckboxProps & {
    ref?: React.Ref<CheckboxForwardedRef>;
}> {
    AgreeItem: typeof AgreeItem;
    CheckboxItem: typeof CheckboxItem;
    __ANTM_CHECKBOX: boolean;
    onPress: () => void;
}
declare const Checkbox: CompoundedComponent;
export default Checkbox;
