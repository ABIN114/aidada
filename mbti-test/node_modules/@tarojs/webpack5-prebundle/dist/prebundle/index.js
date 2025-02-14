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
const path_1 = __importDefault(require("path"));
const perf_hooks_1 = require("perf_hooks");
const webpack_1 = __importDefault(require("webpack"));
const utils_1 = require("../utils");
const constant_1 = require("../utils/constant");
const TaroModuleFederationPlugin_1 = __importDefault(require("../webpack/TaroModuleFederationPlugin"));
const bundle_1 = require("./bundle");
const scanImports_1 = require("./scanImports");
class BasePrebundle {
    constructor(config, option) {
        this.config = config;
        this.option = option;
        this.isUseCache = true;
        this.deps = new Map();
        if (!option.enable)
            return;
        const { appPath, env, chain, platformType, sourceRoot, isWatch } = this.config;
        const { cacheDir = (0, utils_1.getCacheDir)(appPath, env), esbuild = {}, force, swc } = this.option;
        this.chain = chain;
        this.sourceRoot = sourceRoot;
        this.appPath = appPath;
        this.cacheDir = cacheDir;
        this.customEsbuildConfig = esbuild;
        this.customSwcConfig = swc;
        this.env = env;
        this.platformType = platformType;
        this.mode = ['production', 'development', 'none'].find(e => e === env) ||
            (!isWatch || process.env.NODE_ENV === 'production' ? 'production' : 'development');
        this.prebundleCacheDir = path_1.default.resolve(cacheDir, './prebundle');
        this.remoteCacheDir = path_1.default.resolve(cacheDir, './remote');
        this.metadataPath = path_1.default.join(cacheDir, 'metadata.json');
        this.metadata = {};
        this.preMetadata = {};
        this.mainFields = [...helper_1.defaultMainFields];
        this.measure = (0, utils_1.getMeasure)(this.option.timings);
        try {
            if (force !== true) {
                Object.assign(this.preMetadata, helper_1.fs.readJSONSync(this.metadataPath));
            }
        }
        catch (e) { } // eslint-disable-line no-empty
        this.webpackConfig = this.chain.toConfig();
        (0, utils_1.createResolve)(this.appPath, this.webpackConfig.resolve);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isUseCache) {
                (0, utils_1.commitMeta)(this.appPath, this.metadataPath, this.metadata);
            }
        });
    }
    addPlugin(name, plugin, ...args) {
        this.chain.plugin(name).use(plugin, args);
    }
    get entryPath() {
        const { entryFileName = 'app', entry = {} } = this.config;
        const appJsPath = entry[entryFileName] || '';
        if (typeof appJsPath === 'string') {
            return appJsPath;
        }
        else if (appJsPath instanceof Array) {
            return appJsPath[0];
        }
        else if (typeof appJsPath.import === 'string') {
            return appJsPath.import;
        }
        return '';
    }
    parseEntries(entry = {}) {
        const entries = [];
        Object.values(entry).forEach(e => {
            if (typeof e === 'string') {
                entries.push(e);
            }
            else if (e instanceof Array) {
                entries.push(...this.parseEntries(e));
            }
            else if (typeof e.import === 'string') {
                entries.push(e.import);
            }
            else if (e.import instanceof Array) {
                entries.push(...this.parseEntries(e.import));
            }
        });
        return entries;
    }
    /** 找出所有 webpack entry */
    getEntries(appJsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appPath, sourceRoot } = this.config;
            const entries = this.parseEntries(this.config.entry);
            const appConfigPath = (0, helper_1.resolveMainFilePath)(`${appJsPath.replace(path_1.default.extname(appJsPath), '')}.config`);
            if (helper_1.fs.existsSync(appConfigPath)) {
                const appConfig = (0, helper_1.readConfig)(appConfigPath, this.config);
                if (typeof this.config.modifyAppConfig === 'function') {
                    yield this.config.modifyAppConfig(appConfig);
                }
                appConfig.pages.forEach((page) => {
                    const pageJsPath = (0, helper_1.resolveMainFilePath)(path_1.default.join(appPath, sourceRoot, page));
                    entries.push(pageJsPath);
                });
            }
            return entries;
        });
    }
    setDeps(entries, include = [], exclude = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const SCAN_START = perf_hooks_1.performance.now();
            yield (0, scanImports_1.scanImports)({
                appPath: this.appPath,
                chain: this.chain,
                customEsbuildConfig: this.customEsbuildConfig,
                entries,
                include,
                exclude,
                mainFields: this.mainFields,
            }, this.deps);
            this.deps.size &&
                console.log(helper_1.chalk.cyan('Prebundle dependencies: \n', ...Array.from(this.deps.keys()).sort(utils_1.sortDeps).map(dep => `    ${dep}\n`)));
            this.measure('Scan imports duration', SCAN_START);
        });
    }
    bundle() {
        return __awaiter(this, void 0, void 0, function* () {
            const PREBUNDLE_START = perf_hooks_1.performance.now();
            this.metadata.bundleHash = yield (0, utils_1.getBundleHash)(this.appPath, this.deps, this.chain, this.cacheDir);
            if (this.preMetadata.bundleHash !== this.metadata.bundleHash) {
                this.isUseCache = false;
                try {
                    yield (0, bundle_1.bundle)({
                        appPath: this.appPath,
                        deps: this.deps,
                        chain: this.chain,
                        prebundleOutputDir: this.prebundleCacheDir,
                        customEsbuildConfig: this.customEsbuildConfig,
                        customSwcConfig: this.customSwcConfig,
                        mainFields: this.mainFields,
                    });
                }
                catch (result) {
                    return this.handleBundleError(result === null || result === void 0 ? void 0 : result.errors);
                }
            }
            this.measure('Prebundle duration', PREBUNDLE_START);
        });
    }
    handleBundleError(errors = []) {
        const keys = Array.from(this.deps.keys());
        if (errors.length > 0) {
            const deps = errors.reduce((p, e) => {
                var _a;
                const file = ((_a = e.location) === null || _a === void 0 ? void 0 : _a.file) || '';
                const key = keys.find(key => file === null || file === void 0 ? void 0 : file.includes(key));
                if (key)
                    p.push(key);
                return p;
            }, []);
            deps.forEach(key => this.deps.delete(key));
            if (deps.length > 0) {
                console.log(helper_1.chalk.yellowBright(`检测到依赖编译错误，已跳过`, deps.sort(utils_1.sortDeps).map(e => helper_1.chalk.bold(e)).join('、'), `依赖预编译。`, `\n    > 可以通过手动配置 ${(0, helper_1.terminalLink)('compiler.prebundle.exclude', 'https://nervjs.github.io/taro-docs/docs/next/config-detail#compilerprebundleexclude')} 忽略该提示`));
            }
            else {
                console.log(helper_1.chalk.yellowBright(...errors));
            }
            return this.bundle();
        }
    }
    setHost(publicPath = '') {
        this.chain
            .plugin('TaroModuleFederationPlugin')
            .use(TaroModuleFederationPlugin_1.default, [{
                name: 'taro-app',
                remotes: {
                    [constant_1.MF_NAME]: `${constant_1.MF_NAME}@${publicPath}remoteEntry.js`
                }
            },
            {
                deps: this.deps,
                env: this.env,
                isBuildPlugin: this.config.isBuildPlugin,
                platformType: this.platformType,
                remoteAssets: this.metadata.remoteAssets,
                runtimeRequirements: this.metadata.runtimeRequirements || new Set()
            }]);
    }
    getRemoteWebpackCompiler(standard, custom = {}) {
        var _a, _b, _c;
        /** NOTE: 删除 Host 应用影响打包 Remote 应用的配置 */
        const inherit = Object.assign({}, this.webpackConfig);
        const skipPlugins = ['MiniSplitChunksPlugin', 'TaroMiniPlugin', 'TaroH5Plugin', 'ProvidePlugin', 'CopyPlugin', 'HtmlWebpackPlugin'];
        delete inherit.devServer;
        (_a = inherit.optimization) === null || _a === void 0 ? true : delete _a.splitChunks;
        inherit.plugins = (_b = inherit.plugins) === null || _b === void 0 ? void 0 : _b.filter(p => { var _a; return !skipPlugins.includes((_a = p === null || p === void 0 ? void 0 : p.constructor) === null || _a === void 0 ? void 0 : _a.name); });
        if ((_c = inherit.module) === null || _c === void 0 ? void 0 : _c.rules) {
            inherit.module.rules = inherit.module.rules.filter((rule) => { var _a; return ((_a = rule.test) === null || _a === void 0 ? void 0 : _a.toString()) !== helper_1.REG_SCRIPTS.toString(); });
        }
        return (0, webpack_1.default)((0, helper_1.recursiveMerge)(inherit, standard, custom));
    }
}
exports.default = BasePrebundle;
//# sourceMappingURL=index.js.map