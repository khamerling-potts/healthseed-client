import { ScrollView, View } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { RoutinesContext } from "../context/routines";
import { useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { InstructionsContext } from "../context/instructions";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";

function RoutineForm({ setRoutineFormVisible, setFABExtended }) {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const { instructions } = useContext(InstructionsContext);
  const [dropDownValue, setDropDownValue] = useState([]);

  const [instructionsList, setInstructionsList] = useState(
    assignInstructionsList(instructions)
  );
  const [showDropDown, setShowDropDown] = useState(false);

  function assignInstructionsList(instructions) {
    console.log(instructions);
    const newList = [];
    for (const instruction of instructions) {
      console.log(instruction);
      // if no routine id, the instruction is available to be selected
      if (!instruction.routine_id) {
        newList.push({
          label: `${instruction.medication.name} (${instruction.dose}, ${instruction.time})`,
          value: `${instruction.id}`,
        });
      }
    }
    return newList;
    // setInstructionsList(newList);
  }

  //   useEffect(() => {
  //     assignInstructionsList(instructions);
  //   }, []);

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

  return (
    <View style={{ borderWidth: 1, borderColor: "red", height: "100%" }}>
      <ScrollView>
        <Formik
          initialValues={{
            title: "",
            notes: "",
            // instruction_ids: [],
          }}
          validate={validate}
          onSubmit={(values, { resetForm }) => {
            const configObj = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                { ...values, instruction_ids: dropDownValue },
                null,
                2
              ),
            };
            fetch(`http://127.0.0.1:5555/routines`, configObj).then((r) => {
              if (r.ok) {
                r.json().then((routine) => {
                  console.log(routine);
                  setRoutines([...routines, routine]);
                  setRoutineFormVisible(false);
                  setFABExtended(true);
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
              />
              <HelperText
                visible={touched.notes && errors.notes}
                type="error"
                style={styles.helperText}
              >
                {errors.notes}
              </HelperText>
              <DropDownPicker
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
              <Button onPress={handleSubmit}>Save</Button>

              {/* <DropDown
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
                /> */}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default RoutineForm;
