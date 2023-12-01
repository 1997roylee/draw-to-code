import { SkImage } from "@shopify/react-native-skia";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface CanvasContext {
  makeImageSnapshot: () => SkImage;
}

export const CanvasContext = createContext<CanvasContext>({
  makeImageSnapshot: () => {
    throw new Error("CanvasContext not implemented");
  },
});

export type CanvasProviderProps = PropsWithChildren & {
  makeImageSnapshot: () => SkImage;
};

export const CanvasProvider = ({
  children,
  makeImageSnapshot,
}: CanvasProviderProps) => {
  return (
    <CanvasContext.Provider value={{ makeImageSnapshot }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const canvas = useContext(CanvasContext);

  if (!canvas) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return canvas;
};
