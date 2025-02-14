'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5b029707.js');
const helper = require('./helper-ad6306f6.js');
require('@tarojs/taro');

const ContactButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    helper.notSupport('ContactButton', this);
  }
  render() {
    return (index.h(index.Host, null));
  }
};

exports.taro_contact_button_core = ContactButton;
