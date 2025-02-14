import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ListItemPropsType } from '../list/PropsType';
import { RefCheckboxProps } from './Checkbox';
import { CheckboxItemPropsType } from './PropsType';
interface CheckboxItemProps extends CheckboxItemPropsType, ListItemPropsType {
    style?: StyleProp<ViewStyle>;
    styles?: {
        [key: string]: StyleProp<ViewStyle>;
    };
}
export default class CheckboxItem extends React.PureComponent<CheckboxItemProps> {
    checkbox: RefCheckboxProps;
    handleClick: () => void;
    render(): JSX.Element;
}
export {};
