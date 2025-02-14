declare function initNativeApi(taro: any): void;
declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
};
export { hostConfig };
