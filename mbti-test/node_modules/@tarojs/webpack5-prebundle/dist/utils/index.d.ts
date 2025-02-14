import type Chain from 'webpack-chain';
import type { CollectedDeps } from './constant';
export interface Metadata {
    bundleHash?: string;
    mfHash?: string;
    taroRuntimeBundlePath?: string;
    runtimeRequirements?: Set<string>;
    remoteAssets?: {
        name: string;
    }[];
}
export declare function createResolve(appPath: string, resolveOptions: any): void;
export declare function getResolve(): (importer: string, request: string) => Promise<string>;
export declare function flattenId(id: string): string;
export declare function getCacheDir(appPath: string, env?: string): string;
export declare function getDefines(chain: Chain): any;
export declare function isExclude(id: string, excludes: (string | RegExp)[]): boolean;
export declare function isOptimizeIncluded(path: string): boolean;
export declare function isScanIncluded(path: string): boolean;
export declare function getHash(content: string): string;
export declare function getBundleHash(appPath: string, deps: CollectedDeps, chain: Chain, cacheDir: string): Promise<string>;
export declare const sortDeps: (a: string | string[], b: string | string[]) => number;
export declare function formatDepsString(deps: CollectedDeps): string;
export declare function getMfHash(obj: Record<string, any>): string;
export declare function commitMeta(appPath: string, metadataPath: string, metadata: Metadata): Promise<void>;
export declare function getMeasure(isLogTiming?: boolean): (name: string, start: number) => void;
export * from './path';
export * from './webpack';
