"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const pattern = /(url\(\s*['"]?)([^"')]+)(["']?\s*\))/g;
const postcssAlias = (options = {}) => {
    return {
        postcssPlugin: 'postcss-alias',
        Once(styles, { result }) {
            if (!options.alias || !Object.keys(options.alias).length)
                return;
            const opts = result.opts;
            const from = opts.from;
            styles.walkDecls(decl => {
                if (pattern.test(decl.value)) {
                    decl.value = decl.value.replace(pattern, (matched, before, url, after) => {
                        url = url.replace(/^~/, '');
                        if ((0, helper_1.isAliasPath)(url, options.alias)) {
                            const newUrl = (0, helper_1.replaceAliasPath)(from, url, options.alias);
                            return `${before}${newUrl}${after}`;
                        }
                        else {
                            return matched;
                        }
                    });
                }
            });
        }
    };
};
postcssAlias.postcss = true;
exports.default = postcssAlias;
//# sourceMappingURL=postcss-alias.js.map