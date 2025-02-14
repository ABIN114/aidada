"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostcssPlugins = exports.getDefaultPostcssConfig = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const resolve_1 = require("resolve");
const platform = 'h5';
const defaultAutoprefixerOption = {
    enable: true,
    config: {
        flexbox: 'no-2009'
    }
};
const defaultPxtransformOption = {
    enable: true,
    config: {
        platform
    }
};
const defaultConstparseOption = {
    constants: [
        {
            key: 'taro-tabbar-height',
            val: '50PX'
        }
    ],
    platform
};
const defaultHtmltransformOption = {
    enable: true,
    config: {
        platform,
        removeCursorStyle: false
    }
};
const defaultUrlOption = {
    enable: true,
    config: {
        url: 'rebase'
    }
};
const plugins = [];
const getDefaultPostcssConfig = function ({ designWidth, deviceRatio, option = {}, alias = {} }) {
    const { autoprefixer, pxtransform, htmltransform, url } = option, options = __rest(option, ["autoprefixer", "pxtransform", "htmltransform", "url"]);
    if (designWidth) {
        defaultPxtransformOption.config.designWidth = designWidth;
    }
    if (deviceRatio) {
        defaultPxtransformOption.config.deviceRatio = deviceRatio;
    }
    const autoprefixerOption = (0, helper_1.recursiveMerge)({}, defaultAutoprefixerOption, autoprefixer);
    const pxtransformOption = (0, helper_1.recursiveMerge)({}, defaultPxtransformOption, pxtransform);
    const htmltransformOption = (0, helper_1.recursiveMerge)({}, defaultHtmltransformOption, htmltransform);
    const urlOption = (0, helper_1.recursiveMerge)({}, defaultUrlOption, url);
    return [
        ['postcss-import', {}, require('postcss-import')],
        ['autoprefixer', autoprefixerOption, require('autoprefixer')],
        ['postcss-pxtransform', pxtransformOption, require('postcss-pxtransform')],
        ['postcss-html-transform', htmltransformOption, require('postcss-html-transform')],
        ['postcss-plugin-constparse', defaultConstparseOption, require('postcss-plugin-constparse')],
        ['postcss-alias', { config: { alias } }, require('./postcss-alias').default],
        ['postcss-url', urlOption, require('postcss-url')],
        ...Object.entries(options)
    ];
};
exports.getDefaultPostcssConfig = getDefaultPostcssConfig;
const getPostcssPlugins = function (appPath, option = []) {
    option.forEach(([pluginName, pluginOption, pluginPkg]) => {
        if (!pluginOption || ['cssModules'].includes(pluginName))
            return;
        if (Object.hasOwnProperty.call(pluginOption, 'enable') && !pluginOption.enable)
            return;
        if (pluginPkg) {
            plugins.push(pluginPkg(pluginOption.config || {}));
            return;
        }
        if (!(0, helper_1.isNpmPkg)(pluginName)) {
            // local plugin
            pluginName = path_1.default.join(appPath, pluginName);
        }
        try {
            const pluginPath = (0, resolve_1.sync)(pluginName, { basedir: appPath });
            plugins.push(require(pluginPath)(pluginOption.config || {}));
        }
        catch (e) {
            const msg = e.code === 'MODULE_NOT_FOUND' ? `缺少 postcss 插件 "${pluginName}", 已忽略` : e;
            console.log(msg);
        }
    });
    return plugins;
};
exports.getPostcssPlugins = getPostcssPlugins;
//# sourceMappingURL=postcss.h5.js.map