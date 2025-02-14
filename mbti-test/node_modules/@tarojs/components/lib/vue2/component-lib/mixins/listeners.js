const listeners = {
    computed: {
        listeners() {
            // eslint-disable-next-line
            const vm = this;
            return Object.assign(Object.assign({}, vm.$listeners), { click(e) {
                    vm.$emit('tap', e);
                } });
        }
    }
};

export { listeners };
//# sourceMappingURL=listeners.js.map
