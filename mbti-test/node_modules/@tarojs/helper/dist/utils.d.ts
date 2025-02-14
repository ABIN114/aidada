import * as fs from 'fs-extra';
import { processTypeEnum } from './constants';
export declare function normalizePath(path: string): string;
export declare const isNodeModule: (filename: string) => boolean;
export declare function isNpmPkg(name: string): boolean;
export declare function isQuickAppPkg(name: string): boolean;
export declare function isAliasPath(name: string, pathAlias?: Record<string, any>): boolean;
export declare function replaceAliasPath(filePath: string, name: string, pathAlias?: Record<string, any>): string;
export declare function promoteRelativePath(fPath: string): string;
export declare function resolveStylePath(p: string): string;
export declare function printLog(type: processTypeEnum, tag: string, filePath?: string): void;
export declare function recursiveFindNodeModules(filePath: string, lastFindPath?: string): string;
export declare function getUserHomeDir(): string;
export declare function getTaroPath(): string;
export declare function getConfig(): Record<string, any>;
export declare function getSystemUsername(): string;
export declare function shouldUseYarn(): boolean;
export declare function shouldUseCnpm(): boolean;
export declare function isEmptyObject(obj: any): boolean;
export declare function resolveMainFilePath(p: string, extArrs?: string[]): string;
export declare function resolveScriptPath(p: string): string;
export declare function generateEnvList(env: Record<string, any>): Record<string, any>;
/**
 * 获取 npm 文件或者依赖的绝对路径
 *
 * @param {string} 参数1 - 组件路径
 * @param {string} 参数2 - 文件扩展名
 * @returns {string} npm 文件绝对路径
 */
export declare function getNpmPackageAbsolutePath(npmPath: string, defaultFile?: string): string | null;
export declare function generateConstantsList(constants: Record<string, any>): Record<string, any>;
export declare function cssImports(content: string): string[];
export declare function emptyDirectory(dirPath: string, opts?: {
    excludes: Array<string | RegExp> | string | RegExp;
}): void;
export declare const pascalCase: (str: string) => string;
export declare function getInstalledNpmPkgPath(pkgName: string, basedir: string): string | null;
export declare function getInstalledNpmPkgVersion(pkgName: string, basedir: string): string | null;
export declare const recursiveMerge: <T = any>(src: Partial<T>, ...args: (Partial<T> | undefined)[]) => any;
export declare const mergeVisitors: (src: any, ...args: any[]) => any;
export declare const applyArrayedVisitors: (obj: any) => any;
export declare function unzip(zipPath: any): Promise<void>;
export declare const getAllFilesInFolder: (folder: string, filter?: string[]) => Promise<string[]>;
export interface FileStat {
    name: string;
    isDirectory: boolean;
    isFile: boolean;
}
export declare function readDirWithFileTypes(folder: string): FileStat[];
export declare function extnameExpRegOf(filePath: string): RegExp;
export declare function addPlatforms(platform: string): void;
export declare const getModuleDefaultExport: (exports: any) => any;
export declare function removeHeadSlash(str: string): string;
export declare function readPageConfig(configPath: string): any;
interface IReadConfigOptions {
    defineConstants?: Record<string, any>;
    alias?: Record<string, any>;
}
export declare function readConfig<T extends IReadConfigOptions>(configPath: string, options?: T): any;
export { fs };
