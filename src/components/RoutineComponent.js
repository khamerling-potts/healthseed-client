import { List, Divider, Text, Badge, Button } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import InstructionChip from "./InstructionChip";
import styles from "../../styles";
import { View } from "react-native";

function RoutineComponent({
  routine,
  setFABExtended,
  setRoutineFormVisible,
  setCurrentRoutine,
}) {
  const backgroundColors = {
    "any time": "green",
    morning: "goldenrod",
    afternoon: "indianred",
    evening: "indigo",
  };

  const badges = routine.times
    ? routine.times.map((time) => (
        <Badge
          key={uuidv4()}
          size={12}
          style={{ backgroundColor: backgroundColors[time], marginVertical: 2 }}
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
    <List.Accordion
      left={(props) => <View style={styles.badgesView}>{badges}</View>}
      title={routine.id + routine.title}
      style={styles.routineAccordion}
      titleNumberOfLines={0}
    >
      <List.Item
        title={routine.notes}
        titleNumberOfLines={0}
        style={styles.routineItem}
      />
      <View style={styles.instructionChipsView}>{medications}</View>
      <View style={styles.routineButtonsView}>
        <Button
          onPress={() => {
            setCurrentRoutine(routine);
            setFABExtended(false);
            setRoutineFormVisible(true);
          }}
        >
          Edit
        </Button>
        <Button>Delete</Button>
      </View>
    </List.Accordion>
  );
}

export default RoutineComponent;
