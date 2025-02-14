import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

var Image = {
    name: 'taro-image',
    mixins: [listeners, refs],
    props: {
        mode: String
    },
    render(createElement) {
        return createElement('taro-image-core', {
            class: ['hydrated', {
                    'taro-img__widthfix': this.mode === 'widthFix'
                }],
            attrs: {
                mode: this.mode
            },
            on: this.listeners
        }, this.$slots.default);
    }
};

export { Image as default };
//# sourceMappingURL=image.js.map
