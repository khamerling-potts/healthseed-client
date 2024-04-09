import React, { useContext } from "react";
import { Button, TextInput, View } from "react-native";
import { Formik, useFormik } from "formik";
import { UserContext } from "../context/user";
import * as Yup from "yup";

function LoginForm() {
  const currentUser = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
  });
  return <></>;
}
