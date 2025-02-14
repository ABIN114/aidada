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
const loader_utils_1 = require("loader-utils");
function default_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const REG_REQUIRE = /require\(['"](.+\.wxs)['"]\)/g;
        const callback = this.async();
        const importings = [];
        let res;
        try {
            while ((res = REG_REQUIRE.exec(source)) !== null) {
                const dep = res[1];
                if ((0, loader_utils_1.isUrlRequest)(dep)) {
                    const request = (0, loader_utils_1.urlToRequest)(dep);
                    importings.push(this.importModule(request));
                }
            }
            yield Promise.all(importings);
            callback(null, source);
        }
        catch (error) {
            callback(error, source);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=miniXScriptLoader.js.map