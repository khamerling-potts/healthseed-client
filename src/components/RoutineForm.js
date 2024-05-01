import { ScrollView, View } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  SegmentedButtons,
  Text,
  Badge,
} from "react-native-paper";
import { RoutinesContext } from "../context/routines";
import { useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { InstructionsContext } from "../context/instructions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";

function RoutineForm({ setRoutineFormVisible, setFABExtended, routine }) {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const { setInstructions } = useContext(InstructionsContext);
  const { instructions } = useContext(InstructionsContext);
  const [dropDownValue, setDropDownValue] = useState(
    routine && routine.instructions
      ? routine.instructions.map((instruction) => `${instruction.id}`)
      : []
  );
  const [times, setTimes] = useState(routine ? routine.times : ["any time"]);
  const [instructionsList, setInstructionsList] = useState(
    assignInstructionsList(instructions)
  );
  const [showDropDown, setShowDropDown] = useState(false);

  //conditionally assigning fetch properties based on whether adding or editing routine
  const URL = routine
    ? `http://127.0.0.1:5555/routines${"/" + routine.id}`
    : `http://127.0.0.1:5555/routines`;
  const method = routine ? "PATCH" : "POST";

  function assignInstructionsList(instructions) {
    const newList = [];
    for (const instruction of instructions) {
      //   if editing (rather than adding) a routine, prepopulate with
      //   existing instructions

      // if no routine id, the instruction is available to be selected
      if (
        !instruction.routine_id ||
        (routine && instruction.routine_id === routine.id)
      ) {
        newList.push({
          label: `${instruction.medication.name} (${instruction.dose}, ${instruction.time})`,
          value: `${instruction.id}`,
        });
      }
    }
    // setInstructionsList(newList);
    return newList;
  }

  const validate = (values) => {
    const errors = {};
    // title validation
    if (!values.title) {
      errors.title = "Required";
    }
    // description validation
    if (!values.notes) {
      errors.notes = "Required";
    }
    return errors;
  };

  function handleEditRoutine(editedRoutine) {
    const updatedRoutines = routines.filter(
      (routine) => routine.id !== editedRoutine.id
    );
    setRoutines([...updatedRoutines, editedRoutine]);
  }

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <Formik
          initialValues={{
            title: routine ? routine.title : "",
            notes: routine ? routine.notes : "",
          }}
          validate={validate}
          onSubmit={(values, { resetForm }) => {
            const configObj = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                { ...values, instruction_ids: dropDownValue, times: times },
                null,
                2
              ),
            };
            fetch(URL, configObj).then((r) => {
              if (r.ok) {
                r.json().then((routine) => {
                  if (method === "POST") {
                    setRoutines([...routines, routine]);
                  } else {
                    handleEditRoutine(routine);
                  }
                  setRoutineFormVisible(false);
                  setFABExtended(true);
                  //Must also set instructions state bc routine ids were modified
                  fetch("http://127.0.0.1:5555/instructions")
                    .then((r) => r.json())
                    .then((instructions) => setInstructions(instructions));
                  resetForm();
                });
              } else {
                r.json().then((err) => console.log(err));
              }
            });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                placeholder="Routine title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              <HelperText
                visible={touched.title && errors.title}
                type="error"
                style={styles.helperText}
              >
                {errors.title}
              </HelperText>
              <TextInput
                placeholder="Description of your routine"
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
                value={values.notes}
                multiline
              />
              <HelperText
                visible={touched.notes && errors.notes}
                type="error"
                style={styles.helperText}
              >
                {errors.notes}
              </HelperText>
              <DropDownPicker
                placeholder="Add medication instructions"
                open={showDropDown}
                value={dropDownValue}
                items={instructionsList}
                setOpen={setShowDropDown}
                setValue={setDropDownValue}
                setItems={setInstructionsList}
                multiple={true}
                mode="BADGE"
                extendableBadgeContainer={true}
                badgeDotColors={[
                  "#e76f51",
                  "#00b4d8",
                  "#e9c46a",
                  "#e76f51",
                  "#8ac926",
                  "#00b4d8",
                  "#e9c46a",
                ]}
                listMode="SCROLLVIEW"
              />
              <SegmentedButtons
                value={times}
                onValueChange={(val) => {
                  // Not allowing 'any time' to be selected with other options
                  const indexOfAnyTime = val.indexOf("any time");
                  if (indexOfAnyTime === 0 && val.length > 1) {
                    val.splice(0, 1);
                    setTimes([...val]);
                  } else if (indexOfAnyTime > 0) {
                    // if 'any time' was just selected, unselect others
                    setTimes(["any time"]);
                  } else if (!val.length) {
                    setTimes(["any time"]);
                  } else {
                    setTimes(val);
                  }
                }}
                multiSelect
                buttons={[
                  {
                    icon: "circle",
                    value: "any time",
                    label: "Any time",
                    showSelectedCheck: true,
                    checkedColor: "green",
                    uncheckedColor: "green",
                  },
                  {
                    icon: "circle",
                    value: "morning",
                    label: "Morning",
                    showSelectedCheck: true,
                    checkedColor: "goldenrod",
                    uncheckedColor: "goldenrod",
                  },
                  {
                    icon: "circle",
                    value: "afternoon",
                    label: "Afternoon",
                    showSelectedCheck: true,
                    checkedColor: "indianred",
                    uncheckedColor: "indianred",
                  },
                  {
                    icon: "circle",
                    value: "evening",
                    label: "Evening",
                    showSelectedCheck: true,
                    checkedColor: "indigo",
                    uncheckedColor: "indigo",
                  },
                ]}
              />
              <Button onPress={handleSubmit}>Save</Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default RoutineForm;

/* <DropDown
                  label="Select medication instructions"
                  mode="outlined"
                  value={values.instruction_ids}
                  setValue={handleChange("instruction_ids")}
                  onBlur={handleBlur("time1")}
                  list={instructionsList}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  inputProps={{ style: styles.timeDropDown }}
                  multiSelect
                /> */
