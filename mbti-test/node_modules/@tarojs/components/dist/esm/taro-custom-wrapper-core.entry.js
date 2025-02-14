import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';

const CustomWrapper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null));
  }
};

export { CustomWrapper as taro_custom_wrapper_core };
