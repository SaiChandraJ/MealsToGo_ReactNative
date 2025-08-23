import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, duration]);

  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};
