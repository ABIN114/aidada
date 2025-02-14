"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaroBaseNormalModule = void 0;
const lodash_1 = require("lodash");
const webpack_1 = __importDefault(require("webpack"));
const component_1 = require("../utils/component");
class TaroBaseNormalModule extends webpack_1.default.NormalModule {
    constructor(data) {
        super(data);
        this.collectProps = {};
        this.elementNameSet = new Set();
        this.componentNameSet = new Set();
    }
    clear() {
        this.collectProps = {};
        this.elementNameSet.clear();
        this.componentNameSet.clear();
    }
    serialize(context) {
        const { write } = context;
        write(this.collectProps);
        write(this.elementNameSet);
        write(this.componentNameSet);
        super.serialize(context);
    }
    deserialize(context) {
        const { read } = context;
        this.collectProps = read();
        this.elementNameSet = read();
        this.componentNameSet = read();
        if (!(0, lodash_1.isEmpty)(this.collectProps)) {
            for (const key in this.collectProps) {
                const attrs = component_1.componentConfig.thirdPartyComponents.get(key);
                const value = this.collectProps[key];
                if (!attrs)
                    continue;
                value.split('|').forEach(item => {
                    attrs.add(item);
                });
            }
        }
        for (const elementName of this.elementNameSet) {
            component_1.elementNameSet.add(elementName);
        }
        for (const componentName of this.componentNameSet) {
            component_1.componentNameSet.add(componentName);
        }
        return super.deserialize(context);
    }
}
exports.TaroBaseNormalModule = TaroBaseNormalModule;
class TaroNormalModule extends TaroBaseNormalModule {
    constructor(data) {
        super(data);
        this.name = data.name;
        this.miniType = data.miniType;
        this.isNativePage = data.isNativePage || false;
    }
    serialize(context) {
        const { write } = context;
        write(this.name);
        write(this.miniType);
        write(this.isNativePage);
        super.serialize(context);
    }
    deserialize(context) {
        const { read } = context;
        this.name = read();
        this.miniType = read();
        this.isNativePage = read();
        super.deserialize(context);
    }
}
exports.default = TaroNormalModule;
webpack_1.default.util.serialization.register(TaroNormalModule, '@tarojs/webpack5-runner/dist/plugins/TaroNormalModule', 'TaroNormalModule', {
    serialize(obj, context) {
        obj.serialize(context);
    },
    deserialize(context) {
        const obj = new TaroNormalModule({
            // will be deserialized by Module
            layer: null,
            type: '',
            // will be filled by updateCacheModule
            resource: '',
            context: '',
            request: null,
            userRequest: null,
            rawRequest: null,
            loaders: null,
            matchResource: null,
            parser: null,
            parserOptions: null,
            generator: null,
            generatorOptions: null,
            resolveOptions: null
        });
        obj.deserialize(context);
        return obj;
    }
});
webpack_1.default.util.serialization.register(TaroBaseNormalModule, '@tarojs/webpack5-runner/dist/plugins/TaroNormalModule', 'TaroBaseNormalModule', {
    serialize(obj, context) {
        obj.serialize(context);
    },
    deserialize(context) {
        const obj = new TaroBaseNormalModule({
            // will be deserialized by Module
            layer: null,
            type: '',
            // will be filled by updateCacheModule
            resource: '',
            context: '',
            request: null,
            userRequest: null,
            rawRequest: null,
            loaders: null,
            matchResource: null,
            parser: null,
            parserOptions: null,
            generator: null,
            generatorOptions: null,
            resolveOptions: null
        });
        obj.deserialize(context);
        return obj;
    }
});
//# sourceMappingURL=TaroNormalModule.js.map