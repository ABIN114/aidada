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
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const shared_1 = require("@tarojs/shared");
const loader_utils_1 = require("loader-utils");
const MiniCompileModePlugin_1 = require("../plugins/MiniCompileModePlugin");
const COMPILE_MODE = 'compileMode';
function default_1(source) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const callback = this.async();
        const options = (0, loader_utils_1.getOptions)(this);
        const resourcePath = this.resourcePath;
        // @TODO 思考非 JSX 文件应该如何处理 p3
        if (!((/\.[tj]sx$/.test(resourcePath)) && source.includes(COMPILE_MODE))) {
            return callback(null, source);
        }
        const { platform, template, FILE_COUNTER_MAP } = options;
        template.componentsAlias = (0, shared_1.getComponentsAlias)(template.internalComponents);
        const components = template.createMiniComponents(template.internalComponents);
        if (!FILE_COUNTER_MAP.has(resourcePath)) {
            FILE_COUNTER_MAP.set(resourcePath, FILE_COUNTER_MAP.size + 1);
        }
        const fileCount = FILE_COUNTER_MAP.get(resourcePath);
        try {
            const identifier = `f${fileCount}`;
            const { code } = yield helper_1.swc
                .transform(source, {
                filename: resourcePath,
                sourceMaps: false,
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                        decorators: true
                    },
                    transform: {
                        legacyDecorator: true,
                        react: {
                            runtime: 'automatic'
                        }
                    },
                    experimental: {
                        plugins: [
                            [
                                '@tarojs/helper/swc/swc_plugin_compile_mode.wasm',
                                {
                                    platform,
                                    tmpl_prefix: identifier,
                                    components,
                                    adapter: template.Adapter,
                                }
                            ]
                        ]
                    }
                }
            });
            const templatesList = [];
            const RE_TEMPLATES = /var\s+TARO_TEMPLATES_(\w+)\s*=\s*'(.+)';/g;
            // 抓取模板内容
            let res;
            while ((res = RE_TEMPLATES.exec(code)) !== null) {
                const [, , raw] = res;
                // 小程序 xml 不支持 unescape，在此处对被 SWC 转义后的字符作还原
                const content = unescape(raw);
                templatesList.push(content);
            }
            // 输出模板内容到单独的文件或 base.xml
            const templatesString = templatesList.join('\n');
            if (template.isXMLSupportRecursiveReference) {
                (_a = this._module) === null || _a === void 0 ? void 0 : _a.addDependency(new MiniCompileModePlugin_1.XMLDependency({
                    identifier,
                    context: this.rootContext,
                    content: templatesString,
                    resourcePath,
                    fileCount,
                }));
            }
            else {
                MiniCompileModePlugin_1.templatesCache.push(templatesString);
            }
            // 引用 wxs 文件
            const importings = [];
            const RE_XML_SOURCES = /var\s+TARO_XML_SOURCES\s*=\s*(\[[\s\S]*?\])/;
            if ((res = RE_XML_SOURCES.exec(code)) !== null) {
                const listStr = res[1];
                const reg = /["'](.*?)["']/g;
                while ((res = reg.exec(listStr)) !== null) {
                    const [, dep] = res;
                    if ((0, loader_utils_1.isUrlRequest)(dep)) {
                        const request = (0, loader_utils_1.urlToRequest)(dep);
                        importings.push(this.importModule(request));
                    }
                }
            }
            yield Promise.all(importings);
            callback(null, code.replace(RE_TEMPLATES, ''));
        }
        catch (err) {
            callback(err);
        }
    });
}
exports.default = default_1;
function unescape(raw) {
    let temp = raw.replace(/\\([xu])([a-fA-F0-9]{2,4})/g, (_, $1, $2) => {
        const isUnicode = $1 === 'u';
        const num = isUnicode ? $2 : $2.substring(0, 2);
        const charCode = parseInt(num, 16);
        return String.fromCharCode(charCode) + (!isUnicode ? $2.substring(2) : '');
    });
    temp = temp.replace(/\\'/g, "'");
    return temp;
}
//# sourceMappingURL=miniCompilerLoader.js.map