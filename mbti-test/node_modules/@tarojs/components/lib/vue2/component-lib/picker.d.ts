declare const _default: {
    name: string;
    mixins: ({
        computed: {
            listeners(): any;
        };
    } | {
        mounted(): void;
        beforeDestroy(): void;
    })[];
    model: {
        event: string;
    };
    props: {
        range: ArrayConstructor;
        rangeKey: StringConstructor;
        value: (ArrayConstructor | StringConstructor | NumberConstructor)[];
    };
    mounted(): void;
    watch: {
        value(newVal: any): void;
    };
    render(createElement: any): any;
};
export { _default as default };
