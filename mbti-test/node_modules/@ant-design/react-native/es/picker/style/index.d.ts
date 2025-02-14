import { TextStyle, ViewStyle } from 'react-native';
export interface PickerStyle {
    modal: ViewStyle;
    container: ViewStyle;
    header: ViewStyle;
    headerItem: ViewStyle;
    actionText: TextStyle;
    title: TextStyle;
    okText: TextStyle;
    dismissText: TextStyle;
}
declare const _default: () => PickerStyle;
export default _default;
