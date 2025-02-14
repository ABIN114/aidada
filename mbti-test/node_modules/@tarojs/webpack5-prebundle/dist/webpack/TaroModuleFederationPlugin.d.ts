import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';
import { CollectedDeps } from '../utils/constant';
import type { PLATFORM_TYPE } from '@tarojs/shared';
import type { Compiler, LibraryOptions } from 'webpack';
import type { ModuleFederationPluginOptions } from 'webpack/types';
interface IParams {
    deps: CollectedDeps;
    env: string;
    isBuildPlugin?: boolean;
    platformType: PLATFORM_TYPE;
    remoteAssets?: Record<'name', string>[];
    runtimeRequirements: Set<string>;
}
export default class TaroModuleFederationPlugin extends ModuleFederationPlugin {
    private params;
    private deps;
    private isBuildPlugin;
    private remoteAssets;
    private runtimeRequirements;
    protected _options: ModuleFederationPluginOptions;
    protected _Library: LibraryOptions;
    constructor(options: ModuleFederationPluginOptions, params: IParams);
    /** Apply the plugin */
    apply(compiler: Compiler): void;
}
export {};
