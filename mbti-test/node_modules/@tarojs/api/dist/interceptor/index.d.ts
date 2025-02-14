import Chain from "./chain.js";
import { IRequestParams, TInterceptor } from "./chain.js";
declare class Link {
    taroInterceptor: TInterceptor;
    chain: Chain;
    constructor(interceptor: TInterceptor);
    request(requestParams: IRequestParams): Promise<void>;
    addInterceptor(interceptor: TInterceptor): void;
    cleanInterceptors(): void;
}
declare function interceptorify(promiseifyApi: any): Link;
export { Link as default, interceptorify };
