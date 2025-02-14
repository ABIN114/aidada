import React from 'react';
export default class ToastExample extends React.Component<any, any> {
    timer: any;
    state: {
        enableMask: boolean | undefined;
        enableStack: boolean | undefined;
    };
    componentWillUnmount(): void;
    render(): JSX.Element;
}
