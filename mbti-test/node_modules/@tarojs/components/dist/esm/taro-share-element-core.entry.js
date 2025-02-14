import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const ShareElement = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('ShareElement', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { ShareElement as taro_share_element_core };
