import { Canvas, Path, useCanvasRef } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import useDrawStore from "@/stores/draw";
import { createNewPath, createNewLayer, LayerType } from "@/utils/draw";

export default function WhiteBoard() {
  const { layers, addLayer, getLayer, updateLayer, mount, saveHistory } =
    useDrawStore();
  const ref = useCanvasRef();
  const [id, setId] = useState<string | null>(null);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart((g) => {
      const newPath = createNewPath([`M ${g.x} ${g.y}`], "#000");
      const newLayer = createNewLayer(LayerType.Path, newPath);
      setId(newLayer.id);
      addLayer(newLayer);
    })
    .onUpdate((g) => {
      if (!id) return;

      const layer = getLayer(id);

      if (layer?.type !== LayerType.Path) return;

      const path = layer?.data;
      if (path.segments) {
        path.segments.push(`L ${g.x} ${g.y}`);
        updateLayer(id, layer);
      }
    })
    .onEnd((g) => {
      if (!id) return;

      const layer = getLayer(id);

      if (layer?.type !== LayerType.Path) return;

      const path = layer?.data;
      if (path.segments) {
        path.segments.push(`L ${g.x} ${g.y}`);
        updateLayer(id, layer);
      }
      saveHistory();
      setId(null);
    })
    .minDistance(0.5);

  useEffect(() => {
    if (ref.current) mount(ref);
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <Canvas style={{ flex: 1 }} ref={ref}>
          {layers.map((layer) => (
            <Path
              key={layer.id}
              path={layer.data?.segments.join(" ")}
              strokeWidth={5}
              style="stroke"
              color={layer.data?.color}
            />
          ))}
        </Canvas>
      </View>
    </GestureDetector>
  );
}
