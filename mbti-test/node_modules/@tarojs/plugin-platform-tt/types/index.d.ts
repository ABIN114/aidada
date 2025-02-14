import { TaroPlatformBase, IPluginContext } from "@tarojs/service";
import { RecursiveTemplate } from "@tarojs/shared/dist/template";
declare class Template extends RecursiveTemplate {
    supportXS: boolean;
    Adapter: {
        if: string;
        else: string;
        elseif: string;
        for: string;
        forItem: string;
        forIndex: string;
        key: string;
        xs: string;
        type: string;
    };
    replacePropName(name: string, value: string): string;
    buildXsTemplate(filePath?: string): string;
}
declare class TT extends TaroPlatformBase {
    platform: string;
    globalObject: string;
    projectConfigJson: string;
    runtimePath: string;
    taroComponentsPath: string;
    fileType: {
        templ: string;
        style: string;
        config: string;
        script: string;
        xs: string;
    };
    template: Template;
    /**
     * 1. setupTransaction - init
     * 2. setup
     * 3. setupTransaction - close
     * 4. buildTransaction - init
     * 5. build
     * 6. buildTransaction - close
     */
    constructor(ctx: any, config: any);
    /**
     * 增加组件或修改组件属性
     */
    modifyTemplate(): void;
}
declare const _default: (ctx: IPluginContext) => void;
export { _default as default, TT };
