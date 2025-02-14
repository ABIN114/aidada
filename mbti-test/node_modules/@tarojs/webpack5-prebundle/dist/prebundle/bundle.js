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
exports.getSwcPlugin = exports.bundle = void 0;
const helper_1 = require("@tarojs/helper");
const es_module_lexer_1 = require("es-module-lexer");
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const constant_1 = require("../utils/constant");
// esbuild generates nested directory output with lowest common ancestor base
// this is unpredictable and makes it difficult to analyze entry / output
// mapping. So what we do here is:
// 1. flatten all ids to eliminate slash
// 2. in the plugin, read the entry ourselves as virtual files to retain the
//    path.
function bundle({ appPath, deps, chain, prebundleOutputDir, customEsbuildConfig = {}, customSwcConfig = {}, mainFields = [...helper_1.defaultMainFields] }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield es_module_lexer_1.init;
        const flattenDeps = new Map();
        const flatIdExports = new Map();
        for (const [id, dep] of deps.entries()) {
            // flatten id
            const flatId = (0, utils_1.flattenId)(id);
            flattenDeps.set(flatId, dep);
            // Use es-module-lexer to check ES exports
            // But "export * from" syntax should be checked alone
            const fileContent = helper_1.fs.readFileSync(dep, 'utf-8');
            const exportsData = (0, es_module_lexer_1.parse)(fileContent);
            for (const { ss, se } of exportsData[0]) {
                const exp = fileContent.slice(ss, se);
                if (/export\s+\*\s+from/.test(exp)) {
                    exportsData.hasReExports = true;
                }
            }
            flatIdExports.set(flatId, exportsData);
        }
        helper_1.fs.existsSync(prebundleOutputDir)
            ? helper_1.fs.emptyDirSync(prebundleOutputDir)
            : helper_1.fs.ensureDirSync(prebundleOutputDir);
        return helper_1.esbuild.build(Object.assign(Object.assign({}, customEsbuildConfig), { absWorkingDir: appPath, bundle: true, write: false, entryPoints: Array.from(flattenDeps.keys()), mainFields, format: 'esm', loader: (0, lodash_1.defaults)(customEsbuildConfig.loader, helper_1.defaultEsbuildLoader), define: Object.assign(Object.assign({}, (0, utils_1.getDefines)(chain)), { 
                // AMD 被 esbuild 转 ESM 后，是套着 ESM 外皮的 AMD 语法模块。
                // Webpack HarmonyDetectionParserPlugin 会阻止 AMDDefineDependencyParserPlugin 对这些模块的处理。
                // 导致这些模块报错（如 lodash）。目前的办法是把 define 置为 false，不支持 AMD 导出。
                define: 'false' }), splitting: true, metafile: true, ignoreAnnotations: true, outdir: prebundleOutputDir, plugins: [
                getEntryPlugin({
                    flattenDeps,
                    flatIdExports,
                    prebundleOutputDir
                }),
                ...customEsbuildConfig.plugins || [],
                getSwcPlugin({ appPath, flatIdExports }, customSwcConfig)
            ] }));
    });
}
exports.bundle = bundle;
function getEntryPlugin({ flattenDeps, flatIdExports, prebundleOutputDir }) {
    const resolve = (0, utils_1.getResolve)();
    return {
        name: 'entry',
        setup(build) {
            // assets
            build.onResolve({ filter: constant_1.assetsRE }, ({ path: id, importer }) => __awaiter(this, void 0, void 0, function* () {
                const filePath = yield resolve(path_1.default.dirname(importer), id);
                const fileExt = path_1.default.extname(filePath);
                const fileBasename = path_1.default.basename(filePath, fileExt);
                const fileContent = yield helper_1.fs.readFile(filePath);
                const outputFile = path_1.default.join(prebundleOutputDir, `${fileBasename}-${(0, utils_1.getHash)(filePath)}${fileExt}`);
                yield helper_1.fs.writeFile(outputFile, fileContent);
                return (0, helper_1.externalEsbuildModule)({ path: `./${path_1.default.relative(prebundleOutputDir, outputFile)}` });
            }));
            build.onResolve({ filter: constant_1.moduleRE }, ({ path: id, importer }) => __awaiter(this, void 0, void 0, function* () {
                // entry
                if (!importer && flattenDeps.has(id)) {
                    return {
                        path: id,
                        namespace: 'entry'
                    };
                }
                try {
                    const resolvedPath = yield resolve(path_1.default.dirname(importer), id);
                    if (typeof resolvedPath === 'string' && !constant_1.assetsRE.test(resolvedPath)) {
                        return { path: resolvedPath };
                    }
                    else {
                        return (0, helper_1.externalEsbuildModule)({ path: id });
                    }
                }
                catch (e) {
                    return (0, helper_1.externalEsbuildModule)({ path: id });
                }
            }));
            build.onLoad({ filter: constant_1.moduleRE, namespace: 'entry' }, ({ path: id }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                let js = '';
                const filePath = (_a = flattenDeps.get(id)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '\\\\');
                const exportsData = flatIdExports.get(id);
                const [importsList, exportsList] = exportsData;
                const hasReExports = exportsData.hasReExports;
                if (!importsList.length && !exportsList.length) {
                    /** CommonJS */
                    exportsData.needInterop = true;
                    js = `module.exports = require("${filePath}")`;
                }
                else {
                    /** ESM */
                    if (exportsList.includes('default')) {
                        // export default
                        js += `import d from "${filePath}";export default d;`;
                    }
                    if (hasReExports ||
                        exportsList.length > 1 ||
                        exportsList[0] !== 'default') {
                        // export * from 'xx'
                        // export const xx
                        js += `export * from "${filePath}";`;
                    }
                }
                // console.log('\n[debug] found entry: ', id)
                // console.log('[debug]: filePath', filePath)
                // console.log('[debug] importsData: ', flatIdExports.get(id))
                // console.log('[debug] js: ', js)
                return {
                    loader: 'js',
                    resolveDir: process.cwd(),
                    contents: js
                };
            }));
        }
    };
}
function getSwcPlugin({ appPath, flatIdExports }, config) {
    return {
        name: 'swc-plugin',
        setup(build) {
            build.onEnd(({ outputFiles = [], metafile = {} }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                yield Promise.all(outputFiles.map(({ path, text }) => __awaiter(this, void 0, void 0, function* () {
                    if (!helper_1.REG_SCRIPTS.test(path))
                        return;
                    const { code } = helper_1.swc.transformSync(text, (0, lodash_1.defaults)(config, { jsc: { target: 'es2015' } }));
                    helper_1.fs.writeFile(path, code);
                })));
                // esbuild 把 Commonjs 转 ESM 时，打包后只有 export default 语句，
                // 无法实现原模块 module.exports = 的功能。
                // 因此使用一个 CommonJS 规范的中间模块进行处理。
                const processAll = [];
                const metaOutput = metafile.outputs;
                for (const outputName in metaOutput) {
                    const output = metaOutput[outputName];
                    if (!((_a = output.entryPoint) === null || _a === void 0 ? void 0 : _a.startsWith('entry:')))
                        continue;
                    const entry = output.entryPoint.replace(/^entry:/, '');
                    if (!flatIdExports.has(entry))
                        continue;
                    if (((_b = flatIdExports.get(entry)) === null || _b === void 0 ? void 0 : _b.needInterop) &&
                        output.exports.length === 1 &&
                        output.exports[0] === 'default') {
                        const srcPath = path_1.default.join(appPath, outputName);
                        const destPath = path_1.default.join(appPath, outputName.replace(/(\.js)$/, '.core$1'));
                        processAll.push(helper_1.fs.move(srcPath, destPath)
                            .then(() => helper_1.fs.writeFile(srcPath, `var m = require('./${path_1.default.basename(destPath)}');
                   module.exports = m.default;
                   exports.default = module.exports;
                  `)));
                    }
                }
                yield Promise.all(processAll);
            }));
        }
    };
}
exports.getSwcPlugin = getSwcPlugin;
//# sourceMappingURL=bundle.js.map