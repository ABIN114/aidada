import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const RootPortal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('RootPortal', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { RootPortal as taro_root_portal_core };
