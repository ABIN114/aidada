import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const AnimationView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('AnimationView', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { AnimationView as taro_animation_view_core };
