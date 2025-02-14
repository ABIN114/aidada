interface IHorizontal {
    direction?: string;
    layout?: string;
}
declare function isHorizontalFunc({ direction, layout }: IHorizontal): boolean;
interface IRrl {
    direction?: string;
}
declare function isRtlFunc({ direction }: IRrl): boolean;
export { isHorizontalFunc, isRtlFunc };
