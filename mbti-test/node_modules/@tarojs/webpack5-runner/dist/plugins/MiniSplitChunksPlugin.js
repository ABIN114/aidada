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
const shared_1 = require("@tarojs/shared");
const md5_1 = __importDefault(require("md5"));
const path_1 = __importDefault(require("path"));
const SplitChunksPlugin_1 = __importDefault(require("webpack/lib/optimize/SplitChunksPlugin"));
const PLUGIN_NAME = 'MiniSplitChunkPlugin'; // 插件名
const SUB_COMMON_DIR = 'sub-common'; // 分包公共依赖目录
const SUB_VENDORS_NAME = 'sub-vendors'; // 分包 vendors 文件名
const FileExtsMap = {
    JS: '.js',
    JS_MAP: '.js.map',
    STYLE: '.wxss',
    TEMPLATE: '.wxml'
}; // 默认支持的文件扩展名
const INITIAL_CHUNK_FILTER = chunk => chunk.canBeInitial();
const ASYNC_CHUNK_FILTER = chunk => !chunk.canBeInitial();
const ALL_CHUNK_FILTER = _ => true;
/**
 * @param {OptimizationSplitChunksSizes} value the sizes
 * @returns {SplitChunksSizes} normalized representation
 */
const normalizeSizes = (value, defaultSizeTypes) => {
    if (typeof value === 'number') {
        const o = {};
        for (const sizeType of defaultSizeTypes)
            o[sizeType] = value;
        return o;
    }
    else if (typeof value === 'object' && value !== null) {
        return Object.assign({}, value);
    }
    else {
        return {};
    }
};
/**
 * @param {...SplitChunksSizes} sizes the sizes
 * @returns {SplitChunksSizes} the merged sizes
 */
const mergeSizes = (...sizes) => {
    /** @type {SplitChunksSizes} */
    let merged = {};
    for (let i = sizes.length - 1; i >= 0; i--) {
        merged = Object.assign(merged, sizes[i]);
    }
    return merged;
};
const normalizeName = (name) => {
    if (typeof name === 'string') {
        return () => name;
    }
    if (typeof name === 'function') {
        return name;
    }
};
/**
 * @param {OptimizationSplitChunksCacheGroup["chunks"]} chunks the chunk filter option
 * @returns {ChunkFilterFunction} the chunk filter function
 */
const normalizeChunksFilter = chunks => {
    if (chunks === 'initial') {
        return INITIAL_CHUNK_FILTER;
    }
    if (chunks === 'async') {
        return ASYNC_CHUNK_FILTER;
    }
    if (chunks === 'all') {
        return ALL_CHUNK_FILTER;
    }
    if (typeof chunks === 'function') {
        return chunks;
    }
};
const checkTest = (test, module, context) => {
    if (test === undefined)
        return true;
    if (typeof test === 'function') {
        return test(module, context);
    }
    if (typeof test === 'boolean')
        return test;
    if (typeof test === 'string') {
        const name = module.nameForCondition();
        return name && name.startsWith(test);
    }
    if (test instanceof RegExp) {
        const name = module.nameForCondition();
        return name && test.test(name);
    }
    return false;
};
const checkModuleType = (test, module) => {
    if (test === undefined)
        return true;
    if (typeof test === 'function') {
        return test(module.type);
    }
    if (typeof test === 'string') {
        const type = module.type;
        return test === type;
    }
    if (test instanceof RegExp) {
        const type = module.type;
        return test.test(type);
    }
    return false;
};
/**
 * @param {undefined|string|RegExp|Function} test type option
 * @param {Module} module the module
 * @returns {boolean} true, if the module should be selected
 */
const checkModuleLayer = (test, module) => {
    if (test === undefined)
        return true;
    if (typeof test === 'function') {
        return test(module.layer);
    }
    if (typeof test === 'string') {
        const layer = module.layer;
        return test === '' ? !layer : layer && layer.startsWith(test);
    }
    if (test instanceof RegExp) {
        const layer = module.layer;
        return test.test(layer);
    }
    return false;
};
/**
 * @param {OptimizationSplitChunksCacheGroup} options the group options
 * @returns {CacheGroupSource} the normalized cached group
 */
const createCacheGroupSource = (options, key, defaultSizeTypes) => {
    const minSize = normalizeSizes(options.minSize, defaultSizeTypes);
    const minSizeReduction = normalizeSizes(options.minSizeReduction, defaultSizeTypes);
    const maxSize = normalizeSizes(options.maxSize, defaultSizeTypes);
    return {
        key,
        priority: options.priority,
        getName: normalizeName(options.name),
        chunksFilter: normalizeChunksFilter(options.chunks),
        enforce: options.enforce,
        minSize,
        minSizeReduction,
        minRemainingSize: mergeSizes(normalizeSizes(options.minRemainingSize, defaultSizeTypes), minSize),
        enforceSizeThreshold: normalizeSizes(options.enforceSizeThreshold, defaultSizeTypes),
        maxAsyncSize: mergeSizes(normalizeSizes(options.maxAsyncSize, defaultSizeTypes), maxSize),
        maxInitialSize: mergeSizes(normalizeSizes(options.maxInitialSize, defaultSizeTypes), maxSize),
        minChunks: options.minChunks,
        maxAsyncRequests: options.maxAsyncRequests,
        maxInitialRequests: options.maxInitialRequests,
        filename: options.filename,
        idHint: options.idHint,
        automaticNameDelimiter: options.automaticNameDelimiter,
        reuseExistingChunk: options.reuseExistingChunk,
        usedExports: options.usedExports
    };
};
/**
 * @param {GetCacheGroups | Record<string, false|string|RegExp|OptimizationSplitChunksGetCacheGroups|OptimizationSplitChunksCacheGroup>} cacheGroups the cache group options
 * @returns {GetCacheGroups} a function to get the cache groups
 */
const normalizeCacheGroups = (cacheGroups, defaultSizeTypes) => {
    if (typeof cacheGroups === 'function') {
        return cacheGroups;
    }
    if (typeof cacheGroups === 'object' && cacheGroups !== null) {
        /** @type {(function(Module, CacheGroupsContext, CacheGroupSource[]): void)[]} */
        const handlers = [];
        for (const key of Object.keys(cacheGroups)) {
            const option = cacheGroups[key];
            if (option === false) {
                continue;
            }
            if (typeof option === 'string' || option instanceof RegExp) {
                const source = createCacheGroupSource({}, key, defaultSizeTypes);
                handlers.push((module, context, results) => {
                    if (checkTest(option, module, context)) {
                        results.push(source);
                    }
                });
            }
            else if (typeof option === 'function') {
                const cache = new WeakMap();
                handlers.push((module, _, results) => {
                    const result = option(module);
                    if (result) {
                        const groups = Array.isArray(result) ? result : [result];
                        for (const group of groups) {
                            const cachedSource = cache.get(group);
                            if (cachedSource !== undefined) {
                                results.push(cachedSource);
                            }
                            else {
                                const source = createCacheGroupSource(group, key, defaultSizeTypes);
                                cache.set(group, source);
                                results.push(source);
                            }
                        }
                    }
                });
            }
            else {
                const source = createCacheGroupSource(option, key, defaultSizeTypes);
                handlers.push((module, context, results) => {
                    if (checkTest(option.test, module, context) &&
                        checkModuleType(option.type, module) &&
                        checkModuleLayer(option.layer, module)) {
                        results.push(source);
                    }
                });
            }
        }
        /**
         * @param {Module} module the current module
         * @param {CacheGroupsContext} context the current context
         * @returns {CacheGroupSource[]} the matching cache groups
         */
        const fn = (module, context) => {
            /** @type {CacheGroupSource[]} */
            const results = [];
            for (const fn of handlers) {
                fn(module, context, results);
            }
            return results;
        };
        return fn;
    }
    // eslint-disable-next-line react/display-name
    return () => null;
};
/**
 * 继承 SplitChunksPlugin 的插件，用于将分包公共依赖提取到单独的文件中
 */
class MiniSplitChunksPlugin extends SplitChunksPlugin_1.default {
    constructor(options) {
        super();
        /**
         * 自动驱动 tapAsync
         */
        this.tryAsync = fn => (arg, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield fn(arg);
                callback();
            }
            catch (err) {
                callback(err);
            }
        });
        this.subCommonDeps = new Map();
        this.subCommonChunks = new Map();
        this.subPackagesVendors = new Map();
        this.distPath = '';
        this.exclude = options.exclude || [];
        this.fileType = options.fileType || {
            style: '.wxss',
            config: '.json',
            script: '.js',
            templ: '.wxml',
            xs: '.wxs'
        };
        this.combination = options.combination;
        FileExtsMap.STYLE = this.fileType.style;
        FileExtsMap.TEMPLATE = this.fileType.templ;
    }
    apply(compiler) {
        const { webpack, context, options } = compiler;
        const { util, Compilation, sources } = webpack;
        const { ConcatSource, RawSource } = sources;
        this.context = context;
        this.subPackages = this.getSubpackageConfig(compiler)
            // 过滤掉独立分包
            .filter((subPackage) => !subPackage.independent)
            .map((subPackage) => (Object.assign(Object.assign({}, subPackage), { root: this.formatSubRoot(subPackage.root) })));
        if (this.subPackages.length === 0) {
            return;
        }
        this.subRoots = this.subPackages.map((subPackage) => subPackage.root);
        this.subRootRegExps = this.subRoots.map((subRoot) => new RegExp(`^${subRoot}\\/`));
        this.distPath = options.output.path || '';
        this.isDevMode = options.mode === 'development';
        /**
         * 调用父类SplitChunksPlugin的apply方法，注册相关处理事件
         */
        super.apply(compiler);
        /**
         * 当一个编译创建完成时，调用该方法
         */
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            /**
             * 在chunk优化阶段的开始时，调用该方法
             */
            compilation.hooks.optimizeChunks.tap(PLUGIN_NAME, (chunks) => {
                var _a;
                const splitChunksOriginConfig = Object.assign({}, (_a = options.optimization) === null || _a === void 0 ? void 0 : _a.splitChunks);
                this.subCommonDeps = new Map();
                this.subCommonChunks = new Map();
                this.subPackagesVendors = new Map();
                /**
                 * 找出分包入口chunks
                 */
                const subChunks = [];
                for (const chunk of chunks) {
                    if (this.isSubChunk(chunk))
                        subChunks.push(chunk);
                }
                if (subChunks.length === 0) {
                    this.options = Object.assign(Object.assign({}, this.options), { maxInitialRequests: Infinity, getCacheGroups: normalizeCacheGroups(Object.assign({}, splitChunksOriginConfig.cacheGroups), this.options.defaultSizeTypes) });
                    return;
                }
                const chunkGraph = compilation.chunkGraph;
                subChunks.forEach((subChunk) => {
                    const modulesIterable = chunkGraph.getOrderedChunkModulesIterable(subChunk, util.comparators.compareModulesByIdentifier);
                    for (const module of modulesIterable) {
                        if (this.isExternalModule(module)) {
                            return;
                        }
                        if (!this.hasModuleId(module)) {
                            return;
                        }
                        if (this.hasExclude() && this.isExcludeModule(module)) {
                            return;
                        }
                        const chunks = Array.from(chunkGraph.getModuleChunks(module));
                        const chunkNames = chunks.map(chunk => chunk.name);
                        /**
                         * 找出没有被主包引用，且被多个分包引用的module，并记录在subCommonDeps中
                         */
                        if (!this.hasMainChunk(chunkNames) && this.isSubsDep(chunkNames)) {
                            const { resource, _identifier: identifier } = module;
                            const depName = (0, md5_1.default)(resource !== null && resource !== void 0 ? resource : identifier);
                            if (!this.subCommonDeps.has(depName)) {
                                const subCommonDepChunks = new Set(chunkNames);
                                this.subCommonDeps.set(depName, {
                                    identifier,
                                    resource,
                                    rawIdentifier: module.identifier(),
                                    chunks: subCommonDepChunks
                                });
                            }
                            else {
                                const subCommonDep = this.subCommonDeps.get(depName);
                                chunks.map(chunk => subCommonDep.chunks.add(chunk.name));
                                this.subCommonDeps.set(depName, subCommonDep);
                            }
                        }
                    }
                });
                /**
                 * 用新的option配置生成新的cacheGroups配置
                 */
                this.options = Object.assign(Object.assign({}, this.options), { maxInitialRequests: Infinity, getCacheGroups: normalizeCacheGroups(Object.assign(Object.assign(Object.assign({}, (splitChunksOriginConfig === null || splitChunksOriginConfig === void 0 ? void 0 : splitChunksOriginConfig.cacheGroups) || {}), this.getSubPackageVendorsCacheGroup()), this.getSubCommonCacheGroup()), this.options.defaultSizeTypes) });
            });
            /**
             * 收集分包下的sub-vendors和sub-common下的公共模块信息
             */
            compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, chunks => {
                const existSubCommonDeps = new Map();
                for (const chunk of chunks) {
                    const chunkName = chunk.name;
                    if (this.matchSubVendors(chunk)) {
                        const subRoot = this.subRoots.find(subRoot => new RegExp(`^${subRoot}\\/`).test(chunkName));
                        this.subPackagesVendors.set(subRoot, chunk);
                    }
                    if (this.matchSubCommon(chunk)) {
                        const depName = chunkName.replace(new RegExp(`^${SUB_COMMON_DIR}\\/(.*)`), '$1');
                        if (this.subCommonDeps.has(depName)) {
                            existSubCommonDeps.set(depName, this.subCommonDeps.get(depName));
                        }
                    }
                }
                this.setChunkSubCommons(existSubCommonDeps);
                this.subCommonDeps = existSubCommonDeps;
            });
            /**
             * 处理分包文件
            */
            compilation.hooks.processAssets.tapAsync({
                name: PLUGIN_NAME,
                stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE // 对分包文件进行处理，放在内部处理 assets 的最后阶段，该 stage 是倒数第二个顺序
            }, this.tryAsync((assets) => {
                for (const entryName of compilation.entries.keys()) {
                    if (this.isSubEntry(entryName)) {
                        // 一些已经存在拓展名的 entry，不做处理，否则当分包是原生小程序时会出现 index.wxss.wxss 等情况
                        if (path_1.default.extname(entryName))
                            continue;
                        const subRoot = this.subRoots.find(subRoot => new RegExp(`^${subRoot}\\/`).test(entryName));
                        const subCommon = [...(this.subCommonChunks.get(entryName) || [])];
                        for (const key in FileExtsMap) {
                            const ext = FileExtsMap[key];
                            if (ext === FileExtsMap.JS || ext === FileExtsMap.STYLE || ext === FileExtsMap.TEMPLATE) {
                                const source = new ConcatSource();
                                const chunkName = `${entryName}${ext}`;
                                const chunkAbsolutePath = path_1.default.resolve(this.distPath, chunkName);
                                const subVendorsPath = path_1.default.join(subRoot, `${SUB_VENDORS_NAME}${ext}`);
                                // 将子包 vendors 插入到 entry 中
                                if (assets[(0, helper_1.normalizePath)(subVendorsPath)]) {
                                    const subVendorsAbsolutePath = path_1.default.resolve(this.distPath, subVendorsPath);
                                    const vendorsRelativePath = this.getRealRelativePath(chunkAbsolutePath, subVendorsAbsolutePath);
                                    if (ext === FileExtsMap.STYLE) {
                                        source.add(`@import ${JSON.stringify(`${vendorsRelativePath}`)};`);
                                    }
                                    if (ext === FileExtsMap.JS) {
                                        source.add(`require(${JSON.stringify(`${vendorsRelativePath}`)});`);
                                    }
                                }
                                // 将子包下的 common 模块替换为父包下的 common 模块
                                subCommon.forEach(moduleName => {
                                    const moduleFileName = `${moduleName}${ext}`;
                                    const moduleFilePath = path_1.default.join(SUB_COMMON_DIR, moduleFileName);
                                    const subRootModuleFilePath = path_1.default.join(subRoot, moduleFilePath);
                                    const assetSource = assets[(0, helper_1.normalizePath)(moduleFilePath)];
                                    if (assetSource) {
                                        const moduleAbsolutePath = path_1.default.resolve(this.distPath, subRootModuleFilePath);
                                        const chunkRelativePath = this.getRealRelativePath(path_1.default.resolve(this.distPath, chunkName), moduleAbsolutePath);
                                        assets[(0, helper_1.normalizePath)(subRootModuleFilePath)] = {
                                            size: () => assetSource.size(),
                                            source: () => assetSource.source(),
                                            updateHash: () => assetSource.updateHash,
                                            buffer: () => assetSource.buffer(),
                                            map: () => assetSource.map(),
                                            sourceAndMap: () => assetSource.sourceAndMap()
                                        };
                                        const originSourceMapPath = path_1.default.join(SUB_COMMON_DIR, `${moduleName}${FileExtsMap.JS_MAP}`);
                                        const originSourceMap = assets[originSourceMapPath];
                                        // 输出 source map
                                        if (ext === FileExtsMap.JS && originSourceMap) {
                                            const subRootSourceMapFilePath = path_1.default.join(subRoot, originSourceMapPath);
                                            assets[(0, helper_1.normalizePath)(subRootSourceMapFilePath)] = {
                                                size: () => originSourceMap.size(),
                                                source: () => originSourceMap.source(),
                                                updateHash: () => originSourceMap.updateHash,
                                                buffer: () => originSourceMap.buffer(),
                                                map: () => originSourceMap.map(),
                                                sourceAndMap: () => originSourceMap.sourceAndMap()
                                            };
                                        }
                                        if (ext === FileExtsMap.STYLE) {
                                            source.add(`@import ${JSON.stringify(`${chunkRelativePath}`)};`);
                                        }
                                        if (ext === FileExtsMap.JS) {
                                            source.add(`require(${JSON.stringify(`${chunkRelativePath}`)});`);
                                        }
                                    }
                                });
                                if (assets[chunkName]) {
                                    const originSource = assets[chunkName].source();
                                    if (ext === FileExtsMap.STYLE && typeof originSource === 'string') {
                                        if (originSource.indexOf('@charset') > -1) {
                                            assets[chunkName] = new RawSource(`@charset "UTF-8";${source.source()}${originSource.replace('@charset "UTF-8";', '')}`);
                                        }
                                        else {
                                            assets[chunkName] = new RawSource(`${source.source()}${originSource}`);
                                        }
                                    }
                                    if (ext === FileExtsMap.JS && typeof originSource === 'string') {
                                        if (originSource.indexOf('use strict') > -1) {
                                            assets[chunkName] = new RawSource(`"use strict";${source.source()}${originSource.replace('"use strict";', '')}`);
                                        }
                                        else {
                                            assets[chunkName] = new RawSource(`${source.source()}${originSource}`);
                                        }
                                    }
                                }
                                else {
                                    assets[chunkName] = new RawSource(`${source.source()}`);
                                }
                            }
                        }
                    }
                }
                /**
                 * 根目录下的sub-common资源删掉不输出
                 */
                for (const assetPath in assets) {
                    if (new RegExp(`^${SUB_COMMON_DIR}\\/.*`).test(assetPath)) {
                        delete assets[assetPath];
                    }
                }
            }));
        });
    }
    /**
     * 根据 webpack entry 配置获取入口文件路径
     */
    getAppEntry(compiler) {
        const { entry } = compiler.options;
        if ((0, shared_1.isFunction)(entry)) {
            return '';
        }
        function getEntryPath(entry) {
            const app = entry.app;
            if (Array.isArray(app)) {
                return app[0];
            }
            else if (Array.isArray(app.import)) {
                return app.import[0];
            }
            return app;
        }
        return getEntryPath(entry);
    }
    /**
     * 获取分包配置
     */
    getSubpackageConfig(compiler) {
        const appEntry = this.getAppEntry(compiler);
        const appConfigPath = this.getConfigFilePath(appEntry);
        const appConfig = (0, helper_1.readConfig)(appConfigPath, this.combination.config);
        return appConfig.subPackages || appConfig.subpackages || [];
    }
    /**
     * 根据 app、页面、组件的路径获取对应的 config 配置文件的路径
     */
    getConfigFilePath(filePath) {
        return (0, helper_1.resolveMainFilePath)(`${filePath.replace(path_1.default.extname(filePath), '')}.config`);
    }
    /**
     * 去掉尾部的/
     */
    formatSubRoot(subRoot) {
        const lastApl = subRoot[subRoot.length - 1];
        if (lastApl === '/') {
            subRoot = subRoot.slice(0, subRoot.length - 1);
        }
        return subRoot;
    }
    isSubChunk(chunk) {
        const isSubChunk = this.subRootRegExps.find(subRootRegExp => subRootRegExp.test(chunk.name));
        return !!isSubChunk;
    }
    /**
     * 判断是否是子 entry & 排除.config entry
     */
    isSubEntry(entry) {
        return !!this.subRootRegExps.find(subRootRegExp => subRootRegExp.test(entry)) && entry.indexOf('.config') === -1;
    }
    /**
     * match *\/sub-vendors
     */
    matchSubVendors(chunk) {
        const subVendorsRegExps = this.subRoots.map(subRoot => new RegExp(`^${(0, helper_1.normalizePath)(path_1.default.join(subRoot, SUB_VENDORS_NAME))}$`));
        const isSubVendors = subVendorsRegExps.find(subVendorsRegExp => subVendorsRegExp.test(chunk.name));
        return !!isSubVendors;
    }
    /**
     * match sub-common\/*
     */
    matchSubCommon(chunk) {
        return new RegExp(`^${SUB_COMMON_DIR}\\/`).test(chunk.name);
    }
    /**
     * 判断module有没被主包引用
     */
    hasMainChunk(chunkNames) {
        /**
         * 遍历chunk，如果其中有一个chunk，无法匹配分包root，则视为非分包的chunk
         */
        return !!chunkNames.find((chunkName) => !(this.subRootRegExps.find(subRootRegExp => subRootRegExp.test(chunkName))));
    }
    /**
     * 判断该module有没被多个分包引用
     */
    isSubsDep(chunkNames) {
        const chunkSubRoots = new Set();
        chunkNames.forEach((chunkName) => {
            this.subRoots.forEach((subRoot) => {
                if (new RegExp(`^${subRoot}\\/`).test(chunkName)) {
                    chunkSubRoots.add(subRoot);
                }
            });
        });
        return chunkSubRoots.size > 1;
    }
    /**
     * 仅分包有引用的module抽取到分包下的sub-vendors
     */
    getSubPackageVendorsCacheGroup() {
        const subPackageVendorsCacheGroup = {};
        this.subRoots.forEach(subRoot => {
            subPackageVendorsCacheGroup[subRoot] = {
                test: (module, { chunkGraph }) => {
                    if (this.hasExclude() && this.isExcludeModule(module)) {
                        return false;
                    }
                    const chunks = Array.from(chunkGraph.getModuleChunksIterable(module));
                    return chunks.every(chunk => new RegExp(`^${subRoot}\\/`).test(chunk.name));
                },
                name: (0, helper_1.normalizePath)(path_1.default.join(subRoot, SUB_VENDORS_NAME)),
                minChunks: 2,
                priority: 10000
            };
        });
        return subPackageVendorsCacheGroup;
    }
    /**
     * 没有被主包引用， 且被多个分包引用， 提取成单个模块，输出到sub-common下
     */
    getSubCommonCacheGroup() {
        const subCommonCacheGroup = {};
        this.subCommonDeps.forEach((depInfo, depName) => {
            const cacheGroupName = (0, helper_1.normalizePath)(path_1.default.join(SUB_COMMON_DIR, depName));
            subCommonCacheGroup[cacheGroupName] = {
                name: cacheGroupName,
                test: module => {
                    if (!module.resource) {
                        return !!module._identifier && module._identifier === depInfo.identifier;
                    }
                    return module.resource === depInfo.resource;
                },
                priority: 1000
            };
        });
        return subCommonCacheGroup;
    }
    hasExclude() {
        return (0, shared_1.isArray)(this.exclude) && this.exclude.length > 0;
    }
    isExcludeModule(module) {
        const moduleResource = module.resource;
        for (let i = 0; i < this.exclude.length; i++) {
            const excludeItem = this.exclude[i];
            if ((0, shared_1.isString)(excludeItem) && excludeItem === moduleResource) {
                return true;
            }
            if ((0, shared_1.isFunction)(excludeItem) && excludeItem(module)) {
                return true;
            }
        }
        return false;
    }
    setChunkSubCommons(subCommonDeps) {
        const subCommonChunks = new Map();
        subCommonDeps.forEach((depInfo, depName) => {
            const chunks = [...depInfo.chunks];
            if (depInfo.rawIdentifier.startsWith('xml/compile-mode')) {
                depName += '-templates';
            }
            chunks.forEach(chunk => {
                if (subCommonChunks.has(chunk)) {
                    const chunkSubCommon = subCommonChunks.get(chunk);
                    chunkSubCommon.add(depName);
                    subCommonChunks.set(chunk, chunkSubCommon);
                }
                else {
                    subCommonChunks.set(chunk, new Set([depName]));
                }
            });
        });
        this.subCommonChunks = subCommonChunks;
    }
    /**
     * 获取page相对于公共模块的路径
     */
    getRealRelativePath(from, to) {
        return (0, helper_1.promoteRelativePath)(path_1.default.relative(from, to));
    }
    /**
     * 判断module为external module
     */
    isExternalModule(module) {
        return !!module.external;
    }
    /**
     * 判断是否存在resource和_identifier
     */
    hasModuleId(module) {
        if (module.resource) {
            return true;
        }
        if (module._identifier) {
            return true;
        }
        return false;
    }
}
exports.default = MiniSplitChunksPlugin;
//# sourceMappingURL=MiniSplitChunksPlugin.js.map