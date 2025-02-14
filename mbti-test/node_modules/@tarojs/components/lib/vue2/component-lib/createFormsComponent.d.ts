declare function createFormsComponent(name: any, event: any, modelValue?: string, classNames?: any[]): {
    name: any;
    mixins: ({
        computed: {
            listeners(): any;
        };
    } | {
        mounted(): void;
        beforeDestroy(): void;
    })[];
    model: {
        prop: string;
        event: string;
    };
    props: Record<string, any>;
    methods: {
        input(e: any): void;
        change(e: any): void;
    };
    render(createElement: any): any;
};
export { createFormsComponent as default };
