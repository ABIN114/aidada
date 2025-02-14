import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

function createComponent(name, classNames = []) {
    return {
        name,
        mixins: [listeners, refs],
        props: ['nativeProps'],
        render(createElement) {
            return createElement(`${name}-core`, {
                class: ['hydrated', ...classNames],
                domProps: {
                    nativeProps: this.nativeProps
                },
                attrs: this.$attrs,
                on: this.listeners
            }, this.$slots.default);
        }
    };
}

export { createComponent as default };
//# sourceMappingURL=createComponent.js.map
