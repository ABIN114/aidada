import type { PluginItem } from '@babel/core';
/**
 * Inject `defineAppConfig` and `definePageConfig`
 * require header at the top of a config file,
 * without the need to specifically require them
 * if they are used
*/
export declare function injectDefineConfigHeader(babel: any): PluginItem;
export default function createBabelRegister({ only }: {
    only: any;
}): void;
