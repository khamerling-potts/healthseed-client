import { StyleSheet } from "react-native";

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
    marginHorizontal: 16,
    marginTop: 16,
    alignContent: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
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
    alignItems: "center",
    alignSelf: "center",
  },
  addFAB: {
    bottom: 20,
    right: 20,
    position: "absolute",
  },
});

export default styles;
