import React, { useContext } from "react";
import { useState } from "react";
import styles from "../../styles";
import { View } from "react-native";
import { Card, Icon, IconButton, Menu, Text } from "react-native-paper";
import AppointmentForm from "./AppointmentForm";
import { AppointmentsContext } from "../context/appointments";

function HomeAppointmentCard({ appointment }) {
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
  const monthString = months[date.getMonth()].slice(0, 3);
  yearString = date.getFullYear();
  const timeString = date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const apptIcons = {
    Vision: "eye",
    Medical: "stethoscope",
    "Fitness/Wellness": "flower",
    "Mental Health": "brain",
    Dental: "tooth-outline",
    Other: "square-outline",
    Provider: "doctor",
    Location: "map-marker",
  };

  return (
    <>
      <Card style={styles.homeApptCard}>
        <View style={styles.apptCardView}>
          <View style={styles.homeApptDateView}>
            <Text
              numberOfLines={0}
              style={styles.apptDateText}
              variant="titleSmall"
            >
              {`${monthString} ${dayString}, ${yearString}`}
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

          <View style={styles.homeApptCardInfo}>
            <View style={styles.apptTextView}>
              <Icon source={apptIcons[appointment.category]} size={15} />
              <Text
                numberOfLines={0}
                variant="titleSmall"
                style={styles.apptText}
              >
                {appointment.category}
              </Text>
            </View>

            <View style={styles.apptTextView}>
              <Icon source={apptIcons["Provider"]} size={15} />
              <Text
                numberOfLines={0}
                variant="titleSmall"
                style={styles.apptText}
              >
                {appointment.provider
                  ? appointment.provider.name
                  : "No provider specified"}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </>
  );
}

export default HomeAppointmentCard;
