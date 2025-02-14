import { listeners } from './mixins/listeners.js';
import { refs } from './mixins/refs.js';

var ScrollView = {
    name: 'taro-scroll-view',
    mixins: [listeners, refs],
    props: {
        scrollX: Boolean,
        scrollY: Boolean
    },
    render(createElement) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const attrs = {};
        if (self.scrollX)
            attrs['scroll-x'] = true;
        if (self.scrollY)
            attrs['scroll-y'] = true;
        return createElement('taro-scroll-view-core', {
            class: ['hydrated', {
                    'taro-scroll-view__scroll-x': self.scrollX,
                    'taro-scroll-view__scroll-y': self.scrollY
                }],
            attrs,
            on: Object.assign(Object.assign({}, self.listeners), { scroll(e) {
                    if (e instanceof CustomEvent) {
                        self.$emit('scroll', e);
                    }
                } })
        }, self.$slots.default);
    }
};

export { ScrollView as default };
//# sourceMappingURL=scroll-view.js.map
