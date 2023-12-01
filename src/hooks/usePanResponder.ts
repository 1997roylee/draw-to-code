import { useRef } from "react";
import {
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

export type PanResponderArgs = {
  onGrant?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => void;
  onMove?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => void;
  onRelease?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => void;
};

const usePanResponder = ({
  onGrant,
  onMove,
  onRelease,
}: PanResponderArgs): PanResponderInstance => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: onGrant,
      onPanResponderMove: onMove,
      onPanResponderRelease: onRelease,
    }),
  ).current;

  //   useEffect(() => {
  //     // Clean up pan responder when component unmounts
  //     return () => {
  //       panResponder.current?.panHandlers;
  //     };
  //   }, []);

  return panResponder;
};

export default usePanResponder;
