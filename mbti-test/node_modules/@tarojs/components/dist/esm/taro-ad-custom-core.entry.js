import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const AdCustom = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('AdCustom', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { AdCustom as taro_ad_custom_core };
