declare const components: (string | (string | {
    type: string;
    component: {
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
            scrollX: BooleanConstructor;
            scrollY: BooleanConstructor;
        };
        render(createElement: any): any;
    };
})[] | (string | {
    classNames: string[];
})[] | (string | {
    type: string;
    component: {
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
})[] | (string | {
    type: string;
    component: {
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
            selectable: BooleanConstructor;
        };
        render(createElement: any): any;
    };
})[] | (string | {
    type: string;
    event: string;
})[] | (string | {
    type: string;
    component: {
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
})[] | (string | {
    type: string;
    event: string;
    modelValue: string;
    classNames: string[];
})[] | (string | {
    type: string;
    event: string;
    modelValue: string;
})[] | (string | {
    type: string;
    component: {
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
            mode: StringConstructor;
        };
        render(createElement: any): any;
    };
})[])[];
export { components as default };
