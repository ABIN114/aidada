declare function createComponent(name: any, classNames?: any[]): {
    name: any;
    mixins: ({
        computed: {
            listeners(): any;
        };
    } | {
        mounted(): void;
        beforeDestroy(): void;
    })[];
    props: string[];
    render(createElement: any): any;
};
export { createComponent as default };
