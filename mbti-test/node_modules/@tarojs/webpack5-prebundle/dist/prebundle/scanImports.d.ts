import type Chain from 'webpack-chain';
import type { CollectedDeps } from '../utils/constant';
interface ScanImportsConfig {
    appPath: string;
    chain: Chain;
    entries: string[];
    include: string[];
    exclude: string[];
    customEsbuildConfig?: Record<string, any>;
    mainFields?: string[];
}
export declare function scanImports({ appPath, chain, entries, include, exclude, customEsbuildConfig, mainFields }: ScanImportsConfig, deps?: CollectedDeps): Promise<CollectedDeps>;
export {};
