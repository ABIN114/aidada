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
exports.Prerender = exports.validatePrerenderPages = void 0;
const helper_1 = require("@tarojs/helper");
const shared_1 = require("@tarojs/shared");
const path_1 = require("path");
const logHelper_1 = require("../utils/logHelper");
function unquote(str) {
    const car = str.charAt(0);
    const end = str.length - 1;
    const isQuoteStart = car === '"' || car === "'";
    if (isQuoteStart && car === str.charAt(end)) {
        return str.slice(1, end);
    }
    return str;
}
function getAttrValue(value) {
    if (typeof value === 'object') {
        try {
            const res = JSON.stringify(value);
            return `'${res}'`;
        }
        catch (error) { } // eslint-disable-line no-empty
    }
    if (value === 'true' || value === 'false' || !(0, shared_1.isString)(value)) {
        return `"{{${value}}}"`;
    }
    return `"${unquote(value)}"`;
}
function validatePrerenderPages(pages, config) {
    let pageConfigs = [];
    if (config == null) {
        return pageConfigs;
    }
    const { include = [], exclude = [], match } = config;
    if (match) {
        const micromatch = require('micromatch');
        pageConfigs = micromatch(pages, match)
            .filter((p) => !p.includes('.config'))
            .map((p) => ({ path: p, params: {} }));
    }
    for (const page of pages) {
        for (const i of include) {
            if ((0, shared_1.isString)(i) && i === page) {
                pageConfigs.push({
                    path: page,
                    params: {}
                });
            }
            if ((0, shared_1.isObject)(i) && i.path === page) {
                pageConfigs.push(Object.assign({
                    params: {}
                }, i));
            }
        }
    }
    pageConfigs = pageConfigs.filter(p => !exclude.includes(p.path));
    return pageConfigs;
}
exports.validatePrerenderPages = validatePrerenderPages;
class Prerender {
    constructor(buildConfig, webpackConfig, stat, template) {
        this.appLoaded = false;
        this.buildAttributes = (attrs) => {
            return Object.keys(attrs)
                .filter(Boolean)
                .filter(k => !k.startsWith('bind') || !k.startsWith('on'))
                .map(k => `${k}=${getAttrValue(attrs[k])} `)
                .join('');
        };
        this.renderToXML = (data) => {
            var _a;
            const componentAlias = this.template.componentsAlias;
            let nodeName = data["nn" /* Shortcuts.NodeName */];
            // covert alias to nodeName
            for (const key in componentAlias) {
                const obj = componentAlias[key];
                if (obj._num === nodeName) {
                    nodeName = key;
                    break;
                }
            }
            if (nodeName === '#text') {
                return data["v" /* Shortcuts.Text */];
            }
            if (nodeName === 'static-view' || nodeName === 'pure-view') {
                nodeName = 'view';
            }
            else if (nodeName === 'static-text') {
                nodeName = 'text';
            }
            else if (nodeName === 'static-image') {
                nodeName = 'image';
            }
            // eslint-disable-next-line dot-notation
            if (data['disablePrerender'] || data['disable-prerender']) {
                return '';
            }
            const style = data["st" /* Shortcuts.Style */];
            const klass = data["cl" /* Shortcuts.Class */];
            const id = data.uid || data.sid;
            const children = (_a = data["cn" /* Shortcuts.Childnodes */]) !== null && _a !== void 0 ? _a : [];
            const omitBy = require('lodash').omitBy;
            const attrs = omitBy(data, (_, key) => {
                const internal = ["nn" /* Shortcuts.NodeName */, "cn" /* Shortcuts.Childnodes */, "cl" /* Shortcuts.Class */, "st" /* Shortcuts.Style */, "v" /* Shortcuts.Text */, 'uid', 'sid'];
                return internal.includes(key) || key.startsWith('data-');
            });
            return `<${nodeName}${style ? ` style="${style}"` : ''}${klass ? ` class="${klass}"` : ''}${id ? ` id="${id}"` : ''} ${this.buildAttributes(attrs)}>${children.map(this.renderToXML).join('')}</${nodeName}>`;
        };
        const VM = require('vm2').NodeVM;
        this.buildConfig = buildConfig;
        this.outputPath = webpackConfig.output.path;
        this.globalObject = webpackConfig.output.globalObject;
        this.prerenderConfig = buildConfig.prerender;
        this.stat = stat.toJson();
        this.template = template;
        this.adapter = template.Adapter;
        this.vm = new VM({
            console: this.prerenderConfig.console ? 'inherit' : 'off',
            require: {
                external: true,
                context: 'sandbox'
            },
            sandbox: this.buildSandbox()
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const pages = validatePrerenderPages(Object.keys(this.stat.entrypoints), this.prerenderConfig);
            if (!this.prerenderConfig.console && !this.appLoaded) {
                process.on('unhandledRejection', shared_1.noop);
            }
            yield this.writeScript('app');
            if (!this.appLoaded) {
                try {
                    this.vm.run(`
        const app = require('${this.getRealPath('app')}')
        app.onLaunch()
      `, this.outputPath);
                }
                catch (error) {
                    (0, logHelper_1.printPrerenderFail)('app');
                    console.error(error);
                }
                this.appLoaded = true;
                yield Promise.resolve();
            }
            yield Promise.all(pages.map(p => this.writeScript(p.path)));
            for (const page of pages) {
                try {
                    yield this.writeXML(page);
                    (0, logHelper_1.printPrerenderSuccess)(page.path);
                }
                catch (error) {
                    (0, logHelper_1.printPrerenderFail)(page.path);
                    console.error(error);
                }
            }
        });
    }
    getRealPath(path, ext = '.js') {
        return (0, path_1.join)(this.outputPath, path + ext).replace(/\\/g, '\\\\');
    }
    buildSandbox() {
        const { JSDOM } = require('jsdom');
        const wx = require('miniprogram-simulate/src/api');
        const Page = (config) => config;
        const App = (config) => config;
        const dom = new JSDOM();
        const mock = this.prerenderConfig.mock;
        return Object.assign(Object.assign(Object.assign({}, dom), { Page,
            App, [this.globalObject]: wx, getCurrentPages: shared_1.noop, getApp: shared_1.noop, requirePlugin: shared_1.noop, __wxConfig: {}, PRERENDER: true }), mock);
    }
    writeXML(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path } = config;
            let data = yield this.renderToData(config);
            if ((0, shared_1.isFunction)(this.prerenderConfig.transformData)) {
                data = this.prerenderConfig.transformData(data, config);
            }
            let xml = this.renderToXML(data);
            if ((0, shared_1.isFunction)(this.prerenderConfig.transformXML)) {
                xml = this.prerenderConfig.transformXML(data, config, xml);
            }
            const templatePath = this.getRealPath(path, this.buildConfig.fileType.templ);
            const [importTemplate, template] = helper_1.fs.readFileSync(templatePath, 'utf-8').split('\n');
            let str = `${importTemplate}\n`;
            str += `<block ${this.adapter.if}="{{root.uid}}">\n`;
            str += `  ${template}\n`;
            str += '</block>\n';
            str += `<block ${this.adapter.else}>\n`;
            str += `${xml}\n`;
            str += '</block>';
            helper_1.fs.writeFileSync(templatePath, str, 'utf-8');
        });
    }
    writeScript(path) {
        path = this.getRealPath(path);
        return new Promise((resolve) => {
            const s = `
      if (typeof PRERENDER !== 'undefined') {
        module.exports = ${this.globalObject}._prerender
      }`;
            helper_1.fs.appendFile(path, s, { encoding: 'utf8' }, () => {
                resolve();
            });
        });
    }
    renderToData({ path, params }) {
        return new Promise((resolve, reject) => {
            const dataReceiver = this.vm.run(`
        const page = require('${this.getRealPath(path)}')
        page.route = '${path}'
        module.exports = function (cb) {
          page.onLoad(${JSON.stringify(params || {})}, cb)
        }
      `, this.outputPath);
            dataReceiver((data) => {
                var _a;
                const domTree = data['root.cn.[0]'] || data['root.cn[0]'] || ((_a = data['root.cn']) === null || _a === void 0 ? void 0 : _a[0]);
                if (domTree == null) {
                    reject(new Error('初始化渲染没有任何数据。'));
                }
                resolve(domTree);
            });
        });
    }
}
exports.Prerender = Prerender;
//# sourceMappingURL=prerender.js.map