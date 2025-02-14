import { r as registerInstance, h, H as Host } from './index-ab3c86da.js';
import { n as notSupport } from './helper-8a85bb65.js';
import '@tarojs/taro';

const CommentDetail = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    notSupport('CommentDetail', this);
  }
  render() {
    return (h(Host, null));
  }
};

export { CommentDetail as taro_comment_detail_core };
