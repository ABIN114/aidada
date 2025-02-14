declare const isWeixin: () => boolean;
declare const isDingTalk: () => boolean;
declare function setMpaTitle(title: string): void;
declare function setTitle(title: string): void;
declare function setNavigationBarStyle(option: {
    backgroundColor: string;
    frontColor: string;
}): void;
declare function setNavigationBarLoading(loading: boolean): void;
export { isWeixin, isDingTalk, setMpaTitle, setTitle, setNavigationBarStyle, setNavigationBarLoading };
