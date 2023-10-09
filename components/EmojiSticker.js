import { View, Image } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onPanGestureEvent: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onPanGestureEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []); // Ajoutez une dépendance vide ici

  return (
    <View style={{ top: -350 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[animatedStyle, { zIndex: 2 }]}>
          <Image
            source={stickerSource}
            resizeMode="contain"
            style={{ width: imageSize, height: imageSize }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
