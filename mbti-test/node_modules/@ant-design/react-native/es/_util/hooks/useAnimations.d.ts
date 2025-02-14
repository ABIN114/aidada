import { Animated, EasingFunction } from 'react-native';
declare type animateType = (_TimingAnimationConfig: {
    toValue?: number | Animated.AnimatedValue | {
        x: number;
        y: number;
    } | Animated.AnimatedValueXY | Animated.AnimatedInterpolation;
    easing?: EasingFunction;
    duration?: number;
    delay?: number;
    useNativeDriver?: boolean;
}) => void;
interface ConfigureInterface {
    initialValue: number;
    animate: animateType;
}
export declare function useAnimate(configure: ConfigureInterface): Animated.Value[];
export declare function useAnimatedTiming(): [Animated.Value, animateType];
export {};
