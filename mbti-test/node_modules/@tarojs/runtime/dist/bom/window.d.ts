import { Events } from "../emitter/emitter.js";
import { TaroHistory } from "./history.js";
import { TaroLocation } from "./location.js";
declare class TaroWindow extends Events {
    navigator: Navigator;
    requestAnimationFrame: typeof requestAnimationFrame | ((callback: any) => NodeJS.Timeout);
    cancelAnimationFrame: typeof cancelAnimationFrame;
    getComputedStyle: import("./getComputedStyle.js").TGetComputedStyle;
    Date: DateConstructor;
    location: TaroLocation;
    history: TaroHistory;
    XMLHttpRequest?: Partial<XMLHttpRequest>;
    constructor();
    initEvent(): void;
    get document(): import("../dom/document.js").TaroDocument;
    addEventListener(event: string, callback: (arg: any) => void): void;
    removeEventListener(event: string, callback: (arg: any) => void): void;
    setTimeout(...args: Parameters<typeof setTimeout>): NodeJS.Timeout;
    clearTimeout(...args: Parameters<typeof clearTimeout>): void;
}
declare const window: TaroWindow;
declare const location: TaroLocation;
declare const history: TaroHistory;
export type { TaroWindow };
export { window, location, history };
