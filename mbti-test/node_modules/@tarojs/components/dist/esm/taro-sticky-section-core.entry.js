import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const StickySection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('StickySection', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { StickySection as taro_sticky_section_core };
