import { TaroElement } from "../dom/element.js";
import { Style } from "../dom/style.js";
type TGetComputedStyle = typeof window.getComputedStyle | ((el: TaroElement) => Style);
declare const getComputedStyle: TGetComputedStyle;
export { TGetComputedStyle, getComputedStyle };
