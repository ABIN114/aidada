import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const ChannelLive = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('ChannelLive', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { ChannelLive as taro_channel_live_core };
