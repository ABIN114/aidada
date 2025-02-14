import React from 'react';
import DrawerLayout, { DrawerLayoutProps } from 'react-native-gesture-handler/DrawerLayout';
import { DrawerProps } from './PropsType';
export interface DrawerNativeProps extends Partial<DrawerLayoutProps>, DrawerProps {
    drawerRef?: (el: DrawerLayout | null) => void;
    drawerWidth?: number;
    drawerBackgroundColor?: string;
    children?: React.ReactNode;
}
export default class Drawer extends React.Component<DrawerNativeProps, any> {
    static defaultProps: {
        position: string;
        open: boolean;
        drawerWidth: number;
    };
    drawer: DrawerLayout | null;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: DrawerNativeProps): void;
    onOpenChange(isOpen: boolean): void;
    render(): JSX.Element;
}
