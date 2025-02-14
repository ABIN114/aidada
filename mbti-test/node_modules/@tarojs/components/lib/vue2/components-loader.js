import Vue from 'vue';
import index from './node_modules/.pnpm/registry.npmjs.org_vue-fragment@1.6.0_vue@2.7.14/node_modules/vue-fragment/dist/vue-fragment.esm.js';

function initVue2Components(components = {}) {
    var _a;
    const ignoredElements = [/^taro-/, 'root', 'block'];
    if (!((_a = Vue.config.ignoredElements) === null || _a === void 0 ? void 0 : _a.includes(ignoredElements[0]))) {
        Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...ignoredElements];
    }
    Vue.use(index.Plugin);
    Object.entries(components).forEach(([name, definition]) => {
        if (typeof definition === 'function') {
            const tagName = 'taro' + name.replace(new RegExp('([A-Z])', 'g'), '-$1').toLowerCase();
            const comp = Vue.extend(definition);
            Vue.component(tagName, comp);
        }
    });
}

export { initVue2Components };
//# sourceMappingURL=components-loader.js.map
