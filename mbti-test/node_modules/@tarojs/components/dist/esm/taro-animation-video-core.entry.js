import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const AnimationVideo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('AnimationVideo', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { AnimationVideo as taro_animation_video_core };
