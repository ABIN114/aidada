"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Modify from https://github.com/webpack/webpack/blob/main/lib/container/ModuleFederationPlugin.js
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra and Zackary Jackson @ScriptedAlchemy
*/
const lodash_1 = __importDefault(require("lodash"));
const ModuleFederationPlugin_1 = __importDefault(require("webpack/lib/container/ModuleFederationPlugin"));
const ExternalsType_check_js_1 = __importDefault(require("webpack/schemas/plugins/container/ExternalsType.check.js"));
const TaroContainerPlugin_1 = __importDefault(require("./TaroContainerPlugin"));
const TaroContainerReferencePlugin_1 = __importDefault(require("./TaroContainerReferencePlugin"));
const PLUGIN_NAME = 'TaroModuleFederationPlugin';
class TaroModuleFederationPlugin extends ModuleFederationPlugin_1.default {
    constructor(options, params) {
        super(options);
        this.params = params;
        this.deps = params.deps;
        this.isBuildPlugin = params.isBuildPlugin || false;
        this.remoteAssets = params.remoteAssets || [];
        this.runtimeRequirements = params.runtimeRequirements;
        this._Library = { type: 'var', name: options.name };
    }
    /** Apply the plugin */
    apply(compiler) {
        const { SharePlugin } = compiler.webpack.sharing;
        const { _options: options } = this;
        const library = options.library || this._Library;
        const remoteType = options.remoteType ||
            (options.library && (0, ExternalsType_check_js_1.default)(options.library.type)
                ? options.library.type
                : 'script');
        const enabledLibraryTypes = compiler.options.output.enabledLibraryTypes;
        if (library && !(enabledLibraryTypes === null || enabledLibraryTypes === void 0 ? void 0 : enabledLibraryTypes.includes(library.type))) {
            enabledLibraryTypes === null || enabledLibraryTypes === void 0 ? void 0 : enabledLibraryTypes.push(library.type);
        }
        compiler.hooks.afterPlugins.tap(PLUGIN_NAME, () => {
            const { exposes, filename, name, remotes = [], runtime, shared, shareScope } = options;
            if (!lodash_1.default.isEmpty(exposes)) {
                new TaroContainerPlugin_1.default({
                    name,
                    library,
                    filename,
                    runtime,
                    exposes
                }, {
                    env: this.params.env,
                    platformType: this.params.platformType,
                    runtimeRequirements: this.runtimeRequirements
                }).apply(compiler);
            }
            if (!lodash_1.default.isEmpty(remotes)) {
                const opt = {
                    remoteType,
                    remotes
                };
                new TaroContainerReferencePlugin_1.default(opt, {
                    deps: this.deps,
                    env: this.params.env,
                    platformType: this.params.platformType,
                    remoteAssets: this.remoteAssets,
                    isBuildPlugin: this.isBuildPlugin,
                    runtimeRequirements: this.runtimeRequirements
                }).apply(compiler);
            }
            if (shared) {
                new SharePlugin({
                    shared,
                    shareScope
                }).apply(compiler);
            }
        });
    }
}
exports.default = TaroModuleFederationPlugin;
//# sourceMappingURL=TaroModuleFederationPlugin.js.map