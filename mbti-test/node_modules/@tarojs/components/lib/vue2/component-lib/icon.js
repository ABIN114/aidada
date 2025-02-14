import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

var Icon = {
    name: 'taro-icon',
    mixins: [listeners, refs],
    props: {
        type: String
    },
    render(createElement) {
        const iconType = this.type.replace(/_/g, '-');
        return createElement('taro-icon-core', {
            class: ['hydrated', `weui-icon-${iconType}`],
            attrs: {
                type: this.type
            },
            on: this.listeners
        }, this.$slots.default);
    }
};

export { Icon as default };
//# sourceMappingURL=icon.js.map
