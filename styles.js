import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "cyan",
    backgroundColor: "white",
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
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  pageHeader: {
    headerStyle: {
      backgroundColor: "#597683",
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
      shadowOffset: { width: 0, height: -2 },
      shadowColor: "#000000",
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    headerTitleStyle: {
      color: "#ffffff",
    },
    headerShadowVisible: true,
  },
  homeScrollView: {
    backgroundColor: "white",

    // maxHeight: "95%",
    // borderWidth: 1,
    // maxWidth: "90%",
    // borderColor: "red",
  },
  homePageButton: {
    alignSelf: "flex-end",
    marginTop: 0,
  },
  calendar: {
    // borderTopLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: windowWidth * 0.9,
    margin: 10,
  },
  calendarTheme: {
    backgroundColor: "#ffffff",
    calendarBackground: "#fafafa",
    textSectionTitleColor: "#886F66",
    selectedDayBackgroundColor: "#886F66",
    selectedDayTextColor: "white",
    todayTextColor: "#886F66",
    dotColor: "#886F66",
    selectedDotColor: "white",
    arrowColor: "#886F66",
    textDayHeaderFontWeight: "bold",
    // dayTextColor: "#FF4125",
  },
  homeRoutines: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  homeRoutinesText: {
    color: "#2d4150",
  },
  homeRoutinePreviews: {
    marginBottom: 10,
    padding: 5,
    width: "100%",
    backgroundColor: "#fafafa",
  },
  buttonContainer: {
    margin: 10,
  },
  link: {
    color: "blue",
    margin: 10,
  },
  loginForm: {
    // margin: 10,
    borderRadius: "5",
    width: "90%",
    marginTop: 5,
    backgroundColor: "white",
  },
  card: {
    margin: 10,
    // alignContent: "center",
  },
  homeApptCard: {
    margin: 10,
    marginTop: 0,
    width: windowWidth * 0.9,
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
  conditionsScrollView: {
    maxHeight: "95%",
    maxWidth: "95%",
  },
  profileTopView: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  profileBottomView: {
    backgroundColor: "#fafafa",
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "space-around",
    alignItems: "center",
  },
  userInfoView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    height: "40%",
  },
  profileDivider: {
    width: "95%",
    height: 3,
    color: "#fafafa",
  },
  userInfoLine: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    padding: 10,
  },
  userInfoText: {
    fontWeight: "bold",
    color: "#525451",
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
    marginVertical: 20,
    width: "100%",
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
    // borderWidth: 1,
    width: windowWidth * 0.9,
  },
  apptFilterButton: {
    width: "90%",
    marginTop: 30,
    marginBottom: 10,
  },
  apptCard: {
    // necessary to fill entire width of component
    width: windowWidth * 0.9,
    paddingLeft: 0,
    borderWidth: 1,
    margin: 10,
  },
  providerCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  providerCardInfo: {
    justifyContent: "space-around",
    width: "85%",
  },
  providerTextView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  providerText: {
    marginLeft: 2,
    flex: 1,
    flexWrap: "wrap",
  },
  apptCardView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  apptDateView: {
    padding: 10,
    backgroundColor: "#374E5B",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
  homeApptCardInfo: {
    width: "60%",
    justifyContent: "center",
    // backgroundColor: "#F2F4F6",
  },
  homeHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  homeApptDateView: {
    padding: 10,
    backgroundColor: "#374E5B",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    width: "40%",
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
    // backgroundColor: "#F2F4F6",
  },
  formScrollView: {
    // maxWidth: "100%",
    width: windowWidth * 0.9,
    padding: 10,
  },
  formView: { alignItems: "center" },
  saveButton: {
    backgroundColor: "#4D564F",
    width: "80%",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#F2F7F6",
    width: "80%",
  },
});

export default styles;
