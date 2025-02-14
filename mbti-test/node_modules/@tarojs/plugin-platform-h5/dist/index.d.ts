/// <reference types="o" />
import { TaroPlatformWeb, IPluginContext, TConfig } from "@tarojs/service";
import * as resolve from "resolve";
declare class H5 extends TaroPlatformWeb {
    platform: string;
    runtimePath: string[] | string;
    constructor(ctx: IPluginContext, config: TConfig);
    get framework(): "vue3" | "react" | "preact" | "nerv" | "vue";
    get useHtmlComponents(): boolean;
    get useDeprecatedAdapterComponent(): boolean;
    get apiLibrary(): string;
    get aliasFramework(): string;
    get componentLibrary(): string;
    get componentAdapter(): string;
    get routerLibrary(): string;
    get libraryDefinition(): string;
    /**
     * 修改 Webpack 配置
     */
    modifyWebpackConfig(): void;
}
declare const _default: (ctx: IPluginContext) => void;
declare function resolveSync(id: string, opts?: resolve.SyncOpts): string;
export { _default as default, H5, resolveSync };
