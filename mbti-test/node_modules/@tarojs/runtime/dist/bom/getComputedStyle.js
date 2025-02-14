import env from '../env.js';

const getComputedStyle = process.env.TARO_PLATFORM === 'web' ? env.window.getComputedStyle : function (element) {
    return element.style;
};

export { getComputedStyle };
//# sourceMappingURL=getComputedStyle.js.map
