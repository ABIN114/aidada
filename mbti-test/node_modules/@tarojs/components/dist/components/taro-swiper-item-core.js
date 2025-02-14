import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const nativeCloneNode = Node.prototype.cloneNode;
const SwiperItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  get el() { return this; }
}, [0, "taro-swiper-item-core", {
    "itemId": [1, "item-id"],
    "deep": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-swiper-item-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-swiper-item-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SwiperItem);
      }
      break;
  } });
}

const TaroSwiperItemCore = SwiperItem;
const defineCustomElement = defineCustomElement$1;

export { TaroSwiperItemCore, defineCustomElement };
