"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const shared_1 = require("@tarojs/shared");
const path_1 = __importDefault(require("path"));
const web_1 = require("./web");
__exportStar(require("./prebundle"), exports);
class TaroPrebundle {
    constructor(params) {
        this.params = params;
        const { env = process.env.TARO_ENV || 'h5', isBuildPlugin = false } = params;
        const platform = params.platformType || process.env.TARO_PLATFORM || shared_1.PLATFORM_TYPE.WEB;
        this.isBuildPlugin = isBuildPlugin;
        this.platformType = (0, shared_1.getPlatformType)(env, platform);
        this.env = env || platform;
    }
    get config() {
        var _a, _b;
        const platformType = this.platformType;
        const env = this.env;
        const { appPath = process.cwd(), chain, chunkDirectory = 'chunk', devServer = (_a = chain.devServer) === null || _a === void 0 ? void 0 : _a.entries(), enableSourceMap = false, entryFileName = 'app', entry = this.entry, isWatch = false, publicPath = chain.output.get('publicPath') || '/', runtimePath, sourceRoot = 'src', isBuildPlugin, alias, defineConstants, modifyAppConfig, } = this.params;
        let chunkFilename = (_b = chain.output.get('chunkFilename')) !== null && _b !== void 0 ? _b : `${chunkDirectory}/[name].js`;
        chunkFilename = chunkFilename.replace(/\[([a-z]*hash)[^[\]\s]*\]/ig, '_$1_');
        chain.output.set('chunkFilename', chunkFilename);
        return {
            appPath,
            chain,
            chunkFilename,
            devServer,
            enableSourceMap,
            entryFileName,
            entry,
            env,
            isWatch,
            platformType,
            publicPath,
            runtimePath,
            sourceRoot,
            isBuildPlugin,
            alias,
            defineConstants,
            modifyAppConfig,
        };
    }
    get entry() {
        // NOTE: 如果传入 entry 为字符串， webpack-chain 会识别为 EntryObject，导致报错
        return Object.entries(this.params.chain.entryPoints.entries()).reduce((entry, [key, value]) => {
            entry[key] = value.values();
            return entry;
        }, {});
    }
    run(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.options = options;
            if (!options.enable)
                return;
            let prebundleRunner;
            switch (this.platformType) {
                case 'web':
                    prebundleRunner = new (yield Promise.resolve().then(() => __importStar(require('./web')))).WebPrebundle(this.config, options);
                    break;
                default:
                    prebundleRunner = new (yield Promise.resolve().then(() => __importStar(require('./mini')))).MiniPrebundle(this.config, options);
            }
            return prebundleRunner.run();
        });
    }
    postCompilerStart(compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.enable)
                return;
            if (this.platformType === 'web') {
                web_1.VirtualModule.apply(compiler);
                Object.values(this.entry).forEach((item) => {
                    let resource = '';
                    if (Array.isArray(item)) {
                        resource = item[0];
                    }
                    else if (typeof item === 'string') {
                        resource = item;
                    }
                    else if (typeof item.import === 'string') {
                        resource = item.import;
                    }
                    else {
                        resource = item.import[0];
                    }
                    const { dir, name } = path_1.default.parse(resource);
                    const filePath = path_1.default.join(dir, name).replace(/\.config/, '');
                    const bootPath = path_1.default.relative(this.config.appPath, `${filePath}.boot.js`);
                    web_1.VirtualModule.writeModule(bootPath, '/** bootstrap application code */');
                });
            }
        });
    }
}
exports.default = TaroPrebundle;
//# sourceMappingURL=index.js.map