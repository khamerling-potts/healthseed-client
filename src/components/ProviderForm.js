import { ScrollView, View } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  SegmentedButtons,
  Text,
  Badge,
  Icon,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";
import { ProvidersContext } from "../context/providers";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

function ProviderForm({ setProviderFormVisible, setFABExtended, provider }) {
  const { providers, setProviders } = useContext(ProvidersContext);

  //conditionally assigning fetch properties based on whether adding or editing provider
  const URL = provider
    ? `http://127.0.0.1:5555/providers${"/" + provider.id}`
    : `http://127.0.0.1:5555/providers`;
  const method = provider ? "PATCH" : "POST";

  function handleEditProvider(editedProvider) {
    const updatedProviders = providers.filter(
      (provider) => provider.id !== editedProvider.id
    );
    setProviders([...updatedProviders, editedProvider]);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name required";
    }
    if (!values.address) {
      errors.address = "Address required";
    }
    if (!values.phone || !values.countryCode) {
      errors.phone = "Phone number and country code required";
      errors.countryCode = "Phone number and country code required";
    }
    if (
      !isPossiblePhoneNumber("+" + values.countryCode + values.phone) ||
      !isValidPhoneNumber("+" + values.countryCode + values.phone)
    ) {
      errors.phone = "Please enter a valid phone number/country code";
      errors.countryCode = "Please enter a valid phone number/country code";
    }
    return errors;
  };

  return (
    <View style={styles.formView}>
      <ScrollView style={styles.formScrollView}>
        <Formik
          initialValues={{
            name: provider ? provider.name : "",
            address: provider ? provider.address : "",
            countryCode: provider
              ? parsePhoneNumber(provider.phone).countryCallingCode
              : "",
            phone: provider
              ? parsePhoneNumber(provider.phone).nationalNumber
              : "",
          }}
          validate={validate}
          onSubmit={(values) => {
            const configObj = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {
                  ...values,
                  phone: "+" + values.countryCode + values.phone,
                },
                null,
                2
              ),
            };
            fetch(URL, configObj).then((r) => {
              if (r.ok) {
                r.json().then((provider) => {
                  if (method === "POST") {
                    setProviders([...providers, provider]);
                  } else {
                    handleEditProvider(provider);
                  }
                  setProviderFormVisible(false);
                  setFABExtended(true);
                  console.log(provider);
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
            <View style={{ alignItems: "center" }}>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Provider name"
                style={{ width: "100%" }}
              ></TextInput>
              <HelperText
                visible={!!(touched.name && errors.name)}
                type="error"
                style={styles.helperText}
              >
                {errors.name}
              </HelperText>
              <TextInput
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                label="Provider address"
                style={{ width: "100%" }}
              ></TextInput>
              <HelperText
                visible={!!(touched.address && errors.address)}
                type="error"
                style={styles.helperText}
              >
                {errors.address}
              </HelperText>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextInput
                  keyboardType="phone-pad"
                  onChangeText={handleChange("countryCode")}
                  onBlur={handleBlur("countryCode")}
                  value={values.countryCode}
                  label="Country code"
                  // {
                  //   <Text style={{ fontSize: 16 }} numberOfLines={0}>
                  //     Country code
                  //   </Text>
                  // }
                  style={{ width: "40%" }}
                />
                <TextInput
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  label="Phone number"
                  style={{ width: "60%" }}
                ></TextInput>
                {/* <HelperText
                  visible={!!(touched.phone && errors.phone)}
                  type="error"
                  style={styles.helperText}
                >
                  {errors.phone}
                </HelperText> */}
              </View>
              <HelperText
                visible={
                  !!(touched.countryCode && errors.countryCode) ||
                  !!(touched.phone && errors.phone)
                }
                type="error"
                style={styles.helperText}
              >
                {errors.countryCode}
              </HelperText>

              <Button
                onPress={handleSubmit}
                style={styles.saveButton}
                textColor="#fafafa"
              >
                Save
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default ProviderForm;
