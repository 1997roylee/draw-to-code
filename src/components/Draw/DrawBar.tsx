import { Alert, SafeAreaView, View } from "react-native";

import Clear from "./Clear";
import Undo from "./Undo";
import { Button } from "../UI";

import useDrawStore from "@/stores/draw";
import useOpenAIStore from "@/stores/openai";

export default function DrawBar() {
  const { canvasRef } = useDrawStore();
  const { predict } = useOpenAIStore();

  const handleGenerate = async () => {
    const snapshot = canvasRef?.current?.makeImageSnapshot();

    if (snapshot) {
      const base64 = snapshot.encodeToBase64();
      Alert.prompt("Prompt", "Give me a description of the image", (title) => {
        if (title) {
          console.log(title);
          predict(title, base64);
        }
      });
      // predict(base64);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 16,
        right: 16,
        zIndex: 10,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 100,
          }}
        >
          <Clear />
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 100,
          }}
        >
          <Undo />
        </View>
        <Button onPress={handleGenerate}>Create Image</Button>
      </SafeAreaView>
    </View>
  );
}
