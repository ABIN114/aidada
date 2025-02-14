import ContainerReferencePlugin from 'webpack/lib/container/ContainerReferencePlugin';
import { CollectedDeps } from '../utils/constant';
import type { PLATFORM_TYPE } from '@tarojs/shared';
import type { Compiler } from 'webpack';
import type { ContainerReferencePluginOptions } from 'webpack/types';
type MFOptions = Partial<ContainerReferencePluginOptions>;
interface IParams {
    deps: CollectedDeps;
    env: string;
    isBuildPlugin?: boolean;
    platformType: PLATFORM_TYPE;
    remoteAssets?: Record<'name', string>[];
    runtimeRequirements: Set<string>;
}
export default class TaroContainerReferencePlugin extends ContainerReferencePlugin {
    private params;
    private deps;
    private remoteAssets;
    private remoteName;
    private remoteConfig;
    private isBuildPlugin;
    private runtimeRequirements;
    protected _remoteType?: ContainerReferencePluginOptions['remoteType'];
    protected _remotes: any;
    constructor(options: MFOptions, params: IParams);
    apply(compiler: Compiler): void;
    applyWebApp(compiler: Compiler): void;
    applyMiniApp(compiler: Compiler): void;
}
export {};
