import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

function createFormsComponent(name, event, modelValue = 'value', classNames = []) {
    const props = {
        nativeProps: {
            type: Object
        }
    };
    if (name === 'taro-input') {
        props.focus = Boolean;
    }
    return {
        name,
        mixins: [listeners, refs],
        model: {
            prop: modelValue,
            event: 'model'
        },
        props,
        methods: {
            input(e) {
                this.$emit('input', e);
                this.$emit('model', e.target.value);
            },
            change(e) {
                this.$emit('change', e);
                this.$emit('model', e.target.value);
            }
        },
        render(createElement) {
            // eslint-disable-next-line
            const self = this;
            const attrs = this.$attrs || {};
            if (name === 'taro-input') {
                attrs['auto-focus'] = self.focus;
            }
            const on = Object.assign({}, self.listeners);
            on[event] = self[event];
            return createElement(`${name}-core`, {
                class: ['hydrated', ...classNames],
                domProps: {
                    nativeProps: this.nativeProps
                },
                attrs,
                on
            }, self.$slots.default);
        }
    };
}

export { createFormsComponent as default };
//# sourceMappingURL=createFormsComponent.js.map
