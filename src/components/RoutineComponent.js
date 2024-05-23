import { List, Divider, Text, Badge, Button } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import InstructionChip from "./InstructionChip";
import styles from "../../styles";
import { View } from "react-native";
import { useContext } from "react";
import { InstructionsContext } from "../context/instructions";
import { RoutinesContext } from "../context/routines";

function RoutineComponent({
  routine,
  setFABExtended,
  setRoutineFormVisible,
  setCurrentRoutine,
}) {
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const { routines, setRoutines } = useContext(RoutinesContext);
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
      page={"routines"}
    />
  ));

  // Deletes a routine from the server and updates instructions and routines state
  function onDeleteRoutine() {
    fetch(`http://127.0.0.1:5555/routines/${routine.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((instructions) => {
          setInstructions(instructions);
          setRoutines(routines.filter((r) => r.id !== routine.id));
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }
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
      <View
        style={{
          ...styles.instructionChipsView,
          backgroundColor: "#FDFCFA",
        }}
      >
        {medications}
      </View>
      <View style={styles.routineButtonsView}>
        <Button onPress={() => onDeleteRoutine()}>Delete</Button>
        <Button
          onPress={() => {
            setCurrentRoutine(routine);
            setFABExtended(false);
            setRoutineFormVisible(true);
          }}
          style={{ borderWidth: 1, borderColor: "black" }}
        >
          Edit
        </Button>
      </View>
    </List.Accordion>
  );
}

export default RoutineComponent;
