'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helper = require('@tarojs/helper');
var shared = require('@tarojs/shared');
var lodash = require('lodash');
var acorn = require('acorn');
var walk = require('acorn-walk');
var path = require('node:path');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var acorn__namespace = /*#__PURE__*/_interopNamespaceDefault(acorn);
var walk__namespace = /*#__PURE__*/_interopNamespaceDefault(walk);

function addConfig(source) {
    const configsMap = {
        enableShareAppMessage: ['onShareAppMessage', 'useShareAppMessage'],
        enableShareTimeline: ['onShareTimeline', 'useShareTimeline']
    };
    const ast = acorn__namespace.parse(source, {
        ecmaVersion: 'latest',
        sourceType: 'module'
    });
    const additionConfig = {};
    function check(name) {
        Object.keys(configsMap).forEach(configName => {
            const apis = configsMap[configName];
            if (apis.includes(name)) {
                additionConfig[configName] = true;
            }
        });
    }
    walk__namespace.simple(ast, {
        FunctionExpression(node) {
            if (!node.id || !node.id.name)
                return;
            check(node.id.name);
        },
        FunctionDeclaration(node) {
            if (!node.id || !node.id.name)
                return;
            check(node.id.name);
        },
        CallExpression(node) {
            const { callee } = node;
            if (callee.type === 'Identifier') {
                check(callee.name);
            }
            else if (callee.type === 'MemberExpression') {
                if (callee.property.type === 'Identifier') {
                    check(callee.property.name);
                }
                else if (callee.property.type === 'Literal') {
                    check(callee.property.value);
                }
            }
            node.arguments.forEach(item => {
                if (item.type === 'Literal' && item.value) {
                    check(item.value);
                }
            });
        }
    });
    return additionConfig;
}
const nervMeta = {
    importFrameworkStatement: `
import Nerv from 'nervjs';
`,
    mockAppStatement: `
class App extends Nerv.Component {
render () {
  return this.props.children
}
}
`,
    frameworkArgs: 'Nerv, Nerv, config',
    importFrameworkName: 'Nerv'
};
function getLoaderMeta(framework) {
    const loaderMeta = {
        importFrameworkStatement: `
import * as React from 'react'
import ReactDOM from 'react-dom'
`,
        mockAppStatement: `
class App extends React.Component {
  render () {
    return this.props.children
  }
}
`,
        frameworkArgs: 'React, ReactDOM, config',
        creator: 'createReactApp',
        creatorLocation: '@tarojs/plugin-framework-react/dist/runtime',
        importFrameworkName: 'React',
        extraImportForWeb: '',
        execBeforeCreateWebApp: '',
        modifyConfig(config, source) {
            Object.assign(config, addConfig(source));
        }
    };
    if (framework === 'nerv') {
        Object.assign(loaderMeta, nervMeta);
    }
    if (process.env.TARO_PLATFORM === 'web') {
        if (framework === 'react') {
            const react = require('react');
            const majorVersion = Number((react.version || '18').split('.')[0]);
            if (majorVersion >= 18) {
                // Note: In react 18 or above, should using react-dom/client
                loaderMeta.importFrameworkStatement = loaderMeta.importFrameworkStatement.replace('\'react-dom\'', '\'react-dom/client\'');
                loaderMeta.extraImportForWeb += `import { findDOMNode, render, unstable_batchedUpdates } from 'react-dom'\n`;
                loaderMeta.execBeforeCreateWebApp += `Object.assign(ReactDOM, { findDOMNode, render, unstable_batchedUpdates })\n`;
            }
        }
    }
    return loaderMeta;
}

function modifyH5WebpackChain(ctx, framework, chain) {
    var _a;
    setLoader$1(framework, chain);
    setPlugin(ctx, framework, chain);
    const { isBuildNativeComp = false } = ((_a = ctx.runOpts) === null || _a === void 0 ? void 0 : _a.options) || {};
    const externals = {};
    if (isBuildNativeComp) {
        // Note: 该模式不支持 prebundle 优化，不必再处理
        externals.react = {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        };
        externals['react-dom'] = {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        };
        if (framework === 'preact') {
            externals.preact = 'preact';
        }
        chain.merge({
            externalsType: 'umd'
        });
    }
    chain.merge({
        externals,
        module: {
            rule: {
                'process-import-taro-h5': {
                    test: /taro-h5[\\/]dist[\\/]api[\\/]taro/,
                    loader: require.resolve('./api-loader')
                }
            }
        },
    });
}
function setLoader$1(framework, chain) {
    function customizer(object = '', sources = '') {
        if ([object, sources].every(e => typeof e === 'string'))
            return object + sources;
    }
    chain.plugin('mainPlugin')
        .tap(args => {
        args[0].loaderMeta = lodash.mergeWith(getLoaderMeta(framework), args[0].loaderMeta, customizer);
        return args;
    });
}
function setPlugin(ctx, framework, chain) {
    var _a, _b;
    const config = ctx.initialConfig;
    const webpackConfig = chain.toConfig();
    const isProd = webpackConfig.mode === 'production';
    if (!isProd && ((_b = (_a = config.h5) === null || _a === void 0 ? void 0 : _a.devServer) === null || _b === void 0 ? void 0 : _b.hot) !== false) {
        // 默认开启 fast-refresh
        if (framework === 'react') {
            chain
                .plugin('fastRefreshPlugin')
                .use(require('@pmmmwh/react-refresh-webpack-plugin'));
        }
        else if (framework === 'preact') {
            chain
                .plugin('hotModuleReplacementPlugin')
                .use(require('webpack').HotModuleReplacementPlugin);
            chain
                .plugin('fastRefreshPlugin')
                .use(require('@prefresh/webpack'));
        }
    }
}

function modifyMiniWebpackChain(ctx, framework, chain) {
    setAlias$1(ctx, framework, chain);
    setLoader(framework, chain);
}
function setAlias$1(ctx, framework, chain) {
    var _a;
    const config = ctx.initialConfig;
    const alias = chain.resolve.alias;
    if (framework === 'react') {
        alias.set('react-dom$', '@tarojs/react');
        alias.set('react-dom/client$', '@tarojs/react');
        const webpackConfig = chain.toConfig();
        const isProd = webpackConfig.mode === 'production';
        if (!isProd && ((_a = config.mini) === null || _a === void 0 ? void 0 : _a.debugReact) !== true) {
            // 不是生产环境，且没有设置 debugReact，则使用压缩版本的 react 依赖，减少体积
            // 兼容pnpm workspace
            const reactModulePath = require.resolve('react', { paths: [process.cwd()] });
            const newFilePath = path.join(path.dirname(reactModulePath), 'cjs', 'react.production.min.js');
            alias.set('react-reconciler$', 'react-reconciler/cjs/react-reconciler.production.min.js');
            alias.set('react$', newFilePath);
            alias.set('react/jsx-runtime$', 'react/cjs/react-jsx-runtime.production.min.js');
            // 在React18中，使用了exports字段约定了模块暴露路径，其中并未暴露 ./cjs/ 。这将使上面的alias在编译时报错。相当的tricky。
            // Why writeJson？ prebundle will load package.json via readFile to check exports property.
            const reactPkgPath = require.resolve('react/package.json', { paths: [process.cwd()] });
            if (reactPkgPath) {
                const reactPkg = require('react/package.json');
                const reactVersion = reactPkg.version || '';
                if (/^[~^]?18/.test(reactVersion) && reactPkg.exports) {
                    reactPkg.exports = Object.assign(reactPkg.exports, {
                        './cjs/': './cjs/',
                    });
                    helper.fs.writeJsonSync(reactPkgPath, reactPkg, { spaces: 2 });
                }
            }
        }
    }
}
function setLoader(framework, chain) {
    chain.plugin('miniPlugin').tap((args) => {
        args[0].loaderMeta = getLoaderMeta(framework);
        return args;
    });
}

var index = (ctx) => {
    const { framework } = ctx.initialConfig;
    if (framework !== 'react' && framework !== 'nerv' && framework !== 'preact')
        return;
    ctx.modifyWebpackChain(({ chain }) => {
        // 通用
        setAlias(framework, chain);
        chain
            .plugin('definePlugin')
            .tap(args => {
            const config = args[0];
            config.__TARO_FRAMEWORK__ = `"${framework}"`;
            return args;
        });
        if (process.env.TARO_PLATFORM === 'web') {
            // H5
            modifyH5WebpackChain(ctx, framework, chain);
        }
        else {
            // 小程序
            modifyMiniWebpackChain(ctx, framework, chain);
        }
    });
    ctx.modifyRunnerOpts(({ opts }) => {
        if (!(opts === null || opts === void 0 ? void 0 : opts.compiler))
            return;
        if (shared.isString(opts.compiler)) {
            opts.compiler = {
                type: opts.compiler
            };
        }
        const { compiler } = opts;
        if (compiler.type === 'webpack5') {
            // 提供给 webpack5 依赖预编译收集器的第三方依赖
            const deps = [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@tarojs/plugin-framework-react/dist/runtime'
            ];
            compiler.prebundle || (compiler.prebundle = {});
            const prebundleOptions = compiler.prebundle;
            prebundleOptions.include || (prebundleOptions.include = []);
            prebundleOptions.include = prebundleOptions.include.concat(deps);
            prebundleOptions.exclude || (prebundleOptions.exclude = []);
            prebundleOptions.exclude.push(/mobx/); // 依赖会对 webpack 修改，默认排除
            if (prebundleOptions.enable === false)
                return;
            const taroReactPlugin = {
                name: 'taroReactPlugin',
                setup(build) {
                    build.onLoad({ filter: /taro-h5[\\/]dist[\\/]api[\\/]taro/ }, ({ path }) => {
                        const content = helper.fs.readFileSync(path).toString();
                        return {
                            contents: require('./api-loader')(content)
                        };
                    });
                }
            };
            prebundleOptions.esbuild || (prebundleOptions.esbuild = {});
            const esbuildConfig = prebundleOptions.esbuild;
            esbuildConfig.plugins || (esbuildConfig.plugins = []);
            esbuildConfig.plugins.push(taroReactPlugin);
        }
    });
};
function setAlias(framework, chain) {
    const alias = chain.resolve.alias;
    switch (framework) {
        case 'preact':
            alias.set('react', 'preact/compat');
            alias.set('react-dom/test-utils', 'preact/test-utils');
            alias.set('react-dom', 'preact/compat');
            alias.set('react/jsx-runtime', 'preact/jsx-runtime');
            break;
        case 'nerv':
            alias.set('react$', 'nervjs');
            alias.set('react-dom$', 'nervjs');
            break;
    }
}

exports.default = index;
//# sourceMappingURL=index.js.map
