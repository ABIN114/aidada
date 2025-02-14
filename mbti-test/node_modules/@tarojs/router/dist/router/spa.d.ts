import { AppInstance } from '@tarojs/runtime';
import { History } from "../history.js";
import { SpaRouterConfig } from '../../types/router';
declare function createRouter(history: History, app: AppInstance, config: SpaRouterConfig, framework?: string): () => void;
export { createRouter };
