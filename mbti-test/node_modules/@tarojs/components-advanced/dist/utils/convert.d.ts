/** 将距离值根据单位转换为 Number 类型
 * TODO: 未来可以考虑支持更多单位
 */
declare function convertPX2Int(distance?: string | number): string | number;
declare function convertNumber2PX(styleValue: unknown): string;
export { convertPX2Int, convertNumber2PX };
