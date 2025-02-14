'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5b029707.js');

const Label = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.for = undefined;
  }
  render() {
    return (index.h("label", { htmlFor: this.for }, index.h("slot", null)));
  }
};

exports.taro_label_core = Label;
