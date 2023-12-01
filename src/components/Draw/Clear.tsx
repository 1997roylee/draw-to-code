import { Button } from "../UI";

import useDrawStore from "@/stores/draw";

export default function Clear() {
  const { clear } = useDrawStore();
  return (
    <Button variant="square" onPress={clear}>
      Clear
    </Button>
  );
}
