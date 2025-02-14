import { internalComponents } from "./components.js";
import { PLATFORM_TYPE } from "./constants.js";
declare const EMPTY_OBJ: any;
declare const EMPTY_ARR: never[];
declare const noop: (..._: unknown[]) => void;
/**
 * Boxed value.
 *
 * @typeparam T Value type.
 */
interface Box<T> {
    v: T;
}
/**
 * box creates a boxed value.
 *
 * @typeparam T Value type.
 * @param v Value.
 * @returns Boxed value.
 */
declare const box: <T>(v: T) => {
    v: T;
};
/**
 * box creates a boxed value.
 *
 * @typeparam T Value type.
 * @param b Boxed value.
 * @returns Value.
 */
declare const unbox: <T>(b: Box<T>) => T;
declare function toDashed(s: string): string;
declare function toCamelCase(s: string): string;
declare const toKebabCase: (string: any) => any;
declare function capitalize(s: string): string;
declare const hasOwn: (val: Record<any, any>, key: string | symbol) => any;
/**
 * ensure takes a condition and throw a error if the condition fails,
 * like failure::ensure: https://docs.rs/failure/0.1.1/failure/macro.ensure.html
 * @param condition condition.
 * @param msg error message.
 */
declare function ensure(condition: boolean, msg: string): asserts condition;
declare function warn(condition: boolean, msg: string): void;
declare function queryToJson(str: any): {};
declare function getUniqueKey(): string;
declare function cacheDataSet(key: any, val: any): void;
declare function cacheDataGet(key: any, delelteAfterGet?: any): any;
declare function cacheDataHas(key: any): boolean;
declare function mergeInternalComponents(components: any): Record<string, Record<string, string>>;
declare function getComponentsAlias(origin: typeof internalComponents): {};
declare function getPlatformType(platform?: string, configNameOrType?: string): PLATFORM_TYPE;
declare function mergeReconciler(hostConfig: any, hooksForTest?: any): void;
declare function nonsupport(api: any): () => void;
declare function setUniqueKeyToRoute(key: string, obj: any): void;
declare function indent(str: string, size: number): string;
export { EMPTY_OBJ, EMPTY_ARR, noop, Box, box, unbox, toDashed, toCamelCase, toKebabCase, capitalize, hasOwn, ensure, warn, queryToJson, getUniqueKey, cacheDataSet, cacheDataGet, cacheDataHas, mergeInternalComponents, getComponentsAlias, getPlatformType, mergeReconciler, nonsupport, setUniqueKeyToRoute, indent };
