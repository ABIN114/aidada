import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const InlinePaymentPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('InlinePaymentPanel', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { InlinePaymentPanel as taro_inline_payment_panel_core };
