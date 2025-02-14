"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
class TaroSingleEntryDependency extends webpack_1.default.dependencies.ModuleDependency {
    constructor(request, name, loc, miniType, options = {}) {
        super(request);
        this.name = name;
        this.loc = loc;
        this.miniType = miniType;
        this.options = options;
    }
    // @ts-ignore
    get type() {
        return 'single entry';
    }
}
exports.default = TaroSingleEntryDependency;
//# sourceMappingURL=TaroSingleEntryDependency.js.map