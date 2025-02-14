import React from 'react';
import { ColorValue, TouchableNativeFeedbackProps } from 'react-native';
interface ButtonWaveProps extends TouchableNativeFeedbackProps {
    Color?: ColorValue;
    children: React.ReactNode;
}
declare const _default: (props: ButtonWaveProps) => JSX.Element;
export default _default;
