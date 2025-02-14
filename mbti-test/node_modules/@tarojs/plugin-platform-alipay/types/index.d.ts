import { TaroPlatformBase, IPluginContext } from "@tarojs/service";
import { RecursiveTemplate } from "@tarojs/shared/dist/template";
declare class Template extends RecursiveTemplate {
    exportExpr: string;
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
    transferComponents: Record<string, Record<string, string>>;
    constructor();
    buildXsTemplate(filePath?: string): string;
    replacePropName(name: any, value: any, compName: any, componentAlias: any): any;
    getEvents(): {
        onTap: string;
        onTouchMove: string;
        onTouchEnd: string;
        onTouchCancel: string;
        onLongTap: string;
    };
    buildThirdPartyAttr(attrs: Set<string>): string;
    createMiniComponents(components: any): any;
    modifyLoopBody: (child: string, nodeName: string) => string;
    modifyLoopContainer: (children: string, nodeName: string) => string;
    modifyTemplateResult: (res: string, nodeName: string) => string;
    modifyThirdPartyLoopBody: () => string;
    buildXSTmpExtra(): string;
    buildPageTemplate: (baseTempPath: string, page: any) => string;
}
declare class Alipay extends TaroPlatformBase {
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
    constructor(ctx: any, config: any);
    /**
     * 转换用户编写的配置（微信小程序标准）为支付宝小程序标准
     */
    modifyMiniConfigs(): void;
    /**
     * 增加组件或修改组件属性
     */
    modifyComponents(): void;
    /**
     * 修改 Slider 组件属性
     */
    modifySlider(slider: any): void;
    /**
     * 修改 Swiper 组件属性
     */
    modifySwiper(swiper: any): void;
    /**
     * 修改 Webpack 配置
     */
    modifyWebpackConfig(): void;
}
declare const _default: (ctx: IPluginContext) => void;
export { _default as default, Alipay };
