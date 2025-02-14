import { __rest } from 'tslib';
import { h } from 'vue';

function render (componentName, options, children) {
    const { attrs = {}, on = {}, props = {}, slots = {} } = options, el = __rest(options, ["attrs", "on", "props", "slots"]);
    if (process.env.FRAMEWORK === 'vue3') {
        // Events
        Object.keys(on).forEach(key => {
            const name = `on${key.charAt(0).toUpperCase()}${key.slice(1)}`;
            el[name] = on[key];
        });
        return h(componentName, Object.assign(Object.assign(Object.assign(Object.assign({}, attrs), props), slots), el), children);
    }
    return h(componentName, options, children);
}

export { render as default };
//# sourceMappingURL=vue-render.js.map
