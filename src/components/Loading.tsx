import { ActivityIndicator, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import useOpenAIStore from "@/stores/openai";

export default function Loading() {
  const { isLoading } = useOpenAIStore();

  if (!isLoading) return null;
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
      <Text style={{ color: "#fff", marginTop: 16 }}>Loading...</Text>
    </Animated.View>
  );
}
