"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectDefineConfigHeader = void 0;
const path = __importStar(require("path"));
/**
 * Inject `defineAppConfig` and `definePageConfig`
 * require header at the top of a config file,
 * without the need to specifically require them
 * if they are used
*/
function injectDefineConfigHeader(babel) {
    const appConfig = 'function defineAppConfig(config) { return config }';
    const pageConfig = 'function definePageConfig(config) { return config }';
    const prependHeader = (nodePath, header) => {
        const parsedHeader = babel.parse(header, { filename: '' }).program.body[0];
        nodePath.node.body.unshift(parsedHeader);
    };
    const enterHandler = (nodePath) => {
        const { scope, node } = nodePath;
        scope.traverse(node, {
            CallExpression(p) {
                const callee = p.node.callee;
                // @ts-ignore
                switch (callee.name) {
                    case 'defineAppConfig':
                        return prependHeader(nodePath, appConfig);
                    case 'definePageConfig':
                        return prependHeader(nodePath, pageConfig);
                }
            }
        });
    };
    return {
        visitor: {
            Program: { enter: enterHandler }
        }
    };
}
exports.injectDefineConfigHeader = injectDefineConfigHeader;
function createBabelRegister({ only }) {
    require('@babel/register')({
        only: Array.from(new Set([...only])),
        presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-typescript')
        ],
        plugins: [
            injectDefineConfigHeader,
            [require.resolve('@babel/plugin-proposal-decorators'), {
                    legacy: true
                }],
            require.resolve('@babel/plugin-proposal-object-rest-spread'),
            [require.resolve('@babel/plugin-transform-runtime'), {
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                    version: '^7.7.7',
                    absoluteRuntime: path.resolve(__dirname, '..', 'node_modules/@babel/runtime')
                }]
        ],
        extensions: ['.jsx', '.js', '.ts', '.tsx'],
        babelrc: false,
        configFile: false,
        cache: false
    });
}
exports.default = createBabelRegister;
//# sourceMappingURL=babelRegister.js.map