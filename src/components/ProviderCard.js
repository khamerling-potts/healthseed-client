import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  IconButton,
  Menu,
  Text,
  Icon,
  Divider,
} from "react-native-paper";
import { ProvidersContext } from "../context/providers";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";
import { View } from "react-native";
import { AppointmentsContext } from "../context/appointments";

function ProviderCard({
  provider,
  setFABExtended,
  setProviderFormVisible,
  setCurrentProvider,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { providers, setProviders } = useContext(ProvidersContext);
  const { fetchAppointments } = useContext(AppointmentsContext);
  const id = provider.id;

  function onDeleteProvider() {
    fetch(
      `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/providers/${provider.id}`,
      {
        method: "DELETE",
      }
    ).then((r) => {
      if (r.ok) {
        setProviders(providers.filter((provider) => provider.id !== id));

        //must refetch appointments to reflect change in providers. associated appts are deleted.
        fetchAppointments();
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  function handleEditProvider(editedProvider) {
    const updatedProviders = providers.filter(
      (provider) => provider.id !== editedProvider.id
    );
    setProviders([...updatedProviders, editedProvider]);
  }

  return (
    <Card style={styles.card}>
      <View style={styles.providerCardView}>
        <View style={styles.providerCardInfo}>
          <View style={styles.providerTextView}>
            <Icon source="doctor" size={15} />
            <Text
              numberOfLines={0}
              variant="titleMedium"
              style={styles.providerText}
            >
              {provider.name}
            </Text>
          </View>
          <Divider />

          <View style={{ ...styles.providerTextView, marginLeft: 5 }}>
            <Icon source="phone" size={15} />
            <Text
              numberOfLines={0}
              variant="titleSmall"
              style={styles.providerText}
            >
              {provider.phone}
            </Text>
          </View>

          <View style={{ ...styles.providerTextView, marginLeft: 5 }}>
            <Icon source="map-marker" size={15} />
            <Text
              numberOfLines={0}
              variant="titleSmall"
              style={styles.providerText}
            >
              {provider.address}
            </Text>
          </View>
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
                setProviderFormVisible(true);
                setFABExtended(false);
                setCurrentProvider(provider);
              }}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => onDeleteProvider()}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
      </View>
    </Card>
  );
}

export default ProviderCard;
