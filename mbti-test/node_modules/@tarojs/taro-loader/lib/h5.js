"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const loader_utils_1 = require("loader-utils");
const path_1 = require("path");
const constants_1 = require("./constants");
function genResource(path, pages, loaderContext, syncFileName = false) {
    const options = (0, loader_utils_1.getOptions)(loaderContext);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(loaderContext, s);
    const importDependent = syncFileName ? 'require' : 'import';
    return `Object.assign({
  path: '${path}',
  load: function(context, params) {
    const page = ${importDependent}(${stringify((0, path_1.join)(loaderContext.context, syncFileName || path))})
    return [page, context, params]
  }
}, ${JSON.stringify((0, helper_1.readConfig)(pages.get(path.split(path_1.sep).join('/')), options))})`;
}
function default_1() {
    var _a, _b;
    const options = (0, loader_utils_1.getOptions)(this);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(this, s);
    const config = options.config;
    const routerMode = ((_a = config === null || config === void 0 ? void 0 : config.router) === null || _a === void 0 ? void 0 : _a.mode) || 'hash';
    const isBuildNativeComp = options.isBuildNativeComp;
    const isMultiRouterMode = routerMode === 'multi';
    const pathDirname = (0, path_1.dirname)(this.resourcePath);
    const pageName = isMultiRouterMode ? (0, path_1.join)(pathDirname, options.filename).replace(options.sourceDir + path_1.sep, '') : '';
    const pages = new Map(options.pages);
    const pxTransformConfig = options.pxTransformConfig;
    const runtimePath = Array.isArray(options.runtimePath) ? options.runtimePath : [options.runtimePath];
    let setReconcilerPost = '';
    const setReconciler = runtimePath.reduce((res, item) => {
        if (constants_1.REG_POST.test(item)) {
            setReconcilerPost += `import '${item.replace(constants_1.REG_POST, '')}'\n`;
            return res;
        }
        else {
            return res + `import '${item}'\n`;
        }
    }, '');
    if (isBuildNativeComp) {
        const compPath = (0, path_1.join)(pathDirname, options.filename);
        return `import component from ${stringify(compPath)}
${options.loaderMeta.importFrameworkStatement}
${options.loaderMeta.extraImportForWeb}
import { createH5NativeComponentConfig } from '${options.loaderMeta.creatorLocation}'
import { initPxTransform } from '@tarojs/taro'
${setReconcilerPost}
component.config = {}
component.pxTransformConfig = {}
Object.assign(component.config, ${JSON.stringify((0, helper_1.readConfig)(this.resourcePath))})
initPxTransform.call(component, {
  designWidth: ${pxTransformConfig.designWidth},
  deviceRatio: ${JSON.stringify(pxTransformConfig.deviceRatio)},
  baseFontSize: ${pxTransformConfig.baseFontSize || (pxTransformConfig.minRootSize >= 1 ? pxTransformConfig.minRootSize : 20)},
  unitPrecision: ${pxTransformConfig.unitPrecision},
  targetUnit: ${JSON.stringify(pxTransformConfig.targetUnit)}
})
const config = component.config
export default createH5NativeComponentConfig(component, ${options.loaderMeta.frameworkArgs})`;
    }
    if (options.bootstrap)
        return `import(${stringify((0, path_1.join)(options.sourceDir, `${isMultiRouterMode ? pageName : options.entryFileName}.boot`))})`;
    let tabBarCode = `var tabbarIconPath = []
var tabbarSelectedIconPath = []
`;
    if (config.tabBar) {
        const tabbarList = config.tabBar.list;
        for (let i = 0; i < tabbarList.length; i++) {
            const t = tabbarList[i];
            if (t.iconPath) {
                const iconPath = stringify((0, path_1.join)(pathDirname, t.iconPath));
                tabBarCode += `tabbarIconPath[${i}] = typeof require(${iconPath}) === 'object' ? require(${iconPath}).default : require(${iconPath})\n`;
            }
            if (t.selectedIconPath) {
                const iconPath = stringify((0, path_1.join)(pathDirname, t.selectedIconPath));
                tabBarCode += `tabbarSelectedIconPath[${i}] = typeof require(${iconPath}) === 'object' ? require(${iconPath}).default : require(${iconPath})\n`;
            }
        }
    }
    const routesConfig = isMultiRouterMode ? `config.routes = []
config.route = ${genResource(pageName, pages, this, options.filename)}
config.pageName = "${pageName}"` : `config.routes = [
  ${(_b = config.pages) === null || _b === void 0 ? void 0 : _b.map(path => genResource(path, pages, this)).join(',')}
]`;
    const routerCreator = isMultiRouterMode ? 'createMultiRouter' : 'createRouter';
    const historyCreator = routerMode === 'browser' ? 'createBrowserHistory' : routerMode === 'multi' ? 'createMpaHistory' : 'createHashHistory';
    const appMountHandler = config.tabBar ? 'handleAppMountWithTabbar' : 'handleAppMount';
    const code = `${setReconciler}
import { initPxTransform } from '@tarojs/taro'
import { ${routerCreator}, ${historyCreator}, ${appMountHandler} } from '@tarojs/router'
import component from ${stringify((0, path_1.join)(options.sourceDir, options.entryFileName))}
import { window } from '@tarojs/runtime'
import { ${options.loaderMeta.creator} } from '${options.loaderMeta.creatorLocation}'
${options.loaderMeta.importFrameworkStatement}
${options.loaderMeta.extraImportForWeb}
${setReconcilerPost}
var config = ${JSON.stringify(config)}
window.__taroAppConfig = config
${config.tabBar ? tabBarCode : ''}
if (config.tabBar) {
  var tabbarList = config.tabBar.list
  for (var i = 0; i < tabbarList.length; i++) {
    var t = tabbarList[i]
    if (t.iconPath) {
      t.iconPath = tabbarIconPath[i]
    }
    if (t.selectedIconPath) {
      t.selectedIconPath = tabbarSelectedIconPath[i]
    }
  }
}
${routesConfig}
${options.loaderMeta.execBeforeCreateWebApp || ''}
var inst = ${options.loaderMeta.creator}(component, ${options.loaderMeta.frameworkArgs})
var history = ${historyCreator}({ window })
${appMountHandler}(config, history)
${routerCreator}(history, inst, config, ${options.loaderMeta.importFrameworkName})
initPxTransform({
  designWidth: ${pxTransformConfig.designWidth},
  deviceRatio: ${JSON.stringify(pxTransformConfig.deviceRatio)},
  baseFontSize: ${pxTransformConfig.baseFontSize || (pxTransformConfig.minRootSize >= 1 ? pxTransformConfig.minRootSize : 20)},
  unitPrecision: ${pxTransformConfig.unitPrecision},
  targetUnit: ${JSON.stringify(pxTransformConfig.targetUnit)}
})
`;
    return code;
}
exports.default = default_1;
//# sourceMappingURL=h5.js.map