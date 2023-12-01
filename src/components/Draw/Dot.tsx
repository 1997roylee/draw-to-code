import { Circle } from "react-native-svg";

export interface DotProps {
  x: number;
  y: number;
}

const Dot = ({ x, y }: DotProps) => (
  <Circle cx={x} cy={y} r={1} fill="#D9D9D9" />
);

export default Dot;
