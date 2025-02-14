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
    props: {
        type: StringConstructor;
    };
    render(createElement: any): any;
};
export { _default as default };
