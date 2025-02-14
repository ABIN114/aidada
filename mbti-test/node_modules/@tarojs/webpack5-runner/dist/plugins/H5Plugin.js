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
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../utils/app"));
const component_1 = require("../utils/component");
const TaroComponentsExportsPlugin_1 = __importDefault(require("./TaroComponentsExportsPlugin"));
const PLUGIN_NAME = 'TaroH5Plugin';
class TaroH5Plugin {
    constructor(options = {}) {
        this.options = (0, lodash_1.defaults)(options || {}, {
            appPath: '',
            sourceDir: '',
            routerConfig: {},
            entryFileName: 'app',
            framework: helper_1.FRAMEWORK_MAP.NERV,
            frameworkExts: helper_1.SCRIPT_EXT,
            runtimePath: [],
            pxTransformConfig: {
                baseFontSize: 20,
                deviceRatio: {},
                designWidth: 750,
                minRootSize: 20,
                unitPrecision: 5,
                targetUnit: 'rem'
            },
            prebundle: false,
            alias: {},
            defineConstants: {},
        });
    }
    tryAsync(fn) {
        return (arg, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield fn(arg);
                typeof callback === 'function' && callback();
            }
            catch (err) {
                typeof callback === 'function' && callback();
            }
        });
    }
    apply(compiler) {
        const { entry } = compiler.options;
        this.appHelper = new app_1.default(entry, this.options);
        compiler.hooks.run.tapAsync(PLUGIN_NAME, this.tryAsync(() => {
            this.run();
        }));
        compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, this.tryAsync(() => {
            this.run();
        }));
        compiler.hooks.make.tapAsync(PLUGIN_NAME, this.tryAsync((compilation) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield ((_b = (_a = this.options).onCompilerMake) === null || _b === void 0 ? void 0 : _b.call(_a, compilation, compiler, this));
        })));
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME, (_loaderContext, module) => {
                const { entryFileName, sourceDir, prebundle, routerConfig, isBuildNativeComp } = this.options;
                const { dir, name } = path_1.default.parse(module.resource);
                const suffixRgx = /\.(boot|config)/;
                if (!suffixRgx.test(name))
                    return;
                const filePath = path_1.default.join(dir, name);
                const pageName = filePath.replace(sourceDir + (process.platform === 'win32' ? '\\' : '/'), '').replace(suffixRgx, '');
                const routerMode = (routerConfig === null || routerConfig === void 0 ? void 0 : routerConfig.mode) || 'hash';
                const isMultiRouterMode = routerMode === 'multi';
                const isApp = !isMultiRouterMode && pageName === entryFileName;
                const bootstrap = prebundle && !/\.boot$/.test(name);
                if (isBuildNativeComp
                    ? this.appHelper.compsConfigList.has(pageName)
                    : (isApp || this.appHelper.pagesConfigList.has(pageName.split(path_1.default.sep).join('/')))) {
                    // 把 Map 转换为数组后传递，避免 thread-loader 传递 Map 时变为空对象的问题，fix #13430
                    const pagesConfigList = [];
                    for (const item of this.appHelper.pagesConfigList.entries()) {
                        pagesConfigList.push(item);
                    }
                    module.loaders.push({
                        loader: require.resolve('@tarojs/taro-loader/lib/h5'),
                        options: {
                            /** paths */
                            entryFileName,
                            filename: name.replace(suffixRgx, ''),
                            runtimePath: this.options.runtimePath,
                            sourceDir,
                            /** config & message */
                            config: Object.assign({ router: routerConfig }, this.appHelper.appConfig),
                            framework: this.options.framework,
                            loaderMeta: this.options.loaderMeta,
                            pages: pagesConfigList,
                            pxTransformConfig: this.options.pxTransformConfig,
                            alias: this.options.alias,
                            defineConstants: this.options.defineConstants,
                            /** building mode */
                            bootstrap,
                            isBuildNativeComp
                        },
                        ident: null,
                        type: null
                    });
                }
            });
        });
        if (!component_1.componentConfig.includeAll) {
            new TaroComponentsExportsPlugin_1.default(this.options).apply(compiler);
        }
    }
    run() {
        this.appHelper.clear();
    }
}
exports.default = TaroH5Plugin;
//# sourceMappingURL=H5Plugin.js.map