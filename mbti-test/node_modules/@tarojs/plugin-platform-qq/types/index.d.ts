import { Weapp, IOptions } from "@tarojs/plugin-platform-weapp";
import { IPluginContext } from '@tarojs/service';
declare class QQ extends Weapp {
    platform: string;
    globalObject: string;
    projectConfigJson: string;
    runtimePath: string;
    fileType: {
        templ: string;
        style: string;
        config: string;
        script: string;
        xs: string;
    };
    /**
     * 1. setupTransaction - init
     * 2. setup
     * 3. setupTransaction - close
     * 4. buildTransaction - init
     * 5. build
     * 6. buildTransaction - close
     */
    constructor(ctx: any, config: any, pluginOptions: IOptions);
    beforeBuild(): void;
}
declare const _default: (ctx: IPluginContext, options: IOptions) => void;
export { _default as default, QQ };
