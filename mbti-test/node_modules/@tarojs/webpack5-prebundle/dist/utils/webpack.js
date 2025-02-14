"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunkIdOrName = exports.getChunkEntryModule = exports.addRequireToSource = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
const { ConcatSource } = webpack_1.sources;
/**
 * 在文本头部加入一些 require 语句
 */
function addRequireToSource(id, modules, commonChunks) {
    const source = new ConcatSource();
    commonChunks.forEach(chunkItem => {
        source.add(`require(${JSON.stringify((0, helper_1.promoteRelativePath)(path_1.default.relative(id, chunkItem.name)))});\n`);
    });
    source.add('\n');
    source.add(modules);
    source.add(';');
    return source;
}
exports.addRequireToSource = addRequireToSource;
function getChunkEntryModule(compilation, chunk) {
    const chunkGraph = compilation.chunkGraph;
    const entryModules = Array.from(chunkGraph.getChunkEntryModulesIterable(chunk));
    if (entryModules.length) {
        return entryModules[0];
    }
}
exports.getChunkEntryModule = getChunkEntryModule;
function getChunkIdOrName(chunk) {
    if (typeof chunk.id === 'string') {
        return chunk.id;
    }
    return chunk.name;
}
exports.getChunkIdOrName = getChunkIdOrName;
//# sourceMappingURL=webpack.js.map