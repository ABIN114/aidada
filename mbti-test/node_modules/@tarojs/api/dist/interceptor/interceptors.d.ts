import Chain from "./chain.js";
declare function timeoutInterceptor(chain: Chain): Promise<void>;
declare function logInterceptor(chain: Chain): Promise<void>;
export { timeoutInterceptor, logInterceptor };
