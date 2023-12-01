// import { SkiaDomView } from "@shopify/react-native-skia";
import { SkiaDomView } from "@shopify/react-native-skia";
import { create } from "zustand";

import { TLayerType } from "@/utils/draw";

export interface IPath {
  segments: string[];
  color?: string;
}

export type Layer<T extends TLayerType> = {
  id: string;
  type: T;
  data: T extends "Path" ? IPath : any;
};

export type DrawState = {
  canvasRef: React.RefObject<SkiaDomView> | null;
  layers: Layer<TLayerType>[];
  history: Layer<TLayerType>[][];
};

export type DrawActions = {
  addLayer: (layer: Layer<TLayerType>) => void;
  updateLayer: (id: string, layer: Layer<TLayerType>) => void;
  getLayer: (id: string) => Layer<TLayerType> | null;
  getPaths: () => Layer<"Path">[];
  clear: () => void;
  mount: (canvasRef: React.RefObject<SkiaDomView>) => void;
  undo: () => void;
  saveHistory: () => void;
};

export type DrawStore = DrawState & DrawActions;

export const useDrawStore = create<DrawStore>((set, get) => ({
  layers: [],
  history: [],
  canvasRef: null,
  mount: (canvasRef: React.RefObject<SkiaDomView>) => {
    set(() => ({
      canvasRef,
      history: [],
    }));
  },
  addLayer: (layer) => {
    set((state) => ({
      layers: [...state.layers, layer],
    }));
  },
  getLayer: (id) => {
    const layer = get().layers.find((layer) => layer.id === id);
    if (!layer) return null;
    return layer;
  },
  updateLayer: (id, layer) => {
    set((state) => {
      const index = state.layers.findIndex((layer) => layer.id === id);
      const layers = [...state.layers];
      layers[index] = layer;

      // const history = [...state.history, state.layers];

      return {
        layers,
        // history,
      };
    });
  },
  getPaths: () => {
    return get().layers.filter(
      (layer) => layer.type === "Path",
    ) as Layer<"Path">[];
  },
  undo: () => {
    set((state) => {
      if (state.history.length === 0) return state; // No previous state to revert to

      const history = [...state.history];
      const layers = history.pop(); // Get the last state

      return {
        layers: Object.assign([], layers),
        history,
      };
    });
  },
  saveHistory: () => {
    set((state) => {
      const history = [...state.history, state.layers];
      return {
        history,
      };
    });
  },
  clear: () => {
    set(() => ({
      layers: [],
    }));
  },
}));

export default useDrawStore;
