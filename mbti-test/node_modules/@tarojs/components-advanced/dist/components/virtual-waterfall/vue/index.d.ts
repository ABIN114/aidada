import { ElementAttrs, TransformReact2VueType, VueComponentType } from '@tarojs/components/types/index.vue3';
import { App } from 'vue';
import { VirtualWaterfallProps } from "../index.js";
type VueVirtualWaterfallProps = Omit<VirtualWaterfallProps, 'renderTop' | 'renderBottom'>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'virtual-waterfall': ElementAttrs<TransformReact2VueType<VueVirtualWaterfallProps>>;
        }
    }
}
declare const VirtualWaterfall: VueComponentType<VueVirtualWaterfallProps>;
declare function install(Vue: App): void;
declare const _default: {
    install: typeof install;
};
export { _default as default, VueVirtualWaterfallProps, VirtualWaterfall };
