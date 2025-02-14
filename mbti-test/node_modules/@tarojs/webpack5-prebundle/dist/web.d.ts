import VirtualModulesPlugin from 'webpack-virtual-modules';
import BasePrebundle, { IPrebundleConfig } from './prebundle';
import type webpackDevServer from 'webpack-dev-server';
import type { IPrebundle } from './prebundle';
export declare const VirtualModule: VirtualModulesPlugin;
export interface IWebPrebundleConfig extends IPrebundleConfig {
    runtimePath?: string | string[];
    chunkFilename?: string;
    devServer?: webpackDevServer.Configuration;
    publicPath?: string;
}
export declare class WebPrebundle extends BasePrebundle<IWebPrebundleConfig> {
    protected config: IWebPrebundleConfig;
    protected option: IPrebundle;
    constructor(config: IWebPrebundleConfig, option: IPrebundle);
    buildLib(): Promise<void>;
    /**
     * TODO:
     * - [ ] 开发环境依赖更新触发 ws 热加载心跳
     * - [ ] 回归 react、vue 热更新状态
     */
    run(): Promise<void>;
}
