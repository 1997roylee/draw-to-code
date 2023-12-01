import { memo, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg from "react-native-svg";

import Dot from "./Draw/Dot";

function Background() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [layout, setLayout] = useState({
    rows: 0,
    columns: 0,
  });

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const rows = event.nativeEvent.layout.width / 16;
    const columns = event.nativeEvent.layout.height / 16;
    setLayout({
      rows: Math.floor(rows),
      columns: Math.floor(columns),
    });
    setSize({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  return (
    <View
      onLayout={handleOnLayout}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Svg
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        fill="none"
      >
        {Array.from({ length: layout.rows }).map((_, rowIndex) => {
          return Array.from({ length: layout.columns }).map((_, colIndex) => {
            return (
              <Dot
                key={`${rowIndex}_${colIndex}`}
                x={rowIndex * 16}
                y={colIndex * 16}
              />
            );
          });
        })}
      </Svg>
    </View>
  );
}

export default memo(Background);
