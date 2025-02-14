import { esbuild, swc } from '@tarojs/helper';
import { parse } from 'es-module-lexer';
import type Chain from 'webpack-chain';
import type { CollectedDeps } from '../utils/constant';
type ExportsData = ReturnType<typeof parse> & {
    hasReExports?: boolean;
    needInterop?: boolean;
};
interface BundleConfig {
    appPath: string;
    deps: CollectedDeps;
    chain: Chain;
    prebundleOutputDir: string;
    customEsbuildConfig?: Record<string, any>;
    customSwcConfig?: swc.Config;
    mainFields?: string[];
}
export declare function bundle({ appPath, deps, chain, prebundleOutputDir, customEsbuildConfig, customSwcConfig, mainFields }: BundleConfig): Promise<esbuild.BuildResult<{
    absWorkingDir: string;
    bundle: true;
    write: false;
    entryPoints: string[];
    mainFields: string[];
    format: "esm";
    loader: any;
    define: any;
    splitting: true;
    metafile: true;
    ignoreAnnotations: true;
    outdir: string;
    plugins: any[];
}>>;
export declare function getSwcPlugin({ appPath, flatIdExports }: {
    appPath: string;
    flatIdExports: Map<string, ExportsData>;
}, config?: swc.Config): esbuild.Plugin;
export {};
