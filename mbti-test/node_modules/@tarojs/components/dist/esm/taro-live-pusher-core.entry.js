import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const LivePusher = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('LivePusher', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { LivePusher as taro_live_pusher_core };
