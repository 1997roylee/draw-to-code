import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";

import { Button } from "./UI";

import useOpenAIStore from "@/stores/openai";

export default function Preview() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { preview } = useOpenAIStore();
  const snapPoints = useMemo(() => ["25%", "80%"], []);
  const [mode, setMode] = useState<"preview" | "code">("preview");

  useEffect(() => {
    if (preview) {
      bottomSheetModalRef.current?.present();
    }
  }, [preview]);

  const handleSetMode = () => {
    setMode((prev) => (prev === "preview" ? "code" : "preview"));
  };

  console.log("preview", preview);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
    >
      {/* <Image style={{flex:1}} source={{ uri: "data:image/png;base64," + preview }} /> */}
      {preview &&
        (mode === "preview" ? (
          <WebView style={{ flex: 1 }} source={{ html: preview }} />
        ) : (
          <BottomSheetScrollView>
            <Text>{preview}</Text>
          </BottomSheetScrollView>
        ))}

      <Button onPress={handleSetMode}>
        {mode === "preview" ? "Show Code" : "Show Preview"}
      </Button>
    </BottomSheetModal>
  );
}
