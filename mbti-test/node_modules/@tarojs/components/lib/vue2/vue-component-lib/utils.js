const createCommonMethod = (methodName) => function (...args) {
    this.$refs.wc[methodName](...args);
};
const toLowerCase = (str) => str.toLowerCase();
const toDashCase = (str) => toLowerCase(str
    .replace(/([A-Z0-9])/g, (g) => ' ' + g[0])
    .trim()
    .replace(/ /g, '-'));
const createCommonRender = (tagName, eventNames = [], defineCustomElement) => {
    /**
     * Create a Vue component wrapper around a Web Component.
     * Note: The `props` here are not all properties on a component.
     * They refer to whatever properties are set on an instance of a component.
     */
    if (!DEPRECATED_ADAPTER_COMPONENT && defineCustomElement !== undefined) {
        defineCustomElement();
    }
    return function (createElement) {
        const vueElement = this;
        const allListeners = eventNames.reduce((listeners, eventName) => {
            return Object.assign(Object.assign({}, listeners), { [eventName]: (event) => {
                    vueElement.$emit(eventName, event);
                    // Note(taro): 优化 input、change 事件与 v-model 兼容性问题
                    if (['input', 'change'].includes(eventName)) {
                        vueElement.$emit('update:modelValue', event.detail.value);
                    }
                } });
        }, vueElement.$listeners);
        const attributes = vueElement.$props
            ? Object.keys(vueElement.$props).reduce((attrs, prop) => {
                const attributeName = toDashCase(prop);
                attrs[attributeName] = vueElement.$props[prop];
                return attrs;
            }, {})
            : {};
        return createElement(tagName, {
            ref: 'wc',
            domProps: vueElement.$props,
            on: Object.assign(Object.assign({}, allListeners), { 
                // Note(taro): click 事件绑定 tap 事件触发
                click: (event) => {
                    typeof allListeners.click === 'function' && allListeners.click(event);
                    vueElement.$emit('tap', event);
                } }),
            attrs: Object.assign(Object.assign({}, attributes), { 'data-testid': tagName }),
        }, [vueElement.$slots.default]);
    };
};

export { createCommonMethod, createCommonRender, toDashCase, toLowerCase };
//# sourceMappingURL=utils.js.map
