"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaroContainerEntryModule_1 = __importDefault(require("./TaroContainerEntryModule"));
const ContainerEntryModuleFactory = require('webpack/lib/container/ContainerEntryModuleFactory');
class TaroContainerEntryModuleFactory extends ContainerEntryModuleFactory {
    create(data, callback) {
        const dep = data === null || data === void 0 ? void 0 : data.dependencies[0];
        callback(null, {
            module: new TaroContainerEntryModule_1.default(dep.name, dep.exposes, dep.shareScope)
        });
    }
}
exports.default = TaroContainerEntryModuleFactory;
//# sourceMappingURL=TaroContainerEntryModuleFactory.js.map