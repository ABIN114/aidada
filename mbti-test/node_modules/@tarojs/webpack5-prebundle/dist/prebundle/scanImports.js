"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanImports = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const constant_1 = require("../utils/constant");
function scanImports({ appPath, chain, entries, include = [], exclude = [], customEsbuildConfig = {}, mainFields = [...helper_1.defaultMainFields] }, deps = new Map()) {
    return __awaiter(this, void 0, void 0, function* () {
        const scanImportsPlugin = getScanImportsPlugin(deps, include, exclude);
        const customPlugins = customEsbuildConfig.plugins || [];
        yield Promise.all(entries.map((entry) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield helper_1.esbuild.build(Object.assign(Object.assign({}, customEsbuildConfig), { absWorkingDir: appPath, bundle: true, entryPoints: [entry], mainFields, format: 'esm', loader: helper_1.defaultEsbuildLoader, write: false, define: Object.assign(Object.assign({}, (0, utils_1.getDefines)(chain)), { define: 'false' }), plugins: [
                        scanImportsPlugin,
                        ...customPlugins
                    ] }));
            }
            catch (e) { } // eslint-disable-line no-empty
        })));
        // 有一些 Webpack loaders 添加的依赖没有办法提前分析出来
        // 可以把它们写进 includes，然后在这里 resolve 后加入到 deps
        const resolve = (0, utils_1.getResolve)();
        yield Promise.all(include.map((item) => __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.isExclude)(item, exclude))
                return;
            const resolvePath = yield resolve(appPath, item);
            deps.set(item, resolvePath);
        })));
        return deps;
    });
}
exports.scanImports = scanImports;
/**
 * 收集 node_modules 依赖
 * Circumstances:
 *   1. import 'xxx.scss', import '../xxx.png' => external
 *   2. import 'xxx.vue', import '../xxx.vue'
 *       => collect script: { key: { loader, contents } }
 *       => virtual-mode compose of "export * from 'key';""
 *       => load virtual-mode and return { loader, contents }
 *   3. import 'xxx', import 'xxx/yyy.ext', import '@xxx/alias'
 *       => resolve
 *       => path.includes(node_modules) && .js|.jsx|.ts|.tsx => collect + external
 *       => .vue => (2)
 *       => asserts => (1)
 *       => src => return
 *   4. import '../xxx', import '../xxx.ext'
 *       => resolve
 *       => .vue => (2)
 *       => src => return
 */
function getScanImportsPlugin(deps, includes, excludes) {
    const resolve = (0, utils_1.getResolve)();
    // for storing vue <script> contents
    const scripts = new Map();
    return {
        name: 'scanImports',
        setup(build) {
            // assets
            build.onResolve(({ filter: constant_1.assetsRE }), helper_1.externalEsbuildModule);
            // .vue
            build.onLoad({ filter: /\.vue$/, namespace: 'vue' }, ({ path }) => {
                let raw = helper_1.fs.readFileSync(path, 'utf-8');
                raw = raw.replace(constant_1.commentRE, '<!---->');
                const regex = constant_1.scriptRE;
                regex.lastIndex = 0;
                let js = '';
                let scriptId = 0;
                let match;
                while ((match = regex.exec(raw))) {
                    const [, openTag, content] = match;
                    const langMatch = openTag.match(constant_1.langRE);
                    const lang = langMatch && (langMatch[1] || langMatch[2] || langMatch[3]);
                    let loader = 'js';
                    if (lang === 'ts' || lang === 'tsx' || lang === 'jsx') {
                        loader = lang;
                    }
                    if (content.trim()) {
                        // append imports in TS to prevent esbuild from removing them
                        // since they may be used in the template
                        const contents = content +
                            (loader.startsWith('ts') ? extractImportPaths(content) : '');
                        const key = `${path}?id=${scriptId++}`;
                        scripts.set(key, {
                            loader,
                            contents
                        });
                        const virtualModulePath = JSON.stringify(constant_1.virtualModulePrefix + key);
                        js += `export * from ${virtualModulePath}\n`;
                    }
                }
                // "export * from" syntax will not re'export "default", so we patch one.
                if (!js.includes('export default')) {
                    js += 'export default {}';
                }
                return {
                    loader: 'js',
                    contents: js
                };
            });
            build.onResolve(({ filter: constant_1.virtualModuleRE }), ({ path }) => {
                return {
                    path: path.replace(constant_1.virtualModulePrefix, ''),
                    namespace: 'script'
                };
            });
            build.onLoad(({ filter: /.*/, namespace: 'script' }), ({ path }) => {
                return scripts.get(path);
            });
            // bare imports
            build.onResolve({ filter: constant_1.moduleRE }, ({ path: id, importer }) => __awaiter(this, void 0, void 0, function* () {
                if ((0, utils_1.isExclude)(id, excludes))
                    return (0, helper_1.externalEsbuildModule)({ path: id });
                if (deps.has(id))
                    return (0, helper_1.externalEsbuildModule)({ path: id });
                try {
                    const resolvedPath = yield resolve(path_1.default.dirname(importer), id);
                    if (resolvedPath.includes('node_modules') || includes.includes(id)) {
                        if ((0, utils_1.isOptimizeIncluded)(resolvedPath)) {
                            deps.set(id, resolvedPath);
                        }
                        return (0, helper_1.externalEsbuildModule)({ path: id });
                    }
                    else if ((0, utils_1.isScanIncluded)(resolvedPath)) {
                        return {
                            path: resolvedPath,
                            namespace: 'vue'
                        };
                    }
                    else if (constant_1.assetsRE.test(resolvedPath)) {
                        (0, helper_1.externalEsbuildModule)({ path: id });
                    }
                    else {
                        return {
                            path: resolvedPath
                        };
                    }
                }
                catch (e) {
                    return (0, helper_1.externalEsbuildModule)({ path: id });
                }
            }));
            // catch all
            build.onResolve({ filter: /.*/ }, ({ path: id, importer }) => __awaiter(this, void 0, void 0, function* () {
                const resolvedPath = yield resolve(path_1.default.dirname(importer), id);
                const namespace = (0, utils_1.isScanIncluded)(resolvedPath) ? 'vue' : undefined;
                return {
                    path: resolvedPath,
                    namespace
                };
            }));
        }
    };
}
/**
 * when using TS + (Vue + `<script setup>`) or Svelte, imports may seem
 * unused to esbuild and dropped in the build output, which prevents
 * esbuild from crawling further.
 * the solution is to add `import 'x'` for every source to force
 * esbuild to keep crawling due to potential side effects.
 */
function extractImportPaths(code) {
    // empty singleline & multiline comments to avoid matching comments
    code = code
        .replace(constant_1.multilineCommentsRE, '/* */')
        .replace(constant_1.singlelineCommentsRE, '');
    let js = '';
    let m;
    while ((m = constant_1.importsRE.exec(code)) != null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === constant_1.importsRE.lastIndex) {
            constant_1.importsRE.lastIndex++;
        }
        js += `\nimport ${m[1]}`;
    }
    return js;
}
//# sourceMappingURL=scanImports.js.map