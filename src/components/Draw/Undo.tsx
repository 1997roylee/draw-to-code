import { Button } from "../UI";

import useDrawStore from "@/stores/draw";

export default function Undo() {
  const { undo } = useDrawStore();

  return (
    <Button onPress={undo} variant="square">
      Undo
    </Button>
  );
}
