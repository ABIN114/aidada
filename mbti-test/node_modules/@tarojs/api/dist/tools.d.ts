declare function Behavior(options: any): any;
declare function getPreload(current: any): (key: string | Record<string, unknown>, val: unknown) => void;
declare function getInitPxTransform(taro: any): (config: any) => void;
declare function getPxTransform(taro: any): (size: any) => any;
export { Behavior, getPreload, getInitPxTransform, getPxTransform };
