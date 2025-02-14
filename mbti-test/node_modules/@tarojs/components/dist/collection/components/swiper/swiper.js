var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Swiper_id, _Swiper_source;
import { h, Host } from '@stencil/core';
import classNames from 'classnames';
import SwiperJS from 'swiper/swiper-bundle.esm.js';
import { debounce } from '../../utils';
let INSTANCE_ID = 0;
export class Swiper {
  constructor() {
    _Swiper_id.set(this, INSTANCE_ID++);
    _Swiper_source.set(this, '');
    this.handleSwiperLoopListen = () => {
      var _a, _b, _c;
      ((_a = this.observerFirst) === null || _a === void 0 ? void 0 : _a.disconnect) && this.observerFirst.disconnect();
      ((_b = this.observerLast) === null || _b === void 0 ? void 0 : _b.disconnect) && this.observerLast.disconnect();
      this.observerFirst = new MutationObserver(this.handleSwiperLoopDebounce);
      this.observerLast = new MutationObserver(this.handleSwiperLoopDebounce);
      const wrapper = (_c = this.swiper.$wrapperEl) === null || _c === void 0 ? void 0 : _c[0];
      const list = wrapper.querySelectorAll('taro-swiper-item-core:not(.swiper-slide-duplicate)');
      if (list.length >= 1) {
        this.observerFirst.observe(list[0], {
          characterData: true
        });
      }
      else if (list.length >= 2) {
        this.observerLast.observe(list[list.length - 1], {
          characterData: true
        });
      }
    };
    this.handleSwiperLoop = () => {
      var _a, _b, _c, _d;
      if (!this.swiper || !this.circular)
        return;
      const swiper = this.swiper; // Note: loop 相关的方法 swiper 未声明
      const duplicates = ((_a = this.swiperWrapper) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.swiper-slide-duplicate')) || [];
      if (duplicates.length < 2) {
        // Note: 循环模式下，但是前后垫片未注入
        (_b = swiper.loopDestroy) === null || _b === void 0 ? void 0 : _b.call(swiper);
        (_c = swiper.loopCreate) === null || _c === void 0 ? void 0 : _c.call(swiper);
      }
      else {
        (_d = swiper.loopFix) === null || _d === void 0 ? void 0 : _d.call(swiper);
      }
    };
    this.handleSwiperLoopDebounce = debounce(this.handleSwiperLoop, 50);
    this.handleSwiperSizeDebounce = debounce(() => {
      if (this.swiper && this.swiper.$wrapperEl && !this.circular) {
        this.swiper.updateSlides();
      }
    }, 50);
    this.swiperWrapper = undefined;
    this.swiper = undefined;
    this.isWillLoadCalled = false;
    this.indicatorDots = false;
    this.indicatorColor = 'rgba(0, 0, 0, .3)';
    this.indicatorActiveColor = '#000000';
    this.autoplay = false;
    this.current = 0;
    this.currentItemId = '';
    this.interval = 5000;
    this.duration = 500;
    this.circular = false;
    this.vertical = false;
    this.previousMargin = '0px';
    this.nextMargin = '0px';
    this.displayMultipleItems = 1;
    this.full = false;
    this.zoom = false;
    this.observer = undefined;
    this.observerFirst = undefined;
    this.observerLast = undefined;
  }
  watchCurrent(newVal) {
    if (this.currentItemId || !this.isWillLoadCalled)
      return;
    const n = parseInt(newVal, 10);
    if (isNaN(n))
      return;
    if (this.circular) {
      if (!this.swiper.isBeginning && !this.swiper.isEnd) {
        this.swiper.slideToLoop(n); // 更新下标
      }
    }
    else {
      this.swiper.slideTo(n); // 更新下标
    }
  }
  watchCurrentItemId(newVal) {
    var _a;
    const wrapper = (_a = this.swiper.$wrapperEl) === null || _a === void 0 ? void 0 : _a[0];
    let itemIdIndex = 0;
    wrapper.querySelectorAll('taro-swiper-item-core:not(.swiper-slide-duplicate)').forEach((swiperItem, index) => {
      // @ts-ignore
      if (swiperItem.itemId && swiperItem.itemId === newVal) {
        itemIdIndex = index;
      }
    });
    if (this.circular) {
      if (!this.swiper.isBeginning && !this.swiper.isEnd) {
        this.swiper.slideToLoop(itemIdIndex); // 更新下标
      }
    }
    else {
      this.swiper.slideTo(itemIdIndex); // 更新下标
    }
  }
  watchAutoplay(newVal) {
    if (!this.isWillLoadCalled || !this.swiper)
      return;
    const swiperAutoplay = this.swiper.autoplay;
    if (swiperAutoplay) {
      if (swiperAutoplay.running === newVal)
        return;
      if (newVal) {
        if (this.swiper.params && typeof this.swiper.params.autoplay === 'object') {
          if (this.swiper.params.autoplay.disableOnInteraction === true) {
            this.swiper.params.autoplay.disableOnInteraction = false;
          }
          this.swiper.params.autoplay.delay = this.interval;
        }
        swiperAutoplay.start();
      }
      else {
        swiperAutoplay.stop();
      }
    }
  }
  watchDuration(newVal) {
    if (!this.isWillLoadCalled)
      return;
    this.swiper.params.speed = newVal;
  }
  watchInterval(newVal) {
    if (!this.isWillLoadCalled)
      return;
    if (typeof this.swiper.params.autoplay === 'object') {
      this.swiper.params.autoplay.delay = newVal;
    }
  }
  watchSwiperWrapper(newVal) {
    if (!this.isWillLoadCalled)
      return;
    if (!newVal)
      return;
    this.el.appendChild = (newChild) => {
      return newVal.appendChild(newChild);
    };
    this.el.insertBefore = (newChild, refChild) => {
      return newVal.insertBefore(newChild, refChild);
    };
    this.el.replaceChild = (newChild, oldChild) => {
      return newVal.replaceChild(newChild, oldChild);
    };
    this.el.removeChild = (oldChild) => {
      return newVal.removeChild(oldChild);
    };
    this.el.addEventListener('DOMNodeInserted', this.handleSwiperSizeDebounce);
    this.el.addEventListener('DOMNodeRemoved', this.handleSwiperSizeDebounce);
    this.el.addEventListener('MutationObserver', this.handleSwiperSizeDebounce);
  }
  watchCircular() {
    if (this.swiper) {
      this.swiper.destroy();
      this.handleInit();
    }
  }
  watchDisplayMultipleItems() {
    if (this.swiper) {
      this.swiper.destroy();
      this.handleInit();
    }
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
  }
  componentDidLoad() {
    var _a;
    this.handleInit();
    if (!this.swiper || !this.circular)
      return;
    const wrapper = (_a = this.swiper.$wrapperEl) === null || _a === void 0 ? void 0 : _a[0];
    this.observer = new MutationObserver(this.handleSwiperLoopListen);
    this.observer.observe(wrapper, {
      childList: true
    });
  }
  componentWillUpdate() {
    var _a, _b;
    if (!this.swiper)
      return;
    if (this.autoplay && !((_a = this.swiper.autoplay) === null || _a === void 0 ? void 0 : _a.running)) {
      (_b = this.swiper.autoplay) === null || _b === void 0 ? void 0 : _b.start();
    }
    if (this.swiper.$el) {
      this.swiper.update(); // 更新子元素
    }
  }
  componentDidRender() {
    this.handleSwiperLoop();
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e, _f;
    this.el.removeEventListener('DOMNodeInserted', this.handleSwiperSizeDebounce);
    this.el.removeEventListener('DOMNodeRemoved', this.handleSwiperSizeDebounce);
    this.el.removeEventListener('MutationObserver', this.handleSwiperSizeDebounce);
    (_b = (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect) === null || _b === void 0 ? void 0 : _b.call(_a);
    (_d = (_c = this.observerFirst) === null || _c === void 0 ? void 0 : _c.disconnect) === null || _d === void 0 ? void 0 : _d.call(_c);
    (_f = (_e = this.observerLast) === null || _e === void 0 ? void 0 : _e.disconnect) === null || _f === void 0 ? void 0 : _f.call(_e);
  }
  handleInit() {
    const { autoplay, circular, current, currentItemId, displayMultipleItems, duration, interval, vertical } = this;
    let initialSlide = circular ? current + 1 : current;
    if (currentItemId) {
      let itemIdIndex = 0;
      this.el.querySelectorAll('taro-swiper-item-core:not(.swiper-slide-duplicate)').forEach((swiperItem, index) => {
        // @ts-ignore
        if (swiperItem.itemId && swiperItem.itemId === currentItemId) {
          itemIdIndex = index;
        }
      });
      initialSlide = circular ? itemIdIndex + 1 : itemIdIndex;
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const options = {
      pagination: { el: `.taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")} > .swiper-container > .swiper-pagination` },
      direction: vertical ? 'vertical' : 'horizontal',
      loop: circular,
      slidesPerView: displayMultipleItems,
      initialSlide: initialSlide,
      speed: duration,
      observer: true,
      observeParents: true,
      zoom: this.zoom,
      on: {
        slideTo() {
          that.current = this.realIndex;
        },
        // Note: slideChange 事件在 swiper.slideTo 改写 current 时不触发，因此用 slideChangeTransitionEnd 事件代替
        slideChangeTransitionEnd() {
          /** Note: 此处不能使用 slideChangeTransitionStart 事件
           * - 因为在它触发时 swiper 各个参数并未准备好，将会导致错误的事件抛出；
           * - 同时抛出 change 事件会导致 current 监听被打乱 swiper 的生命周期；
           * - 模式与 slideTo 结合时，会导致动画会被中断、slider 展示不完整或衔接模式错误等问题。
           */
          if (circular) {
            if (this.isBeginning || this.isEnd) {
              this.slideToLoop(this.realIndex, 0); // 更新下标
              return;
            }
          }
          that.onChange.emit({
            current: this.realIndex,
            source: __classPrivateFieldGet(that, _Swiper_source, "f"),
          });
        },
        touchEnd: () => {
          __classPrivateFieldSet(that, _Swiper_source, 'touch', "f");
        },
        autoplay() {
          __classPrivateFieldSet(that, _Swiper_source, 'autoplay', "f");
        },
        transitionEnd() {
          setTimeout(() => {
            __classPrivateFieldSet(that, _Swiper_source, '', "f");
          });
          that.onAnimationFinish.emit({
            current: this.realIndex,
            source: __classPrivateFieldGet(that, _Swiper_source, "f"),
          });
        },
        observerUpdate(_swiper, e) {
          const target = e.target;
          const className = target && typeof target.className === 'string' ? target.className : '';
          if (className.includes('taro_page') && target.style.display !== 'none') {
            if (that.autoplay && target.contains(_swiper.$el[0])) {
              if (that.circular) {
                _swiper.slideToLoop(this.realIndex, 0); // 更新下标
              }
              else {
                _swiper.slideTo(this.realIndex);
              }
            }
          }
        }
      }
    };
    // 自动播放
    if (autoplay) {
      options.autoplay = {
        delay: interval,
        disableOnInteraction: false
      };
    }
    this.swiper = new SwiperJS(`.taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")} > .swiper-container`, options);
    this.swiperWrapper = this.el.querySelector(`.taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")} > .swiper-container > .swiper-wrapper`);
  }
  render() {
    const { vertical, indicatorDots, indicatorColor, indicatorActiveColor } = this;
    const hostStyle = { overflow: 'hidden' };
    const style = { overflow: 'visible' };
    if (this.full) {
      hostStyle.height = '100%';
      style.height = '100%';
    }
    const [, previousMargin] = /^(\d+)px/.exec(this.previousMargin) || [];
    const [, nextMargin] = /^(\d+)px/.exec(this.nextMargin) || [];
    const pM = parseInt(previousMargin) || 0;
    const nM = parseInt(nextMargin) || 0;
    if (vertical) {
      style.marginTop = `${pM}px`;
      style.marginBottom = `${nM}px`;
    }
    else {
      style.marginRight = `${nM}px`;
      style.marginLeft = `${pM}px`;
    }
    return (h(Host, { class: `taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")}`, style: hostStyle }, h("div", { class: 'swiper-container', style: style }, h("style", { type: 'text/css' }, `
              .taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")} > .swiper-container > .swiper-pagination > .swiper-pagination-bullet { background: ${indicatorColor} }
              .taro-swiper-${__classPrivateFieldGet(this, _Swiper_id, "f")} > .swiper-container > .swiper-pagination > .swiper-pagination-bullet-active { background: ${indicatorActiveColor} }
            `), h("div", { class: 'swiper-wrapper' }, h("slot", null)), h("div", { class: classNames('swiper-pagination', {
        'swiper-pagination-hidden': !indicatorDots,
        'swiper-pagination-bullets': indicatorDots
      }) }))));
  }
  static get is() { return "taro-swiper-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/index.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/index.css"]
    };
  }
  static get properties() {
    return {
      "indicatorDots": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u663E\u793A\u9762\u677F\u6307\u793A\u70B9"
        },
        "attribute": "indicator-dots",
        "reflect": false,
        "defaultValue": "false"
      },
      "indicatorColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6307\u793A\u70B9\u989C\u8272"
        },
        "attribute": "indicator-color",
        "reflect": false,
        "defaultValue": "'rgba(0, 0, 0, .3)'"
      },
      "indicatorActiveColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F53\u524D\u9009\u4E2D\u7684\u6307\u793A\u70B9\u989C\u8272"
        },
        "attribute": "indicator-active-color",
        "reflect": false,
        "defaultValue": "'#000000'"
      },
      "autoplay": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u81EA\u52A8\u5207\u6362"
        },
        "attribute": "autoplay",
        "reflect": false,
        "defaultValue": "false"
      },
      "current": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F53\u524D\u6240\u5728\u6ED1\u5757\u7684 index"
        },
        "attribute": "current",
        "reflect": false,
        "defaultValue": "0"
      },
      "currentItemId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F53\u524D\u6240\u5728\u6ED1\u5757\u7684 item-id"
        },
        "attribute": "current-item-id",
        "reflect": false,
        "defaultValue": "''"
      },
      "interval": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u81EA\u52A8\u5207\u6362\u65F6\u95F4\u95F4\u9694"
        },
        "attribute": "interval",
        "reflect": false,
        "defaultValue": "5000"
      },
      "duration": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6ED1\u52A8\u52A8\u753B\u65F6\u957F"
        },
        "attribute": "duration",
        "reflect": false,
        "defaultValue": "500"
      },
      "circular": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u662F\u5426\u91C7\u7528\u8854\u63A5\u6ED1\u52A8"
        },
        "attribute": "circular",
        "reflect": false,
        "defaultValue": "false"
      },
      "vertical": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u6ED1\u52A8\u65B9\u5411\u662F\u5426\u4E3A\u7EB5\u5411"
        },
        "attribute": "vertical",
        "reflect": false,
        "defaultValue": "false"
      },
      "previousMargin": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u524D\u8FB9\u8DDD\uFF0C\u53EF\u7528\u4E8E\u9732\u51FA\u524D\u4E00\u9879\u7684\u4E00\u5C0F\u90E8\u5206\uFF0C\u63A5\u53D7 px \u503C"
        },
        "attribute": "previous-margin",
        "reflect": false,
        "defaultValue": "'0px'"
      },
      "nextMargin": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u540E\u8FB9\u8DDD\uFF0C\u53EF\u7528\u4E8E\u9732\u51FA\u540E\u4E00\u9879\u7684\u4E00\u5C0F\u90E8\u5206\uFF0C\u63A5\u53D7 px \u503C"
        },
        "attribute": "next-margin",
        "reflect": false,
        "defaultValue": "'0px'"
      },
      "displayMultipleItems": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u540C\u65F6\u663E\u793A\u7684\u6ED1\u5757\u6570\u91CF"
        },
        "attribute": "display-multiple-items",
        "reflect": false,
        "defaultValue": "1"
      },
      "full": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u7ED9 previewImage API \u4F7F\u7528\uFF0C\u5168\u5C4F\u663E\u793A swiper"
        },
        "attribute": "full",
        "reflect": false,
        "defaultValue": "false"
      },
      "zoom": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u7ED9 previewImage API \u4F7F\u7528\uFF0C\u7F29\u653E\u652F\u6301"
        },
        "attribute": "zoom",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "swiperWrapper": {},
      "swiper": {},
      "isWillLoadCalled": {},
      "observer": {},
      "observerFirst": {},
      "observerLast": {}
    };
  }
  static get events() {
    return [{
        "method": "onChange",
        "name": "change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onAnimationFinish",
        "name": "animationfinish",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "current",
        "methodName": "watchCurrent"
      }, {
        "propName": "currentItemId",
        "methodName": "watchCurrentItemId"
      }, {
        "propName": "autoplay",
        "methodName": "watchAutoplay"
      }, {
        "propName": "duration",
        "methodName": "watchDuration"
      }, {
        "propName": "interval",
        "methodName": "watchInterval"
      }, {
        "propName": "swiperWrapper",
        "methodName": "watchSwiperWrapper"
      }, {
        "propName": "circular",
        "methodName": "watchCircular"
      }, {
        "propName": "displayMultipleItems",
        "methodName": "watchDisplayMultipleItems"
      }];
  }
}
_Swiper_id = new WeakMap(), _Swiper_source = new WeakMap();
