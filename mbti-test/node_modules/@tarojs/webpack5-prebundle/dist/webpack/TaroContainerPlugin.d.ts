/**
 * Modify from https://github.com/webpack/webpack/blob/main/lib/container/ContainerPlugin.js
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
 */
import ContainerPlugin from 'webpack/lib/container/ContainerPlugin';
import type { PLATFORM_TYPE } from '@tarojs/shared';
import type { Compiler } from 'webpack';
interface IParams {
    env: string;
    platformType: PLATFORM_TYPE;
    runtimeRequirements?: Set<string>;
}
declare class TaroContainerPlugin extends ContainerPlugin {
    private params;
    runtimeRequirements: Exclude<IParams['runtimeRequirements'], undefined>;
    constructor(options: any, params: IParams);
    apply(compiler: Compiler): void;
    applyMiniApp(compiler: Compiler): void;
}
export default TaroContainerPlugin;
