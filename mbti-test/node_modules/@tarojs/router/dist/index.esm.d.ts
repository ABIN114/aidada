import { Action, createBrowserHistory, createHashHistory, Blocker, BrowserHistoryOptions, HashHistoryOptions, History, Listener, Location, Path, To } from "history";
import { IH5RouterConfig } from "@tarojs/taro/types/compile";
import { StateEvent } from "../types/history";
import { MpaRouterConfig, SpaRouterConfig } from '../types/router';
import Taro from "@tarojs/taro";
import { AppInstance } from "@tarojs/runtime";
import { MpaRouterConfig as MpaRouterConfig$0 } from "../../types/router";
import { SpaRouterConfig as SpaRouterConfig$0 } from "../../types/router";
declare let history: History;
declare class MpaHistory implements History {
    action: Action;
    get location(): Location;
    createHref(_to: To): string;
    parseUrl(to: Partial<Path>): string;
    push(to: Partial<Path>, _state?: Record<string, unknown>): void;
    replace(to: Partial<Path>, _state?: Record<string, unknown>): void;
    go(delta: number): void;
    back: () => void;
    forward: () => void;
    listen(listener: Listener): () => void;
    block(_blocker: Blocker): () => void;
    pushState: globalThis.History["pushState"];
    replaceState: globalThis.History["replaceState"];
    eventState(action: Required<StateEvent>["action"]): (data: any, unused: string, url?: string | URL | null) => any;
}
declare function setHistory(h: History, base?: string): void;
declare function createMpaHistory(_?: HashHistoryOptions | BrowserHistoryOptions): MpaHistory;
declare function setHistoryMode(mode?: IH5RouterConfig["mode"], base?: string): void;
declare function prependBasename(url?: string): string;
declare function navigateTo(option: Taro.navigateTo.Option): ReturnType<typeof Taro.navigateTo>;
declare function redirectTo(option: Taro.redirectTo.Option): ReturnType<typeof Taro.redirectTo>;
declare function navigateBack(option?: Taro.navigateBack.Option): ReturnType<typeof Taro.navigateBack>;
declare function switchTab(option: Taro.switchTab.Option): ReturnType<typeof Taro.switchTab>;
declare function reLaunch(option: Taro.reLaunch.Option): ReturnType<typeof Taro.reLaunch>;
declare function getCurrentPages(): Taro.Page[];
// TODO 支持多路由 (APP 生命周期仅触发一次)
/** Note: 关于多页面应用
 * - 需要配置路由映射（根目录跳转、404 页面……）
 * - app.onPageNotFound 事件不支持
 * - 应用生命周期可能多次触发
 * - TabBar 会多次加载
 * - 不支持路由动画
 */
declare function createMultiRouter(history: History, app: AppInstance, config: MpaRouterConfig$0, framework?: string): Promise<void>;
declare function createRouter(history: History, app: AppInstance, config: SpaRouterConfig$0, framework?: string): () => void;
declare class RoutesAlias {
    conf: Array<string[]>;
    set(customRoutes?: Record<string, string | string[]>): void;
    getConfig: (url?: string) => string[];
    getOrigin: (url?: string) => string;
    getAlias: (url?: string) => string;
    getAll: (url?: string) => string[];
}
declare const routesAlias: RoutesAlias;
declare const isWeixin: () => boolean;
declare const isDingTalk: () => boolean;
declare function setMpaTitle(title: string): void;
declare function setTitle(title: string): void;
declare function setNavigationBarStyle(option: {
    backgroundColor: string;
    frontColor: string;
}): void;
declare function setNavigationBarLoading(loading: boolean): void;
declare function handleAppMount(config: SpaRouterConfig | MpaRouterConfig, _: History, appId?: string): void;
declare function handleAppMountWithTabbar(config: SpaRouterConfig | MpaRouterConfig, history: History, appId?: string): void;
export { navigateTo, redirectTo, navigateBack, switchTab, reLaunch, getCurrentPages, history, setHistory, createMpaHistory, createBrowserHistory, createHashHistory, setHistoryMode, prependBasename, createMultiRouter, createRouter, routesAlias, isWeixin, isDingTalk, setMpaTitle, setTitle, setNavigationBarStyle, setNavigationBarLoading, handleAppMount, handleAppMountWithTabbar };
