"use strict";
/**
 * inspire from mini-css-extract-plugin
 *
 * # mini-css-extract-plugin
 * ## License
  Copyright JS Foundation and other contributors

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  'Software'), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
exports.XMLDependency = exports.templatesCache = exports.FILE_COUNTER_MAP = void 0;
const path_1 = __importDefault(require("path"));
const webpack_1 = __importStar(require("webpack"));
const PLUGIN_NAME = 'taro-compile-mode-plugin';
const MODULE_TYPE = 'xml/compile-mode';
const TYPES = new Set([MODULE_TYPE]);
const CODE_GENERATION_RESULT = {
    sources: new Map(),
    runtimeRequirements: new Set(),
};
exports.FILE_COUNTER_MAP = new Map();
exports.templatesCache = [];
class XMLDependencyTemplate {
    apply() { }
}
class XMLDependency extends webpack_1.Dependency {
    constructor({ identifier, context, content, resourcePath, fileCount }) {
        super();
        this.identifier = identifier;
        this.context = context;
        this.content = content;
        this.resourcePath = resourcePath;
        this.fileCount = fileCount;
    }
    getResourceIdentifier() {
        return `xml-module-${this.identifier}`;
    }
    getModuleEvaluationSideEffectsState() {
        return webpack_1.default.ModuleGraphConnection.TRANSITIVE_ONLY;
    }
    serialize(context) {
        const { write } = context;
        write(this.identifier);
        write(this.context);
        write(this.content);
        write(this.resourcePath);
        write(this.fileCount);
        super.serialize(context);
    }
    deserialize(context) {
        super.deserialize(context);
    }
}
exports.XMLDependency = XMLDependency;
webpack_1.default.util.serialization.register(XMLDependency, '@tarojs/webpack5-runner/dist/plugins/MiniCompileModePlugin/XMLDependency', 'XMLDependency', {
    serialize(obj, context) {
        obj.serialize(context);
    },
    deserialize(context) {
        const { read } = context;
        const _identifier = read();
        const _context = read();
        const content = read();
        const resourcePath = read();
        const fileCount = read();
        exports.FILE_COUNTER_MAP.set(resourcePath, fileCount);
        const obj = new XMLDependency({
            identifier: _identifier,
            context: _context,
            content: content,
            resourcePath: resourcePath,
            fileCount: fileCount,
        });
        obj.deserialize(context);
        return obj;
    }
});
class XMLModule extends webpack_1.Module {
    constructor({ identifier, context, content }) {
        super(MODULE_TYPE, context);
        this._needBuild = true;
        this._identifier = identifier;
        this._context = context;
        this.content = content;
    }
    identifier() {
        return `${this.type}|${this._identifier}`;
    }
    readableIdentifier() {
        return this._identifier;
    }
    getSourceTypes() {
        return TYPES;
    }
    codeGeneration() {
        return CODE_GENERATION_RESULT;
    }
    size() {
        return this.content.length;
    }
    build(_options, compilation, _resolver, _fileSystem, callback) {
        this.buildInfo = {
            cacheable: true,
            hash: this._computeHash(compilation.outputOptions.hashFunction)
        };
        this.buildMeta = {};
        this._needBuild = false;
        callback();
    }
    needBuild(_context, callback) {
        callback(null, this._needBuild);
    }
    updateHash(hash, context) {
        super.updateHash(hash, context);
        hash.update(this.buildInfo.hash);
    }
    updateCacheModule(module) {
        if (this.content !== module.content) {
            super.updateCacheModule(module);
            this._needBuild = true;
            this.content = module.content;
        }
    }
    _computeHash(hashFunction) {
        const hash = webpack_1.default.util.createHash(hashFunction);
        hash.update(this.content);
        return hash.digest('hex');
    }
    serialize(context) {
        const { write } = context;
        write(this._identifier);
        write(this._context);
        write(this.content);
        write(this._needBuild);
        super.serialize(context);
    }
    deserialize(context) {
        this._needBuild = context.read();
        super.deserialize(context);
    }
}
webpack_1.default.util.serialization.register(XMLModule, '@tarojs/webpack5-runner/dist/plugins/MiniCompileModePlugin/XMLModule', 'XMLModule', {
    serialize(obj, context) {
        obj.serialize(context);
    },
    deserialize(context) {
        const { read } = context;
        const _identifier = read();
        const _context = read();
        const content = read();
        const obj = new XMLModule({
            identifier: _identifier,
            context: _context,
            content: content,
        });
        obj.deserialize(context);
        return obj;
    }
});
class XMLFactory {
    create({ dependencies }, callback) {
        callback(undefined, new XMLModule(dependencies[0]));
    }
}
class MiniCompileModePlugin {
    // eslint-disable-next-line no-useless-constructor
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const combination = this.options.combination;
        const fileType = combination.fileType;
        const template = combination.config.template;
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
            compilation.dependencyFactories.set(XMLDependency, new XMLFactory());
            compilation.dependencyTemplates.set(XMLDependency, new XMLDependencyTemplate());
            compilation.hooks.renderManifest.tap(PLUGIN_NAME, (result, { chunk }) => {
                const renderedModules = Array.from(compilation.chunkGraph.getChunkModulesIterableBySourceType(chunk, MODULE_TYPE) || []);
                if (renderedModules.length > 0) {
                    result.push({
                        render: () => {
                            const { ConcatSource } = webpack_1.default.sources;
                            const source = new ConcatSource();
                            this.sortModules(renderedModules);
                            for (const module of renderedModules) {
                                source.add(module.content);
                                source.add('\n');
                            }
                            return source;
                        },
                        filenameTemplate: `[name]-templates${fileType.templ}`,
                        pathOptions: {
                            chunk,
                            contentHashType: MODULE_TYPE
                        },
                        identifier: `${PLUGIN_NAME}.${chunk.id}`,
                        hash: chunk.contentHash[MODULE_TYPE]
                    });
                }
                return result;
            });
            compilation.hooks.contentHash.tap(PLUGIN_NAME, (chunk) => {
                const { outputOptions, chunkGraph } = compilation;
                const modules = Array.from(chunkGraph.getChunkModulesIterableBySourceType(chunk, MODULE_TYPE) || []);
                if (modules.length) {
                    const { hashFunction, hashDigest, hashDigestLength } = outputOptions;
                    const hash = webpack_1.default.util.createHash(hashFunction);
                    this.sortModules(modules);
                    for (const m of modules) {
                        hash.update(chunkGraph.getModuleHash(m, chunk.runtime));
                    }
                    chunk.contentHash[MODULE_TYPE] = hash.digest(hashDigest).substring(0, hashDigestLength);
                }
            });
            compilation.hooks.processAssets.tapAsync({
                name: PLUGIN_NAME,
                stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT
            }, (assets, callback) => __awaiter(this, void 0, void 0, function* () {
                const baseTemplName = `base${fileType.templ}`;
                const raw = assets[baseTemplName];
                const { ConcatSource } = compiler.webpack.sources;
                const source = new ConcatSource(raw);
                if (exports.templatesCache.length) {
                    let cur;
                    while ((cur = exports.templatesCache.shift()) !== undefined) {
                        source.add('\n');
                        source.add(cur);
                    }
                }
                else {
                    Object.keys(assets)
                        .filter(key => (new RegExp(`-templates${fileType.templ}$`)).test(key))
                        .map(key => {
                        const source = new ConcatSource();
                        source.add(`<import src="${path_1.default.relative(path_1.default.dirname(key), `./${baseTemplName}`)}"/>\n`);
                        if (fileType.xs) {
                            const content = template.buildXsTemplate(path_1.default.relative(path_1.default.dirname(key), `./utils`)) + '\n';
                            source.add(content);
                        }
                        source.add(assets[key]);
                        assets[key] = source;
                        return key;
                    })
                        .reduce((pre, cur) => {
                        pre.add(`\n<import src="${cur}"/>`);
                        return pre;
                    }, source);
                }
                compilation.assets[baseTemplName] = source;
                callback();
            }));
        });
    }
    sortModules(modules) {
        const reg = /f(\d+)/;
        modules.sort((a, b) => {
            const [, a1] = reg.exec(a._identifier);
            const [, b1] = reg.exec(b._identifier);
            return Number(a1) - Number(b1);
        });
    }
}
exports.default = MiniCompileModePlugin;
//# sourceMappingURL=MiniCompileModePlugin.js.map