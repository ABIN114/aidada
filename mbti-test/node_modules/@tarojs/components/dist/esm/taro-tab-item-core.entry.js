import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const TabItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('TabItem', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { TabItem as taro_tab_item_core };
