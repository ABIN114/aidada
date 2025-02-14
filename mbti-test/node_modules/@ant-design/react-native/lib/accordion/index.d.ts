import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AccordionProps } from 'react-native-collapsible/Accordion';
import { WithThemeStyles } from '../style';
import AccordionStyles, { AccordionStyle } from './style/index';
export interface AccordionPanelProps {
    key?: string;
    header: any;
    children: React.ReactNode;
}
export interface AccordionNativeProps<T> extends WithThemeStyles<AccordionStyle>, Partial<AccordionProps<T>> {
    style?: StyleProp<ViewStyle>;
    children: React.ReactElement<AccordionPanelProps> | React.ReactElement<AccordionPanelProps>[];
}
export interface AccordionHeader {
    title: string;
    content: React.ReactElement<any>;
    style: StyleProp<ViewStyle>;
}
declare class AccordionPanel extends React.Component<AccordionPanelProps, any> {
    render(): null;
}
declare class Accordion<T extends AccordionHeader> extends React.Component<AccordionNativeProps<T>, any> {
    static Panel: typeof AccordionPanel;
    renderHeader: (styles: ReturnType<typeof AccordionStyles>) => (section: T, _: number, isActive: boolean) => JSX.Element;
    renderContent: (styles: ReturnType<typeof AccordionStyles>) => (section: T) => JSX.Element;
    render(): JSX.Element;
}
export default Accordion;
