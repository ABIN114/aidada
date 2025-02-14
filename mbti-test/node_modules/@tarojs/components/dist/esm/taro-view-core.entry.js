import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ab3c86da.js';
import { c as classnames } from './index-c3e4004b.js';
import { h as handleStencilNodes } from './helper-8a85bb65.js';
import '@tarojs/taro';

const indexCss = "body,html{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}taro-view-core{display:block}";

const View = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onLongPress = createEvent(this, "longpress", 7);
    this.startTime = 0;
    this.animation = undefined;
    this.hoverClass = undefined;
    this.hoverStartTime = 50;
    this.hoverStayTime = 400;
    this.hover = false;
    this.touch = false;
  }
  onTouchStart() {
    if (this.hoverClass) {
      this.touch = true;
      setTimeout(() => {
        if (this.touch) {
          this.hover = true;
        }
      }, this.hoverStartTime);
    }
    this.timeoutEvent = setTimeout(() => {
      this.onLongPress.emit();
    }, 350);
    this.startTime = Date.now();
  }
  onTouchMove() {
    clearTimeout(this.timeoutEvent);
  }
  onTouchEnd() {
    const spanTime = Date.now() - this.startTime;
    if (spanTime < 350) {
      clearTimeout(this.timeoutEvent);
    }
    if (this.hoverClass) {
      this.touch = false;
      setTimeout(() => {
        if (!this.touch) {
          this.hover = false;
        }
      }, this.hoverStayTime);
    }
  }
  componentDidRender() {
    handleStencilNodes(this.el);
  }
  render() {
    const cls = classnames({
      [`${this.hoverClass}`]: this.hover
    });
    let attr = {};
    if (!!this.animation) {
      attr['animation'] = this.animation;
      attr['data-animation'] = this.animation;
    }
    return (h(Host, Object.assign({ class: cls }, attr), h("slot", null)));
  }
  get el() { return getElement(this); }
};
View.style = indexCss;

export { View as taro_view_core };
