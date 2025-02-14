"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaroComponentsExportsPlugin_componentsExports;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRenderNode = void 0;
const helper_1 = require("@tarojs/helper");
const shared_1 = require("@tarojs/shared");
const component_1 = require("../utils/component");
const walk = require('acorn-walk');
const NullDependency = require('webpack/lib/dependencies/NullDependency');
const PLUGIN_NAME = 'TaroComponentsExportsPlugin';
function isRenderNode(node, ancestors = []) {
    let renderFn;
    const hasRenderMethod = ancestors.some((ancestor) => {
        var _a, _b;
        if (ancestor.type === 'FunctionExpression' && ((_a = ancestor === null || ancestor === void 0 ? void 0 : ancestor.id) === null || _a === void 0 ? void 0 : _a.name) === 'render') {
            renderFn = (_b = ancestor.params[0]) === null || _b === void 0 ? void 0 : _b.name;
            return true;
        }
        else {
            return false;
        }
    });
    // @ts-ignore
    return hasRenderMethod && node.callee.name === renderFn;
}
exports.isRenderNode = isRenderNode;
// TODO 合并 TaroNormalModulesPlugin 逻辑
class TaroComponentsExportsPlugin {
    constructor(options) {
        this.options = options;
        _TaroComponentsExportsPlugin_componentsExports.set(this, void 0);
        __classPrivateFieldSet(this, _TaroComponentsExportsPlugin_componentsExports, new Set(), "f");
        this.onParseCreateElement = options === null || options === void 0 ? void 0 : options.onParseCreateElement;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            // react 的第三方组件支持
            normalModuleFactory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, (parser) => {
                parser.hooks.program.tap(PLUGIN_NAME, (program) => {
                    walk.simple(program, {
                        CallExpression: (node, ancestors) => {
                            var _a;
                            // @ts-ignore
                            const callee = node.callee;
                            if (callee.type === 'MemberExpression') {
                                if (callee.property.name !== 'createElement') {
                                    return;
                                }
                            }
                            else {
                                const nameOfCallee = callee.name;
                                if (
                                // 兼容 react17 new jsx transtrom 以及esbuild-loader的ast兼容问题
                                !/^_?jsxs?$/.test(nameOfCallee) &&
                                    // 兼容 Vue 3.0 渲染函数及 JSX
                                    !(nameOfCallee && nameOfCallee.includes('createVNode')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createBlock')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createElementVNode')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createElementBlock')) &&
                                    !(nameOfCallee && nameOfCallee.includes('resolveComponent')) && // 收集使用解析函数的组件名称
                                    // 兼容 Vue 2.0 渲染函数及 JSX
                                    !isRenderNode(node, ancestors)) {
                                    return;
                                }
                            }
                            // @ts-ignore
                            const type = node.arguments[0];
                            if (type === null || type === void 0 ? void 0 : type.value) {
                                (_a = this.onParseCreateElement) === null || _a === void 0 ? void 0 : _a.call(this, type.value, component_1.componentConfig);
                                __classPrivateFieldGet(this, _TaroComponentsExportsPlugin_componentsExports, "f").add(type.value);
                            }
                        }
                    }, Object.assign(Object.assign({}, walk.base), { Import: walk.base.Import || (() => { }) }));
                });
            });
            compilation.hooks.finishModules.tap(PLUGIN_NAME, (modules) => {
                const module = Array.from(modules).find((e) => e.rawRequest === helper_1.taroJsComponents);
                if (!module)
                    return;
                // Note: 仅在生产环境使用
                if (compiler.options.mode === 'production' && !component_1.componentConfig.includeAll) {
                    if (__classPrivateFieldGet(this, _TaroComponentsExportsPlugin_componentsExports, "f").size > 0) {
                        compilation.dependencyTemplates.set(NullDependency, new NullDependency.Template());
                        module.dependencies = module.dependencies.map((dependency) => {
                            if (!(dependency === null || dependency === void 0 ? void 0 : dependency.name))
                                return dependency;
                            const name = (0, shared_1.toDashed)(dependency.name);
                            const taroName = `taro-${name}`;
                            // Note: Vue2 目前无法解析，需要考虑借助 componentConfig.includes 优化
                            const isIncluded = component_1.componentConfig.includes.has(name) || __classPrivateFieldGet(this, _TaroComponentsExportsPlugin_componentsExports, "f").has(taroName);
                            if (!isIncluded || component_1.componentConfig.exclude.has(name)) {
                                /** Note: 使用 Null 依赖替换不需要的依赖
                                 * - 果使用 `compilation.moduleGraph.removeConnection` 移除会导致引用问题；
                                 * - 使用 compilation.moduleGraph.getConnection(dependency)?.setActive 会残留依赖名称，轻微影包胞体大小
                                 */
                                return new NullDependency();
                            }
                            return dependency;
                        });
                    }
                }
            });
            normalModuleFactory.hooks.afterResolve.tap(PLUGIN_NAME, (resolveData) => {
                if (resolveData.request === helper_1.taroJsComponents) {
                    resolveData.dependencies.forEach((dependency) => {
                        var _a;
                        if (dependency.usedByExports && ((_a = dependency.ids) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            dependency.ids.forEach(item => {
                                component_1.componentConfig.includes.add((0, shared_1.toDashed)(item));
                                __classPrivateFieldGet(this, _TaroComponentsExportsPlugin_componentsExports, "f").add(`taro-${(0, shared_1.toDashed)(item)}`);
                            });
                        }
                        else if (dependency.type === 'harmony import specifier') {
                            component_1.componentConfig.includeAll = true;
                        }
                    });
                }
            });
        });
    }
}
exports.default = TaroComponentsExportsPlugin;
_TaroComponentsExportsPlugin_componentsExports = new WeakMap();
//# sourceMappingURL=TaroComponentsExportsPlugin.js.map