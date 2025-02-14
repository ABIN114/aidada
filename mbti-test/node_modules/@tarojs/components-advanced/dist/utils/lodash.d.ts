declare function omit<T extends Record<string, unknown> = Record<string, any>, P extends string = ''>(obj?: T, fields?: P[]): Omit<T, P>;
declare function throttle(fn: any, threshold?: number, scope?: any): (...args: any[]) => void;
declare function debounce(fn: any, ms?: number, scope?: any): (...args: any[]) => void;
export { omit, throttle, debounce };
