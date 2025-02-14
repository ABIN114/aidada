import { r as registerInstance, h } from './index-ab3c86da.js';

const Label = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.for = undefined;
  }
  render() {
    return (h("label", { htmlFor: this.for }, h("slot", null)));
  }
};

export { Label as taro_label_core };
