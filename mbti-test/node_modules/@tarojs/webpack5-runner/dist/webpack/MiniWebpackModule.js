"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniWebpackModule = void 0;
const helper_1 = require("@tarojs/helper");
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const MiniCompileModePlugin_1 = require("../plugins/MiniCompileModePlugin");
const postcss_mini_1 = require("../postcss/postcss.mini");
const WebpackModule_1 = require("./WebpackModule");
class MiniWebpackModule {
    constructor(combination) {
        this.combination = combination;
    }
    getModules() {
        const { appPath, config, sourceRoot, fileType } = this.combination;
        const { buildAdapter, sassLoaderOption, lessLoaderOption, stylusLoaderOption, designWidth, deviceRatio } = config;
        const { postcssOption, postcssUrlOption, cssModuleOption } = this.parsePostCSSOptions();
        this.__postcssOption = (0, postcss_mini_1.getDefaultPostcssConfig)({
            designWidth,
            deviceRatio,
            postcssOption,
            alias: config.alias,
        });
        const postcssPlugins = (0, postcss_mini_1.getPostcssPlugins)(appPath, this.__postcssOption);
        const cssLoaders = this.getCSSLoaders(postcssPlugins, cssModuleOption);
        const resolveUrlLoader = WebpackModule_1.WebpackModule.getResolveUrlLoader();
        const sassLoader = WebpackModule_1.WebpackModule.getSassLoader(sassLoaderOption);
        const scssLoader = WebpackModule_1.WebpackModule.getScssLoader(sassLoaderOption);
        const lessLoader = WebpackModule_1.WebpackModule.getLessLoader(lessLoaderOption);
        const stylusLoader = WebpackModule_1.WebpackModule.getStylusLoader(stylusLoaderOption);
        const rule = {
            sass: {
                test: helper_1.REG_SASS_SASS,
                oneOf: this.addCSSLoader(cssLoaders, resolveUrlLoader, sassLoader)
            },
            scss: {
                test: helper_1.REG_SASS_SCSS,
                oneOf: this.addCSSLoader(cssLoaders, resolveUrlLoader, scssLoader)
            },
            less: {
                test: helper_1.REG_LESS,
                oneOf: this.addCSSLoader(cssLoaders, lessLoader)
            },
            stylus: {
                test: helper_1.REG_STYLUS,
                oneOf: this.addCSSLoader(cssLoaders, stylusLoader)
            },
            normalCss: {
                test: helper_1.REG_CSS,
                oneOf: cssLoaders
            },
            script: this.getScriptRule(),
            template: {
                test: helper_1.REG_TEMPLATE,
                type: 'asset/resource',
                generator: {
                    filename({ filename }) {
                        const extname = path_1.default.extname(filename);
                        return filename.replace(sourceRoot + '/', '').replace(extname, fileType.templ).replace(/node_modules/gi, 'npm');
                    }
                },
                use: [WebpackModule_1.WebpackModule.getLoader(path_1.default.resolve(__dirname, '../loaders/miniTemplateLoader'), {
                        buildAdapter
                    })]
            },
            xscript: {
                test: new RegExp(`\\${this.combination.fileType.xs || 'wxs'}$`),
                type: 'asset/resource',
                generator: {
                    filename({ filename }) {
                        return filename.replace(sourceRoot + '/', '').replace(/node_modules/gi, 'npm');
                    }
                },
                use: [WebpackModule_1.WebpackModule.getLoader(path_1.default.resolve(__dirname, '../loaders/miniXScriptLoader'))]
            },
            media: this.getMediaRule(postcssUrlOption),
            font: this.getFontRule(postcssUrlOption),
            image: this.getImageRule(postcssUrlOption)
        };
        return { rule };
    }
    addCSSLoader(cssLoaders, ...loader) {
        const cssLoadersCopy = (0, lodash_1.cloneDeep)(cssLoaders);
        cssLoadersCopy.forEach(item => {
            if (item.use) {
                item.use = [...item.use, ...loader];
            }
        });
        return cssLoadersCopy;
    }
    getCSSLoaders(postcssPlugins, cssModuleOption) {
        const { config } = this.combination;
        const { cssLoaderOption } = config;
        const extractCSSLoader = WebpackModule_1.WebpackModule.getExtractCSSLoader();
        const cssLoader = WebpackModule_1.WebpackModule.getCSSLoader(cssLoaderOption);
        const postCSSLoader = WebpackModule_1.WebpackModule.getPostCSSLoader({
            postcssOptions: {
                plugins: postcssPlugins
            }
        });
        const cssLoaders = [{
                use: [
                    extractCSSLoader,
                    cssLoader,
                    postCSSLoader
                ]
            }];
        if (cssModuleOption.enable) {
            const cssModuleOptionConfig = (0, helper_1.recursiveMerge)({}, {
                namingPattern: 'module',
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            }, cssModuleOption.config);
            const cssLoaderWithModule = WebpackModule_1.WebpackModule.getCSSLoaderWithModule(cssModuleOptionConfig, cssLoaderOption);
            const styleModuleReg = /(.*\.module).*\.(css|s[ac]ss|less|styl)\b/;
            const styleGlobalReg = /(.*\.global).*\.(css|s[ac]ss|less|styl)\b/;
            let cssModuleCondition;
            if (cssModuleOptionConfig.namingPattern === 'module') {
                /* 不排除 node_modules 内的样式 */
                cssModuleCondition = styleModuleReg;
                // for vue
                cssLoaders.unshift({
                    resourceQuery: /module=/,
                    use: [
                        extractCSSLoader,
                        cssLoaderWithModule,
                        postCSSLoader
                    ]
                });
            }
            else {
                cssModuleCondition = {
                    and: [
                        { not: styleGlobalReg },
                        { not: helper_1.isNodeModule }
                    ]
                };
            }
            cssLoaders.unshift({
                include: [cssModuleCondition],
                use: [
                    extractCSSLoader,
                    cssLoaderWithModule,
                    postCSSLoader
                ]
            });
        }
        return cssLoaders;
    }
    getScriptRule() {
        var _a;
        const { sourceDir, config } = this.combination;
        const { compile = {} } = this.combination.config;
        const rule = WebpackModule_1.WebpackModule.getScriptRule();
        rule.include = [
            sourceDir,
            filename => /(?<=node_modules[\\/]).*taro/.test(filename)
        ];
        if (Array.isArray(compile.include)) {
            rule.include.unshift(...compile.include);
        }
        if (Array.isArray(compile.exclude)) {
            rule.exclude = [...compile.exclude];
        }
        if (((_a = config.experimental) === null || _a === void 0 ? void 0 : _a.compileMode) === true) {
            rule.use.compilerLoader = WebpackModule_1.WebpackModule.getLoader(path_1.default.resolve(__dirname, '../loaders/miniCompilerLoader'), {
                platform: config.platform.toUpperCase(),
                template: config.template,
                FILE_COUNTER_MAP: MiniCompileModePlugin_1.FILE_COUNTER_MAP,
            });
        }
        return rule;
    }
    parsePostCSSOptions() {
        const { postcss: postcssOption = {} } = this.combination.config;
        const defaultUrlOption = {
            enable: true,
            config: {
                limit: 10 * 1024 // limit 10k base on document
            }
        };
        const defaultCssModuleOption = {
            enable: false,
            config: {
                namingPattern: 'global',
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            }
        };
        const urlOptions = (0, helper_1.recursiveMerge)({}, defaultUrlOption, postcssOption.url);
        let postcssUrlOption = {};
        if (urlOptions.enable) {
            postcssUrlOption = urlOptions.config;
        }
        const cssModuleOption = (0, helper_1.recursiveMerge)({}, defaultCssModuleOption, postcssOption.cssModules);
        return {
            postcssOption,
            postcssUrlOption,
            cssModuleOption
        };
    }
    getMediaRule(postcssOptions) {
        const sourceRoot = this.combination.sourceRoot;
        const { mediaUrlLoaderOption } = this.combination.config;
        const options = Object.assign({}, postcssOptions, mediaUrlLoaderOption);
        return WebpackModule_1.WebpackModule.getMediaRule(sourceRoot, options);
    }
    getFontRule(postcssOptions) {
        const sourceRoot = this.combination.sourceRoot;
        const { fontUrlLoaderOption } = this.combination.config;
        const options = Object.assign({}, postcssOptions, fontUrlLoaderOption);
        return WebpackModule_1.WebpackModule.getFontRule(sourceRoot, options);
    }
    getImageRule(postcssOptions) {
        const sourceRoot = this.combination.sourceRoot;
        const { imageUrlLoaderOption } = this.combination.config;
        const options = Object.assign({}, postcssOptions, imageUrlLoaderOption);
        return WebpackModule_1.WebpackModule.getImageRule(sourceRoot, options);
    }
}
exports.MiniWebpackModule = MiniWebpackModule;
//# sourceMappingURL=MiniWebpackModule.js.map