import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const StickyHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('StickyHeader', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { StickyHeader as taro_sticky_header_core };
