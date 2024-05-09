import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { ProvidersContext } from "../context/providers";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

function ProviderCard({
  provider,
  setFABExtended,
  setProviderFormVisible,
  setCurrentProvider,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { providers, setProviders } = useContext(ProvidersContext);
  const id = provider.id;

  function onDeleteProvider() {
    fetch(`http://127.0.0.1:5555/providers/${provider.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setProviders(providers.filter((provider) => provider.id !== id));
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
    <>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Card.Title
            title={provider.name}
            subtitle={`${provider.phone}\n${provider.address}`}
            subtitleNumberOfLines={0}
            right={(props) => (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <IconButton
                    {...props}
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
                />
                <Menu.Item onPress={() => onDeleteProvider()} title="Delete" />
              </Menu>
            )}
          />
        </Card.Content>
      </Card>
    </>
  );
}

export default ProviderCard;

{
  /* <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <TextInput
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          <TextInput
            onChangeText={formik.handleChange("address")}
            onBlur={formik.handleBlur("address")}
            value={formik.values.address}
          />
          <TextInput
            onChangeText={formik.handleChange("countryCode")}
            onBlur={formik.handleBlur("countryCode")}
            value={formik.values.countryCode}
            left={<TextInput.Icon icon="plus" />}
          />
          <TextInput
            onChangeText={formik.handleChange("phone")}
            onBlur={formik.handleBlur("phone")}
            value={formik.values.phone}
          />
          <Button onPress={formik.handleSubmit}>Save</Button>
        </Modal>
      </Portal> */
}

// const formik = useFormik({
//   initialValues: {
//     name: provider.name,
//     address: provider.address,
//     countryCode: parsePhoneNumber(provider.phone).countryCallingCode,
//     phone: parsePhoneNumber(provider.phone).nationalNumber,
//   },
//   validationSchema: Yup.object({
//     //Add phone validation here
//     name: Yup.string().required("Name required"),
//   }),
//   onSubmit: (values) => {
//     const configObj = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(
//         {
//           ...values,
//           phone: "+" + values.countryCode + values.phone,
//         },
//         null,
//         2
//       ),
//     };
//     fetch(`http://127.0.0.1:5555/providers/${provider.id}`, configObj).then(
//       (r) => {
//         if (r.ok) {
//           r.json().then((provider) => {
//             console.log(provider);
//             handleEditProvider(provider);
//             setModalVisible(false);
//           });
//         } else {
//           r.json().then((err) => console.log(err));
//         }
//       }
//     );
//   },
// });
