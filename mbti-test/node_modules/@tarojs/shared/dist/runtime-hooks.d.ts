/**
 * 这里我们需要关心的小程序种类有两类：
 * 1. 模板递归：
 *  - 支持：tmpl0 套 tmpl0
 *  - 不支持：这就使得我们必须生成多级的模板，tmpl0 套 tmpl1，tmpl1 套 tmpl2……
 *           直到超过阈值 N (N = config.miniapp.baseLevel) tmplN 会套组件 comp，组件 comp 重新再套 tmpl0。
 * 2. 小程序脚本语言（wxs, sjs, etc...）：
 *  - 支持：可以在模板使用函数缩减模板大小或提高性能（存疑），例如判断一个值是不是假值（falsy value）。
 *         将来或许会把数据序列化^1 的操作也放到小程序脚本语言里。
 *  - 不支持：使用纯 *xml 语法
 *
 * ^1: packages/taro-runtime/src/hydrate.ts
 */
import { internalComponents } from "./components.js";
import { Shortcuts } from "./shortcuts.js";
import { capitalize, toCamelCase } from "./utils.js";
import { Events } from "./event-emitter.js";
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
type TFunc = (...args: any[]) => any;
declare enum HOOK_TYPE {
    SINGLE = 0,
    MULTI = 1,
    WATERFALL = 2
}
interface Hook {
    type: HOOK_TYPE;
    initial?: TFunc | null;
}
interface MiniLifecycle {
    app: [
        string,
        string,
        string /** onHide */
    ];
    page: [
        string,
        string,
        string,
        string,
        string,
        string[],
        string[] /** side-effects */
    ];
    component: [
        string,
        string
    ];
}
interface MiniElementData {
    [Shortcuts.Childnodes]?: MiniData[];
    [Shortcuts.NodeName]: string;
    [Shortcuts.Class]?: string;
    [Shortcuts.Style]?: string;
    uid?: string;
    sid: string;
    [key: string]: unknown;
}
interface MiniTextData {
    [Shortcuts.Text]: string;
    [Shortcuts.NodeName]: string;
}
type MiniData = MiniElementData | MiniTextData;
interface UpdatePayload {
    path: string;
    value: string | boolean | (() => MiniData | MiniData[]);
}
type Target = Record<string, unknown> & {
    dataset: Record<string, unknown>;
    id: string;
};
interface MpEvent {
    type: string;
    detail: Record<string, unknown>;
    target: Target;
    currentTarget: Target;
}
declare function TaroHook(type: HOOK_TYPE, initial?: TFunc): Hook;
declare class TaroHooks<T extends Record<string, TFunc> = any> extends Events {
    hooks: Record<keyof T, Hook>;
    constructor(hooks: Record<keyof T, Hook>, opts?: any);
    private tapOneOrMany;
    tap<K extends Extract<keyof T, string>>(hookName: K, callback: T[K] | T[K][]): void;
    call<K extends Extract<keyof T, string>>(hookName: K, ...rest: Parameters<T[K]>): ReturnType<T[K]> | undefined;
    isExist(hookName: string): boolean;
}
type ITaroHooks = {
    /** 小程序端 App、Page 构造对象的生命周期方法名称 */
    getMiniLifecycle: (defaultConfig: MiniLifecycle) => MiniLifecycle;
    getMiniLifecycleImpl: () => MiniLifecycle;
    /** 解决 React 生命周期名称的兼容问题 */
    getLifecycle: (instance: any, lifecyle: any) => TFunc | Array<TFunc> | undefined;
    /** 提供Hook，为不同平台提供修改生命周期配置 */
    modifyRecursiveComponentConfig: (defaultConfig: MiniLifecycle, options: any) => any;
    /** 解决百度小程序的模版语法问题 */
    getPathIndex: (indexOfNode: number) => string;
    /** 解决支付宝小程序分包时全局作用域不一致的问题 */
    getEventCenter: (EventsClass: typeof Events) => Events;
    isBubbleEvents: (eventName: string) => boolean;
    getSpecialNodes: () => string[];
    /** 解决 Vue2 布尔值属性值的设置问题 */
    onRemoveAttribute: (element: any, qualifiedName: string) => boolean;
    /** 用于把 React 同一事件回调中的所有 setState 合并到同一个更新处理中 */
    batchedEventUpdates: (cb: TFunc) => void;
    /** 用于处理 React 中的小程序生命周期 hooks */
    mergePageInstance: (prev: any, next: any) => void;
    /** 用于修改传递给小程序 Page 构造器的对象 */
    modifyPageObject: (config: Record<any, any>) => void;
    /** H5 下拉刷新 wrapper */
    createPullDownComponent: (el: any, path: string, framework: any, customWrapper?: any, stampId?: string) => void;
    /** H5 获取原生 DOM 对象 */
    getDOMNode: (instance: any) => any;
    /**
     * @todo: multi
     * 修改 Taro DOM 序列化数据
     **/
    modifyHydrateData: (data: Record<string, any>, node: any) => void;
    /**
     * 自定义处理 Taro DOM 序列化数据，如使其脱离 data 树
     */
    transferHydrateData: (data: Record<string, any>, element: any, componentsAlias: Record<string, any>) => void;
    /**
      * @todo: multi
      * 修改 Taro DOM 序列化数据
      **/
    modifySetAttrPayload: (element: any, key: string, payload: UpdatePayload, componentsAlias: Record<string, any>) => void;
    /**
      * @todo: multi
      * 修改 Taro DOM 序列化数据
      **/
    modifyRmAttrPayload: (element: any, key: string, payload: UpdatePayload, componentsAlias: Record<string, any>) => void;
    /**
      * @todo: multi
      * 调用 addEventListener 时触发
      **/
    onAddEvent: (type: string, handler: any, options: any, node: any) => void;
    /** 用于修改小程序原生事件对象 */
    modifyMpEvent: (event: MpEvent) => void;
    modifyMpEventImpl: (event: MpEvent) => void;
    /** 用于修改 Taro DOM 事件对象 */
    modifyTaroEvent: (event: any, element: any) => void;
    dispatchTaroEvent: (event: any, element: any) => void;
    dispatchTaroEventFinish: (event: any, element: any) => void;
    modifyTaroEventReturn: (node: any, event: any, returnVal: any) => any;
    modifyDispatchEvent: (event: any, element: any) => void;
    injectNewStyleProperties: (styleProperties: string[]) => void;
    initNativeApi: (taro: Record<string, any>) => void;
    patchElement: (node: any) => void;
    /** 解 Proxy */
    proxyToRaw: (proxyObj: any) => Record<any, any>;
    /** 元素增加事件监听钩子 */
    modifyAddEventListener: (element: any, sideEffect: boolean, getComponentsAlias: () => Record<string, any>) => void;
    /** 元素删除事件监听钩子 */
    modifyRemoveEventListener: (element: any, sideEffect: boolean, getComponentsAlias: () => Record<string, any>) => void;
};
declare const hooks: TaroHooks<ITaroHooks>;
export { IAdapter, Attributes, styles, events, BaseTemplate, RecursiveTemplate, UnRecursiveTemplate, capitalize, internalComponents, Shortcuts, toCamelCase, HOOK_TYPE, TaroHook, TaroHooks, hooks };
