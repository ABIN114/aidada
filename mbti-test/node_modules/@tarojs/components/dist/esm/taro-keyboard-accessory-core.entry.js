import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const KeyboardAccessory = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('KeyboardAccessory', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { KeyboardAccessory as taro_keyboard_accessory_core };
