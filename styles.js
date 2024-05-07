import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 10,
  },
  link: {
    color: "blue",
    margin: 10,
  },
  loginForm: {
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  card: {
    margin: 10,
    // alignContent: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardTitle: {
    flexShrink: 1,
    margin: "auto",
    textAlign: "center",
  },
  formModal: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    height: "40%",
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignSelf: "center",
  },
  medicationsPage: {
    flex: 1,
    alignItems: "center",
  },
  addFAB: {
    bottom: 20,
    right: 20,
    position: "absolute",
  },
  medicationsScrollView: {
    maxHeight: "95%",
    borderWidth: 1,
    maxWidth: "90%",
  },
  instructionChipsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 0,
  },
  instructionChip: {
    margin: 4,
  },
  helperText: {
    padding: 0,
    margin: 0,
  },
  timeDropDown: {
    marginHorizontal: 10,
  },
  dosageInput: {
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
  },
  medicationName: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  editMedicationInput: {
    backgroundColor: "transparent",
    marginLeft: 0,
  },
  routinesScrollView: {
    maxHeight: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    marginTop: 10,
  },
  routinesPage: {
    flex: 1,
    alignItems: "center",
    // alignContent: "center",
    borderWidth: 1,
    borderColor: "blue",
  },
  routineAccordion: {
    // necessary to fill entire width of component
    width: windowWidth * 0.9,
    paddingLeft: 0,
    borderWidth: 1,
    // borderColor: "violet",
  },
  routineItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  segmentedButtons: {},
  badgesView: {
    justifyContent: "center",
    marginLeft: 10,
  },
  apptsScrollView: {
    maxHeight: "90%",
    borderWidth: 1,
    width: windowWidth * 0.9,
  },
  apptCard: {
    // necessary to fill entire width of component
    width: windowWidth * 0.9,
    paddingLeft: 0,
    borderWidth: 1,
    margin: 10,
  },
  apptDateView: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#443850",
    alignItems: "center",
  },
  apptDateText: {
    color: "white",
  },
  apptTimeText: {
    color: "white",
    marginLeft: 2,
  },
  apptCardInfo: {
    justifyContent: "space-around",
  },
});

export default styles;
