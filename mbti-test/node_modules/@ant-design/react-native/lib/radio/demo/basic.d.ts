import React from 'react';
declare type RadioValue = string | number;
interface EventRadioGroup {
    target: {
        value: RadioValue;
    };
}
interface EventRadioItem {
    target: {
        checked: boolean;
    };
}
export default class BasicRadioExample extends React.Component<any, any> {
    state: {
        disabled: boolean;
        part1Value: number;
        part2Value: number;
        part3Value: number;
    };
    toggleDisabled: () => void;
    onChange: (part1Value: any, e: EventRadioItem) => void;
    onGroupChange2: (e: EventRadioGroup) => void;
    onGroupChange3: (e: EventRadioGroup) => void;
    render(): JSX.Element;
}
export {};
