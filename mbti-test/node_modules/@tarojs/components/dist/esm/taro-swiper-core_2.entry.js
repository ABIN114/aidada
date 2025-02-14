import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ab3c86da.js';
import { c as classnames } from './index-c3e4004b.js';
import SwiperJS from 'swiper/swiper-bundle.esm.js';
import { d as debounce } from './index-a00a7418.js';

const indexCss = "@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, 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') format('woff');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-vertical>.swiper-wrapper{-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0px,0,0);transform:translate3d(0px,0,0)}.swiper-container-multirow>.swiper-wrapper{-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-direction:column;flex-direction:column}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-container-pointer-events{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-slide{-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top, right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory}@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, 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') format('woff');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-vertical>.swiper-wrapper{-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0px,0,0);transform:translate3d(0px,0,0)}.swiper-container-multirow>.swiper-wrapper{-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-direction:column;flex-direction:column}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-container-pointer-events{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-slide{-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top, right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom, left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{-webkit-scroll-snap-type:x mandatory;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;text-transform:none;font-variant:initial;line-height:1}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{right:10px;left:auto}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:'next'}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#ffffff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s opacity;transition:.3s opacity;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{-webkit-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:50%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0px,-50%,0);transform:translate3d(0px,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:.2s transform,.2s top;transition:.2s transform,.2s top}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s transform,.2s left;transition:.2s transform,.2s left}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s transform,.2s right;transition:.2s transform,.2s right}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white{--swiper-pagination-color:#ffffff}.swiper-pagination-black{--swiper-pagination-color:#000000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s infinite linear;animation:swiper-preloader-spin 1s infinite linear;-webkit-box-sizing:border-box;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-container-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;-webkit-filter:blur(50px);filter:blur(50px)}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}taro-swiper-core{height:150px;display:block}taro-swiper-core .swiper-container{height:100%}taro-swiper-core .swiper-pagination{font-size:0}taro-swiper-core .swiper-pagination.swiper-pagination-bullet{opacity:1}taro-swiper-core .swiper-pagination.swiper-pagination-hidden{display:none}";

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Swiper_id, _Swiper_source;
let INSTANCE_ID = 0;
const Swiper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onChange = createEvent(this, "change", 7);
    this.onAnimationFinish = createEvent(this, "animationfinish", 7);
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
            `), h("div", { class: 'swiper-wrapper' }, h("slot", null)), h("div", { class: classnames('swiper-pagination', {
        'swiper-pagination-hidden': !indicatorDots,
        'swiper-pagination-bullets': indicatorDots
      }) }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "current": ["watchCurrent"],
    "currentItemId": ["watchCurrentItemId"],
    "autoplay": ["watchAutoplay"],
    "duration": ["watchDuration"],
    "interval": ["watchInterval"],
    "swiperWrapper": ["watchSwiperWrapper"],
    "circular": ["watchCircular"],
    "displayMultipleItems": ["watchDisplayMultipleItems"]
  }; }
};
_Swiper_id = new WeakMap(), _Swiper_source = new WeakMap();
Swiper.style = indexCss;

const nativeCloneNode = Node.prototype.cloneNode;
const SwiperItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.itemId = undefined;
    this.deep = false;
  }
  handleCloneNode(node, deep) {
    const clonedNode = nativeCloneNode.call(node, false);
    const srcChildNodes = this.handleChildNodes(node);
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        const srcNode = srcChildNodes[i];
        if (!srcNode)
          break;
        let srcDeep = deep;
        if (srcNode.nodeType !== 2 && srcNode.nodeType !== 8) {
          // Note: 没有引用节点（s-cr[reference comment]）的情况下，不复制子节点避免冗余（例如：Image 组件）
          if (this.deep !== true && !srcNode['s-cr']) {
            srcDeep = false;
          }
          const childClone = this.handleCloneNode(srcNode, srcDeep);
          clonedNode.appendChild(childClone);
        }
      }
    }
    return clonedNode;
  }
  handleChildNodes(node) {
    const childNodes = node.childNodes;
    // check if element is stencil element without shadow dom
    // and then detect elements that were slotted into the element
    if (node['s-sc']) {
      const result = [];
      for (let i = 0; i < childNodes.length; i++) {
        const slot = childNodes[i]['s-nr'];
        if (slot) {
          result.push(slot);
        }
      }
      return result;
    }
    return Array.from(childNodes);
  }
  componentDidRender() {
    this.el.cloneNode = (deep = false) => {
      return this.handleCloneNode(this.el, deep);
    };
  }
  render() {
    return (h(Host, { class: 'swiper-slide', "item-id": this.itemId }));
  }
  get el() { return getElement(this); }
};

export { Swiper as taro_swiper_core, SwiperItem as taro_swiper_item_core };
