"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildNativePlugin = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
let nativePlugin;
class BuildNativePlugin {
    constructor(combination) {
        this.commonChunks = ['runtime', 'vendors', 'taro', 'common'];
        this.combination = combination;
        this.init();
    }
    static getPlugin(combination) {
        nativePlugin || (nativePlugin = new BuildNativePlugin(combination));
        return nativePlugin;
    }
    init() {
        const sourceDir = this.combination.sourceDir;
        const pluginDir = path_1.default.join(sourceDir, 'plugin');
        const pluginConfigPath = path_1.default.join(pluginDir, 'plugin.json');
        if (!helper_1.fs.existsSync(pluginDir))
            return console.log(helper_1.chalk.red('插件目录不存在，请检查！'));
        if (!helper_1.fs.existsSync(pluginConfigPath))
            return console.log(helper_1.chalk.red('缺少插件配置文件，请检查！'));
        const pluginConfig = helper_1.fs.readJSONSync(pluginConfigPath);
        const entryObj = {};
        let pluginMainEntry = '';
        Object.keys(pluginConfig).forEach(key => {
            if (key === 'main') {
                const filePath = path_1.default.join(pluginDir, pluginConfig[key]);
                const fileName = path_1.default.basename(filePath).replace(path_1.default.extname(filePath), '');
                pluginMainEntry = `${fileName}`;
                entryObj[pluginMainEntry] = [(0, helper_1.resolveMainFilePath)(filePath.replace(path_1.default.extname(filePath), ''))];
            }
            else if (key === 'publicComponents' || key === 'pages') {
                Object.keys(pluginConfig[key]).forEach(subKey => {
                    const filePath = path_1.default.join(pluginDir, pluginConfig[key][subKey]);
                    entryObj[`${pluginConfig[key][subKey]}`] = [(0, helper_1.resolveMainFilePath)(filePath.replace(path_1.default.extname(filePath), ''))];
                });
            }
        });
        this.entry = entryObj;
        this.pluginConfig = pluginConfig;
        this.pluginMainEntry = pluginMainEntry;
    }
}
exports.BuildNativePlugin = BuildNativePlugin;
//# sourceMappingURL=BuildNativePlugin.js.map