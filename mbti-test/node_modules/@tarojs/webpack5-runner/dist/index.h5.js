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
const shared_1 = require("@tarojs/shared");
const webpack5_prebundle_1 = __importDefault(require("@tarojs/webpack5-prebundle"));
const detect_port_1 = __importDefault(require("detect-port"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const utils_1 = require("./utils");
const app_1 = __importDefault(require("./utils/app"));
const logHelper_1 = require("./utils/logHelper");
const webpack_2 = require("./utils/webpack");
const H5Combination_1 = require("./webpack/H5Combination");
function build(appPath, rawConfig) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const combination = new H5Combination_1.H5Combination(appPath, rawConfig);
        yield combination.make();
        const { chunkDirectory = 'chunk', devServer, enableSourceMap, entryFileName = 'app', entry = {}, publicPath } = combination.config;
        let prebundle = null;
        if (!combination.isBuildNativeComp) {
            prebundle = new webpack5_prebundle_1.default({
                appPath,
                sourceRoot: combination.sourceRoot,
                chain: combination.chain,
                chunkDirectory,
                devServer,
                enableSourceMap,
                entryFileName,
                entry,
                isWatch: combination.config.isWatch,
                publicPath,
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
        }
        const webpackConfig = combination.chain.toConfig();
        const config = combination.config;
        const errorLevel = typeof config.compiler !== 'string' && ((_a = config.compiler) === null || _a === void 0 ? void 0 : _a.errorLevel) || 0;
        try {
            if (!config.isWatch) {
                if (config.withoutBuild)
                    return;
                const compiler = (0, webpack_1.default)(webpackConfig);
                prebundle === null || prebundle === void 0 ? void 0 : prebundle.postCompilerStart(compiler);
                compiler.hooks.emit.tapAsync('taroBuildDone', (compilation, callback) => __awaiter(this, void 0, void 0, function* () {
                    if ((0, shared_1.isFunction)(config.modifyBuildAssets)) {
                        yield config.modifyBuildAssets(compilation.assets);
                    }
                    callback();
                }));
                return new Promise((resolve, reject) => {
                    (0, logHelper_1.bindProdLogger)(compiler);
                    compiler.run((error, stats) => {
                        compiler.close(error2 => {
                            const err = error || error2;
                            if ((0, shared_1.isFunction)(config.onBuildFinish)) {
                                config.onBuildFinish({
                                    error: err,
                                    stats: err ? null : stats,
                                    isWatch: false
                                });
                            }
                            err ? reject(err) : resolve(stats);
                            (0, webpack_2.errorHandling)(errorLevel, stats);
                        });
                    });
                });
            }
            else {
                config.devServer = (0, helper_1.recursiveMerge)(config.devServer || {}, webpackConfig.devServer);
                config.output = webpackConfig.output;
                const routerConfig = config.router || {};
                const routerMode = routerConfig.mode || 'hash';
                const routerBasename = routerConfig.basename || '/';
                webpackConfig.devServer = yield getDevServerOptions(appPath, config);
                const devUrl = (0, url_1.format)({
                    protocol: ((_b = webpackConfig.devServer) === null || _b === void 0 ? void 0 : _b.https) ? 'https' : 'http',
                    hostname: (0, utils_1.formatOpenHost)((_c = webpackConfig.devServer) === null || _c === void 0 ? void 0 : _c.host),
                    port: (_d = webpackConfig.devServer) === null || _d === void 0 ? void 0 : _d.port,
                    pathname: routerMode === 'browser' ? routerBasename : '/'
                });
                if (typeof webpackConfig.devServer.open === 'undefined' || webpackConfig.devServer.open === true) {
                    webpackConfig.devServer.open = devUrl;
                }
                if (config.withoutBuild)
                    return;
                const compiler = (0, webpack_1.default)(webpackConfig);
                const server = new webpack_dev_server_1.default(webpackConfig.devServer, compiler);
                prebundle === null || prebundle === void 0 ? void 0 : prebundle.postCompilerStart(compiler);
                (0, logHelper_1.bindDevLogger)(compiler, devUrl);
                compiler.hooks.emit.tapAsync('taroBuildDone', (compilation, callback) => __awaiter(this, void 0, void 0, function* () {
                    if ((0, shared_1.isFunction)(config.modifyBuildAssets)) {
                        yield config.modifyBuildAssets(compilation.assets);
                    }
                    callback();
                }));
                compiler.hooks.done.tap('taroBuildDone', stats => {
                    if ((0, shared_1.isFunction)(config.onBuildFinish)) {
                        config.onBuildFinish({
                            error: null,
                            stats,
                            isWatch: true
                        });
                    }
                    (0, webpack_2.errorHandling)(errorLevel, stats);
                });
                compiler.hooks.failed.tap('taroBuildDone', error => {
                    if ((0, shared_1.isFunction)(config.onBuildFinish)) {
                        config.onBuildFinish({
                            error,
                            stats: null,
                            isWatch: true
                        });
                    }
                    process.exit(1);
                });
                return new Promise((resolve, reject) => {
                    server.startCallback(err => {
                        if (err) {
                            (0, logHelper_1.printBuildError)(err);
                            reject(err);
                            return console.log(err);
                        }
                        resolve();
                    });
                });
            }
        }
        catch (err) {
            console.error(err);
            !config.isWatch && process.exit(1);
        }
    });
}
exports.default = build;
function getDevServerOptions(appPath, config) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const publicPath = (0, utils_1.parsePublicPath)(config.publicPath);
        const outputPath = path_1.default.join(appPath, config.outputRoot || 'dist');
        const _c = config.devServer || {}, { proxy: customProxy = [] } = _c, customDevServerOption = __rest(_c, ["proxy"]);
        const routerConfig = config.router || {};
        const routerMode = routerConfig.mode || 'hash';
        const isMultiRouterMode = routerMode === 'multi';
        const proxy = [];
        if (isMultiRouterMode) {
            const app = new app_1.default(config.entry, {
                sourceDir: path_1.default.join(appPath, config.sourceRoot || helper_1.SOURCE_DIR),
                frameworkExts: config.frameworkExts,
                entryFileName: config.entryFileName,
                alias: config.alias,
                defineConstants: config.defineConstants,
            });
            const appConfig = app.appConfig;
            const customRoutes = routerConfig.customRoutes || {};
            const routerBasename = routerConfig.basename || '/';
            const getEntriesRoutes = (customRoutes = {}) => {
                const conf = [];
                for (let key in customRoutes) {
                    const path = customRoutes[key];
                    key = (0, utils_1.addLeadingSlash)(key);
                    if (typeof path === 'string') {
                        conf.push([key, (0, utils_1.addLeadingSlash)(path)]);
                    }
                    else if ((path === null || path === void 0 ? void 0 : path.length) > 0) {
                        conf.push(...path.map(p => [key, (0, utils_1.addLeadingSlash)(p)]));
                    }
                }
                return conf;
            };
            const bypass = req => {
                var _a, _b, _c, _d;
                if (((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.indexOf('html')) !== -1) {
                    const pagePath = (0, utils_1.stripTrailingSlash)((0, utils_1.stripBasename)(req.path, routerBasename));
                    // console.log('bypass:' + req.path, pagePath)
                    const getBypassUrl = url => (0, utils_1.addHtmlSuffix)((0, utils_1.addLeadingSlash)(url));
                    if (pagePath === '') {
                        return getBypassUrl(appConfig.entryPagePath || ((_b = appConfig.pages) === null || _b === void 0 ? void 0 : _b[0]));
                    }
                    const pageIdx = ((_c = appConfig.pages) !== null && _c !== void 0 ? _c : []).findIndex(e => (0, utils_1.addLeadingSlash)(e) === pagePath);
                    if (pageIdx > -1) {
                        return getBypassUrl((_d = appConfig.pages) === null || _d === void 0 ? void 0 : _d[pageIdx]);
                    }
                    const customRoutesConf = getEntriesRoutes(customRoutes);
                    const idx = getEntriesRoutes(customRoutes).findIndex(list => list[1] === pagePath);
                    if (idx > -1) {
                        // NOTE: 自定义路由
                        return getBypassUrl(customRoutesConf[idx][0]);
                    }
                }
            };
            proxy.push({
                context: [routerBasename],
                bypass
            });
        }
        if (!(customProxy instanceof Array)) {
            proxy.push(...Object.entries(customProxy).map(([url, options = {}]) => {
                const item = {
                    context: [url]
                };
                if (typeof options === 'string') {
                    item.target = options;
                }
                else {
                    Object.assign(item, options);
                }
                return item;
            }));
        }
        else {
            proxy.push(...customProxy);
        }
        const chunkFilename = (_b = (_a = config.output) === null || _a === void 0 ? void 0 : _a.chunkFilename) !== null && _b !== void 0 ? _b : `${config.chunkDirectory || 'chunk'}/[name].js`;
        const devServerOptions = (0, helper_1.recursiveMerge)({
            open: !config.isBuildNativeComp,
            allowedHosts: 'all',
            devMiddleware: {
                publicPath,
                writeToDisk: config.isBuildNativeComp
            },
            static: [{
                    directory: outputPath,
                    publicPath,
                    watch: true // webpack4: devServerOptions.watchContentBase
                }],
            compress: true,
            // disableHostCheck: true, // the disableHostCheck and allowedHosts options were removed in favor of the firewall option
            host: '0.0.0.0',
            // useLocalIp: true, @breaking: move in favor { host: 'local-ip' } (https://github.com/webpack/webpack-dev-server/releases?page=2)
            hot: 'only',
            https: false,
            // inline: true, // the inline option (iframe live mode) was removed
            client: {
                overlay: true
            },
            port: 10086,
            // quiet: true, // the log, logLevel, logTime, noInfo, quiet, reporter and warn options were removed in favor of built-in webpack logger, please read this to enable and setup logging output
            historyApiFallback: {
                disableDotRule: true,
                rewrites: [{
                        from: /\.hot-update\.(js|json)$/,
                        to: function (context) {
                            const pathname = chunkFilename.replace('[name]', path_1.default.basename(context.parsedUrl.pathname).replace(/\.[^.]*.hot-update\.(js|json)/, ''));
                            return (['', 'auto'].includes(publicPath) ? '' : publicPath) + pathname;
                        }
                    }]
            },
            proxy
        }, customDevServerOption, {
            historyApiFallback: {
                rewrites: [{ from: /./, to: publicPath }]
            }
        });
        const originalPort = Number(devServerOptions.port);
        const availablePort = yield (0, detect_port_1.default)(originalPort);
        if (availablePort !== originalPort) {
            console.log(`ℹ 预览端口 ${originalPort} 被占用, 自动切换到空闲端口 ${availablePort}`);
            devServerOptions.port = availablePort;
        }
        return devServerOptions;
    });
}
//# sourceMappingURL=index.h5.js.map