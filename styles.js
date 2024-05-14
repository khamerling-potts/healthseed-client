import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "cyan",
    backgroundColor: "#ffffff",
  },
  landingContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  landingButton: {
    backgroundColor: "#597683",
    width: "90%",
    marginTop: 10,
  },
  landingKeyboardAvoidingView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  landingPageSurface: {
    padding: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    minHeight: "20%",
    width: "80%",
  },
  landingText: {
    textAlign: "center",
    color: "#443850",
  },
  birthdayPicker: {
    height: 50,
  },
  nav: {
    backgroundColor: "#597683",
  },
  pageHeader: {
    headerStyle: {
      backgroundColor: "#597683",
    },
    headerTitleStyle: {
      color: "#ffffff",
    },
  },
  homeScrollView: {
    // maxHeight: "95%",
    // borderWidth: 1,
    // maxWidth: "90%",
    // borderColor: "red",
  },
  calendar: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: windowWidth * 0.9,
    margin: 10,
  },
  calendarTheme: {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: "#2d4150",
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
    borderRadius: "5",
    width: "90%",
    margin: 5,
    backgroundColor: "white",
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
    marginTop: 10,
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
  providersScrollView: {
    maxHeight: "95%",
    borderWidth: 1,
    maxWidth: "90%",
  },
  routinesScrollView: {
    maxHeight: "90%",
    maxWidth: "90%",
    borderWidth: 1,
    marginTop: 10,
  },
  routinesPage: {
    flex: 1,
    alignItems: "center",
    // alignContent: "center",
    // borderWidth: 1,
    // borderColor: "blue",
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
    maxHeight: "95%",

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
  apptCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  apptDateView: {
    padding: 10,
    backgroundColor: "#443850",
    alignItems: "center",
    width: "30%",
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
    width: "55%",
  },
  apptText: {
    marginLeft: 2,
    flex: 1,
    flexWrap: "wrap",
  },
  apptTextView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  formScrollView: {
    borderWidth: 1,
    // maxWidth: "100%",
    width: windowWidth * 0.9,

    borderColor: "pink",
  },
});

export default styles;
