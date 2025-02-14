import * as React from 'react';
import { RadioForwardedRef } from './PropsType';
import { RadioProps } from './Radio';
import RadioGroup from './RadioGroup';
import RadioItem from './RadioItem';
export interface CompoundedComponent extends React.ForwardRefExoticComponent<RadioProps & {
    ref?: React.Ref<RadioForwardedRef>;
}> {
    RadioItem: typeof RadioItem;
    Group: typeof RadioGroup;
    __ANTM_CHECKBOX: boolean;
    onPress: () => void;
}
declare const Radio: CompoundedComponent;
export default Radio;
