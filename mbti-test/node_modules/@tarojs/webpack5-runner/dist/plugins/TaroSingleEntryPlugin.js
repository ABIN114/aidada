"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaroSingleEntryDependency_1 = __importDefault(require("../dependencies/TaroSingleEntryDependency"));
class TaroSingleEntryPlugin {
    constructor(context, entry, name, miniType, options = {}) {
        this.context = context;
        this.entry = entry;
        this.name = name;
        this.miniType = miniType;
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('TaroSingleEntryDependency', (compilation, { normalModuleFactory }) => {
            compilation.dependencyFactories.set(TaroSingleEntryDependency_1.default, normalModuleFactory);
        });
        compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
            const { entry, name, context, miniType, options } = this;
            const dep = TaroSingleEntryPlugin.createDependency(entry, name, miniType, options);
            compilation.addEntry(context, dep, name, callback);
        });
    }
    static createDependency(entry, name, miniType, options) {
        return new TaroSingleEntryDependency_1.default(entry, name, { name }, miniType, options);
    }
}
exports.default = TaroSingleEntryPlugin;
//# sourceMappingURL=TaroSingleEntryPlugin.js.map