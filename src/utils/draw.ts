import { v4 as uuidv4 } from "uuid";

export enum LayerType {
  Path = "Path",
  Image = "Image",
}

export type TLayerType = keyof typeof LayerType;

export const createNewLayer = (type: TLayerType, data: any) => {
  return {
    id: uuidv4(),
    type,
    data,
  };
};

export const createNewPath = (segments: string[], color?: string) => {
  return {
    segments,
    color,
  };
};
