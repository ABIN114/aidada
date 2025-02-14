import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const MatchMedia = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('MatchMedia', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { MatchMedia as taro_match_media_core };
