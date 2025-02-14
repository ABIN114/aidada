import { PLATFORM_TYPE } from '@tarojs/shared';
import webpackDevServer from 'webpack-dev-server';
import { IPrebundle } from './prebundle';
import { type IWebPrebundleConfig } from './web';
import type { Compiler, EntryObject } from 'webpack';
import type Chain from 'webpack-chain';
import type { IMiniPrebundleConfig } from './mini';
export * from './prebundle';
export interface IPrebundleParam {
    env?: string;
    platformType?: PLATFORM_TYPE;
    appPath?: string;
    sourceRoot?: string;
    chain: Chain;
    entry?: EntryObject;
    chunkDirectory?: string;
    enableSourceMap?: boolean;
    entryFileName?: string;
    isWatch?: boolean;
    devServer?: webpackDevServer.Configuration;
    publicPath?: string;
    runtimePath?: string | string[];
    isBuildPlugin?: boolean;
    alias?: Record<string, any>;
    defineConstants?: Record<string, any>;
    modifyAppConfig?: (appConfig: any) => Promise<any>;
}
export default class TaroPrebundle {
    protected params: IPrebundleParam;
    env: string;
    platformType: PLATFORM_TYPE;
    isBuildPlugin: boolean;
    protected options: IPrebundle;
    constructor(params: IPrebundleParam);
    get config(): IWebPrebundleConfig | IMiniPrebundleConfig;
    get entry(): EntryObject;
    run(options?: IPrebundle): Promise<void>;
    postCompilerStart(compiler: Compiler): Promise<void>;
}
