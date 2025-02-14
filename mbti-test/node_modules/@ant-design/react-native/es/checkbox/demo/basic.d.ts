import React from 'react';
export default class BasicCheckboxExample extends React.Component<any, any> {
    constructor(props: any, context: any);
    onChange: (e: {
        target: {
            checked: boolean;
        };
    }) => void;
    toggleChecked: () => void;
    toggleDisable: () => void;
    onChange2: (e: {
        target: {
            checked: boolean;
        };
    }) => void;
    render(): JSX.Element;
}
