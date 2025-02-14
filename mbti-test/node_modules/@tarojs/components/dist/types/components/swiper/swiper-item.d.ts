import { ComponentInterface } from '../../stencil-public-runtime';
export declare class SwiperItem implements ComponentInterface {
  el: HTMLElement;
  itemId: string;
  deep: boolean;
  handleCloneNode(node: Node, deep: boolean): any;
  handleChildNodes(node: Node): any[];
  componentDidRender(): void;
  render(): any;
}
