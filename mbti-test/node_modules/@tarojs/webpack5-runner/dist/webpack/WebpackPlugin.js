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
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const WebpackBarPlugin_1 = require("../plugins/WebpackBarPlugin");
class WebpackPlugin {
    static getPlugin(plugin, args) {
        return {
            plugin,
            args
        };
    }
    static getCopyWebpackPlugin(appPath, copy) {
        var _a, _b;
        /** @doc https://webpack.js.org/plugins/copy-webpack-plugin */
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        const globalIgnores = (_b = (_a = copy.options) === null || _a === void 0 ? void 0 : _a.ignore) !== null && _b !== void 0 ? _b : [];
        const patterns = copy.patterns.map((_a) => {
            var { from, to, ignore = [] } = _a, extra = __rest(_a, ["from", "to", "ignore"]);
            return Object.assign({ from, to: path_1.default.resolve(appPath, to), context: appPath, globOptions: {
                    ignore: ignore.concat(globalIgnores)
                } }, extra);
        });
        const args = { patterns };
        return WebpackPlugin.getPlugin(CopyWebpackPlugin, [args]);
    }
    static getProviderPlugin(args) {
        return WebpackPlugin.getPlugin(webpack_1.default.ProvidePlugin, [args]);
    }
    static getDefinePlugin(definitionsList) {
        const definitions = Object.assign({}, ...definitionsList);
        return WebpackPlugin.getPlugin(webpack_1.default.DefinePlugin, [definitions]);
    }
    static getMiniCssExtractPlugin(args) {
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        return WebpackPlugin.getPlugin(MiniCssExtractPlugin, [args]);
    }
    static getTerserPlugin(terserOptions) {
        const TerserPlugin = require('terser-webpack-plugin');
        return WebpackPlugin.getPlugin(TerserPlugin, [{
                parallel: true,
                terserOptions
            }]);
    }
    static getESBuildMinifyPlugin(esbuildMinifyOptions) {
        const ESBuildMinifyPlugin = require('esbuild-loader').ESBuildMinifyPlugin;
        return WebpackPlugin.getPlugin(ESBuildMinifyPlugin, [esbuildMinifyOptions]);
    }
    static getCssMinimizerPlugin(minimizer, minimizerOptions) {
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
        let minify = CssMinimizerPlugin.cssnanoMinify;
        if (minimizer === 'esbuild') {
            minify = CssMinimizerPlugin.esbuildMinify;
        }
        else if (minimizer === 'parcelCss') {
            minify = CssMinimizerPlugin.parcelCssMinify;
        }
        const options = {
            test: helper_1.REG_STYLE,
            parallel: true,
            minify,
            minimizerOptions: {
                preset: [
                    'default',
                    minimizerOptions
                ]
            }
        };
        return WebpackPlugin.getPlugin(CssMinimizerPlugin, [options]);
    }
    static getWebpackBarPlugin(webpackBarOptions = {}) {
        return WebpackPlugin.getPlugin(WebpackBarPlugin_1.TaroWebpackBarPlugin, [webpackBarOptions]);
    }
}
exports.default = WebpackPlugin;
//# sourceMappingURL=WebpackPlugin.js.map