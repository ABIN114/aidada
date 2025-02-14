import { needPromiseApis, components as components$1 } from '@tarojs/plugin-platform-weapp/dist/runtime-utils';
import { processApis, mergeReconciler, mergeInternalComponents } from '@tarojs/shared';

const asyncApis = new Set([
    'getQQRunData',
    'requestWxPayment',
    'setAvatar',
    'shareInvite',
    'updateBookshelfReadTime'
]);
function initNativeApi(taro) {
    processApis(taro, qq, {
        needPromiseApis: new Set([...needPromiseApis, ...asyncApis])
    });
    taro.cloud = qq.cloud;
}

const components = {
    // ======== 调整属性 ========
    Button: {
        'app-packagename': '',
        'app-bundleid': '',
        'app-connect-id': '',
        'group-id': '',
        'public-id': '',
        'guild-id': '',
        'share-type': '27',
        'share-mode': '[\'qq\', \'qzone\']',
        'aria-label': '',
        'open-id': '',
        'share-message-friend-info': '',
        bindAddFriend: '',
        bindAddGroupApp: ''
    },
    Ad: {
        type: 'banner',
        'ad-left': '',
        'ad-top': '',
        'ad-width': '',
        'ad-height': '',
        'block-size': '1',
        'block-orientation': 'landscape',
        'test-banner-type': 'three',
        bindsize: '',
    }
};

const hostConfig = {
    initNativeApi
};
mergeReconciler(hostConfig);
mergeInternalComponents(components$1);
mergeInternalComponents(components);

export { hostConfig };
//# sourceMappingURL=runtime.js.map
