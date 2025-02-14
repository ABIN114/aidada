import Taro from '@tarojs/taro';
declare function navigateTo(option: Taro.navigateTo.Option): ReturnType<typeof Taro.navigateTo>;
declare function redirectTo(option: Taro.redirectTo.Option): ReturnType<typeof Taro.redirectTo>;
declare function navigateBack(option?: Taro.navigateBack.Option): ReturnType<typeof Taro.navigateBack>;
declare function switchTab(option: Taro.switchTab.Option): ReturnType<typeof Taro.switchTab>;
declare function reLaunch(option: Taro.reLaunch.Option): ReturnType<typeof Taro.reLaunch>;
declare function getCurrentPages(): Taro.Page[];
export { navigateTo, redirectTo, navigateBack, switchTab, reLaunch, getCurrentPages };
