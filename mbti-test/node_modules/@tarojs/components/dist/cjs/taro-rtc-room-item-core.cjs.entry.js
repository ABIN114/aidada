'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5b029707.js');
const helper = require('./helper-ad6306f6.js');
require('@tarojs/taro');

const RtcRoomItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    helper.notSupport('RtcRoomItem', this);
  }
  render() {
    return (index.h(index.Host, null));
  }
};

exports.taro_rtc_room_item_core = RtcRoomItem;
