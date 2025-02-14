import Config from './Config';
import Kernel from './Kernel';
import { TaroPlatformBase, TaroPlatformWeb } from './platform-plugin-base';
export * from './utils/types';
export { Config, Kernel, TaroPlatformBase, TaroPlatformWeb };
declare const _default: {
    Config: typeof Config;
    Kernel: typeof Kernel;
    TaroPlatformBase: typeof TaroPlatformBase;
    TaroPlatformWeb: typeof TaroPlatformWeb;
};
export default _default;
export type { IPluginContext } from './utils/types';
