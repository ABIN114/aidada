import { sources } from 'webpack';
import type { Chunk, Compilation } from 'webpack';
/**
 * 在文本头部加入一些 require 语句
 */
export declare function addRequireToSource(id: string, modules: sources.Source, commonChunks: (Chunk | {
    name: string;
})[]): sources.ConcatSource;
export declare function getChunkEntryModule(compilation: Compilation, chunk: Chunk): import("webpack").Module | undefined;
export declare function getChunkIdOrName(chunk: Chunk): string;
