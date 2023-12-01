import "react-native-get-random-values";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Background from "@/components/Background";
import DrawBar from "@/components/Draw/DrawBar";
import Loading from "@/components/Loading";
import Preview from "@/components/Preview";
import WhiteBoard from "@/components/WhiteBoard";

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <View style={{ flex: 1 }}>
            <Background />
            <WhiteBoard />
            <DrawBar />
            <Loading />
          </View>
          <Preview />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
