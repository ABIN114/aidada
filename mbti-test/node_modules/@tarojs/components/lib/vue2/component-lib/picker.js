import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

var Picker = {
    name: 'taro-picker',
    mixins: [listeners, refs],
    model: {
        event: 'model'
    },
    props: {
        range: Array,
        rangeKey: String,
        value: [Number, String, Array]
    },
    mounted() {
        this.$el.value = this.value;
    },
    watch: {
        value(newVal) {
            this.$el.value = newVal;
        }
    },
    render(createElement) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return createElement('taro-picker-core', {
            class: 'hydrated',
            domProps: {
                range: self.range,
                rangeKey: self.rangeKey
            },
            on: Object.assign(Object.assign({}, self.listeners), { change(e) {
                    self.$emit('change', e);
                    self.$emit('model', e.target.value);
                } })
        }, self.$slots.default);
    }
};

export { Picker as default };
//# sourceMappingURL=picker.js.map
