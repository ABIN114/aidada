import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const RtcRoom = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('RtcRoom', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { RtcRoom as taro_rtc_room_core };
