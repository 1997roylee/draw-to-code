import * as Haptics from "expo-haptics";
import { PropsWithChildren, useCallback } from "react";
import {
  Pressable,
  View,
  ButtonProps as NativeButtonProps,
  GestureResponderEvent,
  Text,
  StyleSheet,
} from "react-native";

export type ButtonProps = PropsWithChildren &
  Omit<NativeButtonProps, "title"> & {
    variant?: "normal" | "square";
  };

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  normalVariant: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: "rgb(242, 244, 245)",
  },
  squareVariant: {
    borderRadius: 12,
    height: 64,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    backgroundColor: "rgb(242, 244, 245)",
  },
});

export default function Button({
  children,
  onPress,
  variant = "normal",
}: ButtonProps) {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress?.(event);
    },
    [onPress],
  );

  return (
    <Pressable
      onPress={handlePress}
      style={variant === "normal" ? styles.normalVariant : styles.squareVariant}
    >
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}
