interface StencilReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
    forwardedRef: React.RefObject<ElementType>;
    ref?: React.Ref<any>;
}
declare const manipulatePropsFunction: <ElementType>(originalProps: StencilReactInternalProps<ElementType>, propsToPass?: Record<string, unknown>) => {
    dangerouslySetInnerHTML: {
        __html: string | TrustedHTML;
    };
};
export { manipulatePropsFunction };
