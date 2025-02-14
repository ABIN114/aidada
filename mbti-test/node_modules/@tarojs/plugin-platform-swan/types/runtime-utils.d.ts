declare function initNativeApi(taro: any): void;
declare const needPromiseApis: Set<string>;
declare const components: {
    Progress: {
        "border-radius": string;
        "font-size": string;
        duration: string;
    };
    RichText: {
        selectable: string;
        name: string;
        attrs: string;
        children: string;
        text: string;
        "image-menu-prevent": string;
        preview: string;
    };
    Map: {
        polygons: string;
        "enable-3D": string;
        "show-compass": string;
        "enable-overlooking": string;
        "enable-zoom": string;
        "enable-scroll": string;
        "enable-rotate": string;
        bindRegionChange: string;
        bindPoiTap: string;
    };
    Button: {
        "template-id": string;
        "subscribe-id": string;
        bindSubscribe: string;
        bindGetPhoneNumber: string;
        bindGetUserInfo: string;
        bindOpenSetting: string;
        bindContact: string;
        bindChooseAddress: string;
        bindChooseInvoiceTitle: string;
        bindLogin: string;
    };
    Form: {
        "report-type": string;
        "template-id": string;
        "subscribe-id": string;
        "skip-subscribe-authorize": string;
    };
    Input: {
        "adjust-position": string;
    };
    Textarea: {
        "confirm-type": string;
        "confirm-hold": string;
        "show-confirm-bar": string;
        "adjust-position": string;
    };
    Navigator: {
        target: string;
        "app-id": string;
        path: string;
        "extra-data": string;
        version: string;
    };
    Image: {
        webp: string;
        "image-menu-prevent": string;
        preview: string;
        "original-src": string;
    };
    Video: {
        title: string;
        "show-no-wifi-tip": string;
        "vslide-gesture": string;
        "vslide-gesture-in-fullscreen": string;
        "enable-play-gesture": string;
        "show-rate-btn": string;
        "show-vslide-btn-in-fullscreen": string;
        "silent-play": string;
        bindLoadedMetadata: string;
    };
    Ad: {
        appid: string;
        apid: string;
        type: string;
        updatetime: string;
        bindStatus: string;
    };
    Tabs: {
        "tabs-background-color": string;
        "tabs-active-text-color": string;
        "tabs-inactive-text-color": string;
        "tabs-underline-color": string;
        "active-name": string;
        "url-query-name": string;
        "max-tab-item-amount": string;
        bindTabChange: string;
    };
    TabItem: {
        label: string;
        name: string;
        "badge-type": string;
        "badge-text": string;
    };
    AnimationVideo: {
        "resource-width": string;
        "resource-height": string;
        "canvas-style": string;
        path: string;
        loop: string;
        autoplay: string;
        "alpha-direction": string;
        bindStarted: string;
        bindEnded: string;
    };
    AnimationView: {
        path: string;
        loop: string;
        autoplay: string;
        action: string;
        hidden: string;
        bindEnded: string;
    };
    ArCamera: {
        key: string;
        type: string;
        flash: string;
        bindError: string;
        bindLoad: string;
        bindMessage: string;
        bindScanCode: string;
    };
    RtcRoom: {
        id: string;
        "enable-camera": string;
        "enable-auto-focus": string;
        "enable-zoom": string;
        "device-position": string;
        "enable-mic": string;
        "enable-agc": string;
        "enable-ans": string;
        bitrate: string;
        "video-width": string;
        "video-height": string;
        "enable-remote-mirror": string;
        "local-mirror": string;
        "sound-mode": string;
        bindStateChange: string;
        bindError: string;
    };
    RtcRoomItem: {
        id: string;
        type: string;
        "user-id": string;
    };
    OpenData: {
        type: string;
    };
    Login: {
        "button-class": string;
        "checked-color": string;
        "theme-color": string;
        bindGetPhoneNumber: string;
        bindLoadError: string;
    };
    Like: {
        "is-liked": string;
        mode: string;
        "icon-type": string;
        "like-text": string;
        "like-num": string;
        "like-type": string;
        "animation-type": string;
        "is-show-toast": string;
        "toast-text": string;
        "like-param": string;
        bindError: string;
        bindSuccess: string;
        bindFail: string;
    };
    CommentList: {
        "comment-param": string;
        "toolbar-config": string;
        "is-page-scroll": string;
        "need-toolbar": string;
        "add-comment": string;
        "detail-path": string;
        "is-folded": string;
        "fold-num": string;
        "view-more-path": string;
        "view-more-style": string;
        bindClickComment: string;
        bindViewMore: string;
    };
    CommentDetail: {
        "comment-param": string;
        srid: string;
        "is-page-scroll": string;
        "need-toolbar": string;
        "need-like-btn": string;
        "back-list-after-delete": string;
        "add-comment": string;
        bindDelete: string;
    };
    FollowSwan: {
        size: string;
        type: string;
        bindFavorStatusChange: string;
    };
    InlinePaymentPanel: {
        "total-amount": string;
        "deal-id": string;
        "app-key": string;
        "promotion-tag": string;
        "enable-page-back-modal": string;
        "custom-style": string;
        "style-type": string;
        bindGetPaymentInfo: string;
        bindError: string;
    };
};
declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
    getPathIndex(indexOfNode: any): string;
    getSpecialNodes(): string[];
    modifyTaroEvent(event: any, node: any): void;
    getMiniLifecycle(config: any): any;
};
export { initNativeApi, needPromiseApis, components, hostConfig };
