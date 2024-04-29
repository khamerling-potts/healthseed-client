import { List, Divider, Text, Badge } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import InstructionChip from "./InstructionChip";

function RoutineComponent({ routine }) {
  const backgroundColors = {
    "any time": "green",
    morning: "yellow",
    afternoon: "red",
    evening: "indigo",
  };

  const badges = routine.times
    ? routine.times.map((time) => (
        <Badge
          key={uuidv4()}
          size={12}
          style={{ backgroundColor: backgroundColors[time] }}
        />
      ))
    : null;

  const medications = routine.instructions.map((instruction) => (
    <InstructionChip
      key={instruction.id}
      instruction={instruction}
      page={"routine"}
    />
  ));
  return (
    <List.Accordion left={(props) => badges} title={routine.title}>
      <List.Item title={routine.notes} />
      {medications}
    </List.Accordion>
  );
}

export default RoutineComponent;
