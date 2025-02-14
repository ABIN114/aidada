"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const webpack5_prebundle_1 = __importDefault(require("@tarojs/webpack5-prebundle"));
const lodash_1 = require("lodash");
const webpack_1 = __importDefault(require("webpack"));
const prerender_1 = require("./prerender/prerender");
const webpack_2 = require("./utils/webpack");
const MiniCombination_1 = require("./webpack/MiniCombination");
function build(appPath, rawConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const combination = new MiniCombination_1.MiniCombination(appPath, rawConfig);
        yield combination.make();
        const { enableSourceMap, entry = {}, runtimePath } = combination.config;
        const prebundle = new webpack5_prebundle_1.default({
            appPath,
            sourceRoot: combination.sourceRoot,
            chain: combination.chain,
            enableSourceMap,
            entry,
            isWatch: combination.config.isWatch,
            runtimePath,
            isBuildPlugin: combination.isBuildPlugin,
            alias: combination.config.alias,
            defineConstants: combination.config.defineConstants,
            modifyAppConfig: combination.config.modifyAppConfig
        });
        try {
            yield prebundle.run(combination.getPrebundleOptions());
        }
        catch (error) {
            console.error(error);
            console.warn(helper_1.chalk.yellow('依赖预编译失败，已经为您跳过预编译步骤，但是编译速度可能会受到影响。'));
        }
        const webpackConfig = combination.chain.toConfig();
        const config = combination.config;
        return new Promise((resolve, reject) => {
            if (config.withoutBuild)
                return;
            const compiler = (0, webpack_1.default)(webpackConfig);
            const onBuildFinish = config.onBuildFinish;
            let prerender;
            const onFinish = function (error, stats) {
                if (typeof onBuildFinish !== 'function')
                    return;
                onBuildFinish({
                    error,
                    stats,
                    isWatch: config.isWatch
                });
            };
            const callback = (err, stats) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const errorLevel = typeof config.compiler !== 'string' && ((_a = config.compiler) === null || _a === void 0 ? void 0 : _a.errorLevel) || 0;
                if (err || stats.hasErrors()) {
                    const error = err !== null && err !== void 0 ? err : stats.toJson().errors;
                    onFinish(error, null);
                    reject(error);
                    (0, webpack_2.errorHandling)(errorLevel, stats);
                    return;
                }
                if (!(0, lodash_1.isEmpty)(config.prerender)) {
                    prerender = prerender !== null && prerender !== void 0 ? prerender : new prerender_1.Prerender(config, webpackConfig, stats, config.template);
                    yield prerender.render();
                }
                // const res = stats.toString({
                //   logging: 'verbose'
                // })
                // console.log('res: ', res)
                onFinish(null, stats);
                resolve(stats);
            });
            if (config.isWatch) {
                compiler.watch({
                    aggregateTimeout: 300,
                    poll: undefined
                }, callback);
            }
            else {
                compiler.run((err, stats) => {
                    compiler.close(err2 => callback(err || err2, stats));
                });
            }
        });
    });
}
exports.default = build;
//# sourceMappingURL=index.mini.js.map