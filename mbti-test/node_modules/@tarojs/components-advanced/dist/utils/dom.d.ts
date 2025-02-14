declare function getRectSize(id: string, success?: TFunc, fail?: TFunc, retryMs?: number): void;
declare function getRectSizeSync(id: string, retryMs?: number, retryTimes?: number): Promise<{
    width?: number;
    height?: number;
}>;
declare function getScrollViewContextNode(id: string): Promise<unknown>;
export { getRectSize, getRectSizeSync, getScrollViewContextNode };
