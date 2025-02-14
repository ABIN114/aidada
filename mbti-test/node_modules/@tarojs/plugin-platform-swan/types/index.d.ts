import { TaroPlatformBase, IPluginContext } from "@tarojs/service";
import { RecursiveTemplate } from "@tarojs/shared/dist/template";
interface TemplateOptions {
    flattenViewLevel?: number;
    flattenCoverLevel?: number;
    flattenTextLevel?: number;
}
declare class Template extends RecursiveTemplate {
    supportXS: boolean;
    isXMLSupportRecursiveReference: boolean;
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
    flattenViewLevel: number;
    flattenCoverLevel: number;
    flattenTextLevel: number;
    legacyMiniComponents: {
        [key: string]: Record<string, string>;
    };
    constructor(options?: TemplateOptions);
    protected buildBaseTemplate(): string;
    createMiniComponents(components: any): any;
    buildXsTemplate(filePath?: string): string;
    dataKeymap(keymap: string): string;
    getAttrValue(value: string, key: string, nodeName: string): string;
    buildFlattenNodeAttributes(nodeName: string): string;
    buildFlattenView: (level?: number) => string;
    buildFlattenCover: (level?: number) => string;
    buildFlattenText: (level?: number) => string;
    modifyLoopBody: (child: string, nodeName: string) => string;
    modifyLoopContainer: (children: string, nodeName: string) => string;
    modifyTemplateResult: (res: string, nodeName: string) => string;
    buildXSTmpExtra(): string;
}
declare class Swan extends TaroPlatformBase {
    platform: string;
    globalObject: string;
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
    constructor(ctx: IPluginContext, config: any, options?: IOptions);
    /**
     * 增加组件或修改组件属性
     */
    modifyComponents(): void;
}
interface IOptions {
    flattenViewLevel?: number;
    flattenCoverLevel?: number;
    flattenTextLevel?: number;
}
declare const _default: (ctx: IPluginContext, options?: IOptions) => void;
export { _default as default, Swan, IOptions };
