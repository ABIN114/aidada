import * as React from 'react';
import { Locale } from '../locale-provider';
import { Theme } from '../style';
export interface ProviderProps {
    locale?: Partial<Locale>;
    theme?: Partial<Theme>;
    children: React.ReactNode;
}
export default class Provider extends React.Component<ProviderProps> {
    render(): JSX.Element;
}
