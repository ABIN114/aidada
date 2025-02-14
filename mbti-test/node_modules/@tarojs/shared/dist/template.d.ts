declare const internalComponents: Record<string, Record<string, string>>;
// 字符串简写
declare const enum Shortcuts {
    Container = "container",
    Childnodes = "cn",
    Text = "v",
    NodeType = "nt",
    NodeName = "nn",
    // Attrtibutes
    Style = "st",
    Class = "cl",
    Src = "src"
}
declare function toCamelCase(s: string): string;
declare function capitalize(s: string): string;
interface Component {
    nodeName: string;
    nodeAlias: string;
    attributes: Attributes;
}
interface Components {
    [key: string]: Record<string, string>;
}
interface ComponentConfig {
    includes: Set<string>;
    exclude: Set<string>;
    thirdPartyComponents: Map<string, Set<string>>;
    includeAll: boolean;
}
interface IAdapter {
    if: string;
    else: string;
    elseif: string;
    for: string;
    forItem: string;
    forIndex: string;
    key: string;
    xs?: string;
    type: string;
}
type Attributes = Record<string, string>;
declare const styles: {
    style: string;
    class: string;
};
declare const events: {
    bindtap: string;
};
declare class BaseTemplate {
    protected _baseLevel: number;
    protected exportExpr: string;
    protected isSupportRecursive: boolean;
    protected miniComponents: Components;
    protected thirdPartyPatcher: Record<string, Record<string, string>>;
    protected modifyCompProps?: (compName: string, target: Record<string, string>) => Record<string, string>;
    protected modifyLoopBody?: (child: string, nodeName: string) => string;
    protected modifyLoopContainer?: (children: string, nodeName: string) => string;
    protected modifyTemplateResult?: (res: string, nodeName: string, level: number, children: string) => string;
    protected modifyThirdPartyLoopBody?: (child: string, nodeName: string) => string;
    supportXS: boolean;
    isXMLSupportRecursiveReference: boolean;
    Adapter: IAdapter;
    /** 组件列表 */
    internalComponents: Record<string, Record<string, string>>;
    /** 可以 focus 聚焦的组件 */
    focusComponents: Set<string>;
    /** 不需要渲染子节点的元素 */
    voidElements: Set<string>;
    /** 可以递归调用自身的组件 */
    nestElements: Map<string, number>;
    componentsAlias: any;
    set baseLevel(lv: number);
    get baseLevel(): number;
    private buildAttribute;
    protected replacePropName(name: string, value: string, _componentName?: string, _componentAlias?: any): string;
    createMiniComponents(components: Components): Components;
    protected buildBaseTemplate(): string;
    protected buildThirdPartyAttr(attrs: Set<string>, patcher?: Record<string, string>): string;
    protected buildComponentTemplate(comp: Component, level: number): string;
    private getChildrenTemplate;
    private getChildren;
    protected buildFocusComponentTemplate(comp: Component, level: number): string;
    protected buildStandardComponentTemplate(comp: Component, level: number): string;
    protected buildPlainTextTemplate(level: number): string;
    protected buildThirdPartyTemplate(level: number, componentConfig: ComponentConfig): string;
    // 最后一层的 comp 需要引用 container 进行重新的模版循环，其他情况不需要 container
    protected buildContainerTemplate(level: number): string;
    protected dataKeymap(keymap: string): string;
    protected getEvents(): any;
    protected getAttrValue(value: string, _key: string, _nodeName: string): string;
    buildXsTemplate(_filePath?: string): string;
    buildPageTemplate: (baseTempPath: string, _page: {
        content: Record<string, any>;
        path: string;
    }) => string;
    buildBaseComponentTemplate: (ext: string) => string;
    buildCustomComponentTemplate: (ext: string) => string;
    buildXScript: () => string;
    mergeComponents(ctx: any, patch: Record<string, Record<string, string>>): void;
    mergeThirdPartyComponents(patch: Record<string, Record<string, string>>): void;
    protected buildXSTmplName(): string;
    protected buildXSTepFocus(nn: string): string;
    protected buildXSTmpExtra(): string;
}
declare class RecursiveTemplate extends BaseTemplate {
    isSupportRecursive: boolean;
    buildTemplate: (componentConfig: ComponentConfig) => string;
}
declare class UnRecursiveTemplate extends BaseTemplate {
    isSupportRecursive: boolean;
    protected _baseLevel: number;
    private componentConfig;
    buildTemplate: (componentConfig: ComponentConfig) => string;
    protected buildFloor(level: number, components: string[], restart?: boolean): string;
    protected buildOptimizeFloor(level: number, components: string[], restart?: boolean): string;
    protected buildXSTmplName(): string;
    protected buildXSTmpExtra(): string;
}
export { IAdapter, Attributes, styles, events, BaseTemplate, RecursiveTemplate, UnRecursiveTemplate, capitalize, internalComponents, Shortcuts, toCamelCase };
