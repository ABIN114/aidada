declare function initNativeApi(taro: any): void;
declare const needPromiseApis: Set<string>;
declare const components: {
    Icon: {
        size: string;
    };
    Input: {
        "adjust-position": string;
        "hold-keyboard": string;
        "clue-type": string;
        bindKeyboardHeightChange: string;
    };
    Button: {
        bindGetPhoneNumber: string;
        "data-channel": string;
        "data-aweme-id": string;
        "group-id": string;
        "data-is-half-page": string;
        bindOpenAwemeUserProfile: string;
        bindJoinGroup: string;
    };
    Form: {
        "report-submit-timeout": string;
    };
    Slider: {
        color: string;
        "selected-color": string;
    };
    WebView: {
        "progressbar-color": string;
    };
    Video: {
        "play-btn-position": string;
        "pre-roll-unit-id": string;
        "post-roll-unit-id": string;
        "vslide-gesture": string;
        "vslide-gesture-in-fullscreen": string;
        "enable-play-gesture": string;
        "show-playback-rate-btn": string;
        "enable-play-in-background": string;
        signature: string;
        bindProgress: string;
        bindSeekComplete: string;
        bindAdLoad: string;
        bindAdStart: string;
        bindAdEnded: string;
        bindAdError: string;
        bindAdClose: string;
        bindLoadedMetadata: string;
        bindPlaybackRateChange: string;
        bindMuteChange: string;
        bindControlTap: string;
        bindEnterBackground: string;
        bindCloseBackground: string;
        bindLeaveBackground: string;
    };
    Ad: {
        fixed: string;
        type: string;
        scale: string;
    };
    Textarea: {
        "disable-default-padding": string;
        "confirm-type": string;
        "confirm-hold": string;
        "show-confirm-bar": string;
        "adjust-position": string;
        "hold-keyboard": string;
    };
    ScrollView: {
        enhanced: string;
        bounces: string;
        "refresher-enabled": string;
        "refresher-threshold": string;
        "refresher-default-style": string;
        "refresher-background": string;
        "refresher-triggered": string;
        bindRefresherPulling: string;
        bindRefresherRefresh: string;
        bindRefresherRestore: string;
        bindRefresherAbort: string;
    };
    Canvas: {
        type: string;
    };
    Map: {
        polygons: string;
        rotate: string;
        skew: string;
        "max-scale": string;
        "min-scale": string;
        "enable-3D": string;
        "show-compass": string;
        "show-scale": string;
        "enable-overlooking": string;
        "enable-zoom": string;
        "enable-scroll": string;
        "enable-rotate": string;
        "enable-satellite": string;
        "enable-traffic": string;
        "enable-poi": string;
        "enable-building": string;
        bindLabelTap: string;
        bindRegionChange: string;
        bindAnchorPointTap: string;
    };
    RtcRoom: {
        "user-id": string;
        mode: string;
        "device-position": string;
        bindError: string;
    };
    PayButton: {
        mode: string;
        "goods-id": string;
        "goods-type": string;
        "order-status": string;
        "order-id": string;
        "refund-id": string;
        "refund-total-amount": string;
        "biz-line": string;
        "marketing-ready": string;
        bindGetGoodsInfo: string;
        bindPlaceOrder: string;
        bindError: string;
        bindApplyRefund: string;
        bindRefund: string;
        bindPay: string;
    };
    ConsumeCard: {
        "order-id": string;
        bindConsume: string;
        bindRefund: string;
        bindApplyRefund: string;
        bindError: string;
    };
    AwemeData: {
        "aweme-id": string;
        type: string;
        "disable-default": string;
        "default-avatar": string;
        "default-text": string;
        bindError: string;
    };
    RateButton: {
        "order-id": string;
        bindInit: string;
        bindSuccess: string;
        bindError: string;
    };
    OpenData: {
        type: string;
        "default-text": string;
        "default-avatar": string;
        "use-empty-value": string;
        bindError: string;
    };
    AwemeUserCard: {
        "aweme-id": string;
        width: string;
        height: string;
        fixed: string;
        "left-right-padding": string;
        bindError: string;
    };
};
declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
    modifyMpEventImpl(event: any): void;
    modifyTaroEventReturn(node: any, event: any, returnVal: any): any;
};
export { initNativeApi, needPromiseApis, components, hostConfig };
