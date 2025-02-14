import React from 'react';
import { Carousel } from '../../';
export default class BasicCarouselExample extends React.Component<any, any> {
    carousel: null | Carousel;
    constructor(props: any);
    onHorizontalSelectedIndexChange: (index: number) => void;
    onVerticalSelectedIndexChange(index: number): void;
    render(): JSX.Element;
}
