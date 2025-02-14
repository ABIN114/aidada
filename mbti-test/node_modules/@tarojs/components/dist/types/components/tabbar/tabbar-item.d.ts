import { FunctionalComponent } from '../../stencil-public-runtime';
type TabbarItemProps = {
  index: number;
  isSelected?: boolean;
  textColor?: string;
  badgeText?: string;
  iconPath: string;
  showRedDot?: boolean;
  pagePath?: string;
  text?: string;
  onSelect: (index: number) => void;
};
export declare const TabbarItem: FunctionalComponent<TabbarItemProps>;
export {};
