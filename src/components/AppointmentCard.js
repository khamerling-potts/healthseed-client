import React, { useContext } from "react";
import { useState } from "react";
import styles from "../../styles";
import { View } from "react-native";
import { Card, Icon, IconButton, Menu, Text } from "react-native-paper";
import AppointmentForm from "./AppointmentForm";
import { AppointmentsContext } from "../context/appointments";

function AppointmentCard({
  appointment,
  setApptFormVisible,
  setFABExtended,
  setCurrentAppt,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const date = new Date(appointment.datetime + "Z");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayString = date.getDate();
  const monthString = months[date.getMonth()];
  const timeString = date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  function onDeleteAppt() {
    fetch(`http://127.0.0.1:5555/appointments/${appointment.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((instructions) => {
          setAppointments(
            appointments.filter((appt) => appt.id !== appointment.id)
          );
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <>
      <Card style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.apptDateView}>
            <Text
              numberOfLines={0}
              style={styles.apptDateText}
              variant="headlineSmall"
            >
              {dayString}
            </Text>
            <Text
              numberOfLines={0}
              style={styles.apptDateText}
              variant="headlineSmall"
            >
              {monthString}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Icon source={"clock"} color="white" size={15} />
              <Text style={styles.apptTimeText} variant="titleSmall">
                {timeString}
              </Text>
            </View>
          </View>

          <View style={styles.apptCardInfo}>
            <Text numberOfLines={0} variant="bodyLarge">
              {appointment.category}
            </Text>
            <Text numberOfLines={0} variant="bodyLarge">
              {appointment.provider.name}
            </Text>
            <Text numberOfLines={0} variant="bodyLarge">
              {appointment.location}
            </Text>
          </View>

          <View>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => {
                    setMenuVisible(true);
                  }}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  setMenuVisible(false);
                  setApptFormVisible(true);
                }}
                title="Edit"
              />
              <Menu.Item onPress={() => onDeleteAppt()} title="Delete" />
            </Menu>
          </View>
        </View>
      </Card>
    </>
  );
}

export default AppointmentCard;
