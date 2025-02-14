import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const OfficialAccount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('OfficialAccount', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { OfficialAccount as taro_official_account_core };
