import { ElementAttrs, TransformReact2VueType, VueComponentType } from '@tarojs/components/types/index.vue3';
import { App } from 'vue';
import { VirtualListProps } from "../index.js";
type VueVirtualListProps = Omit<VirtualListProps, 'renderTop' | 'renderBottom'>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'virtual-list': ElementAttrs<TransformReact2VueType<VueVirtualListProps>>;
        }
    }
}
declare const VirtualList: VueComponentType<VueVirtualListProps>;
declare function install(Vue: App): void;
declare const _default: {
    install: typeof install;
};
export { _default as default, VueVirtualListProps, VirtualList };
