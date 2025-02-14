/**
 * Modify from https://github.com/diondree/stencil-vue2-output-target/blob/master/vue-component-lib/utils.ts
 * MIT License https://github.com/diondree/stencil-vue2-output-target/blob/master/LICENSE.md
 */
import { CreateElement, VNode } from 'vue';
declare const createCommonMethod: (methodName: string) => unknown;
declare const toLowerCase: (str: string) => string;
declare const toDashCase: (str: string) => string;
declare const createCommonRender: (tagName: string, eventNames: string[], defineCustomElement: any) => (createElement: CreateElement) => VNode;
export { createCommonMethod, toLowerCase, toDashCase, createCommonRender };
