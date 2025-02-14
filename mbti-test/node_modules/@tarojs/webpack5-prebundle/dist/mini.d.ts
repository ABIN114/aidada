import BasePrebundle, { IPrebundleConfig } from './prebundle';
export interface IMiniPrebundleConfig extends IPrebundleConfig {
    runtimePath?: string | string[];
    isBuildPlugin?: boolean;
}
export declare class MiniPrebundle extends BasePrebundle<IMiniPrebundleConfig> {
    getIsBuildPluginPath(filePath: any, isBuildPlugin: any): any;
    bundle(): Promise<any>;
    buildLib(): Promise<void>;
    run(): Promise<void>;
}
