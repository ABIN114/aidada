import { Host, h } from '@stencil/core';
const nativeCloneNode = Node.prototype.cloneNode;
export class SwiperItem {
  constructor() {
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
  static get is() { return "taro-swiper-item-core"; }
  static get properties() {
    return {
      "itemId": {
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
          "text": ""
        },
        "attribute": "item-id",
        "reflect": false
      },
      "deep": {
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
          "text": ""
        },
        "attribute": "deep",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "el"; }
}
