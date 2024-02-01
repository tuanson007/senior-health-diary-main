import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import * as SCREENS_NAME from "../../constants/screensName";
import { useNavigation } from "@react-navigation/native";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { login, unmounteAuth } from "../../store/auth/authSlice";
import { SUCCEEDED } from "../../constants/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  const handleLogin = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const handleLoginGoogle = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };
  const handleGoMain = () => {
    navigation.navigate(SCREENS_NAME.mainTab);
  };

  const handleGoToSignUp = () => {
    navigation.navigate(SCREENS_NAME.signUp);
  };

  const fields = [
    {
      name: "email",
      placeholder: "Địa chỉ email",
      value: "",
      type: "email",
      label: "Địa chỉ email",
      isRequired: true,
    },
    {
      name: "password",
      placeholder: "Mật khẩu",
      type: "password",
      value: "",
      label: "Mật khẩu",
      minLength: 6,
      isRequired: true,
    },
  ];
  useEffect(() => {
    if (token && token !== "" && status === SUCCEEDED) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS_NAME.mainTab }],
      });
    }
    return () => {
      dispatch(unmounteAuth());
    };
  }, [token, status]);

  return (
    <View className="bg-white h-full w-full flex justify-center items-center space-y-2">
      <Image
        source={require("../../../assets/images/logo.jpg")}
        style={{ width: 200, height: 200 }}
      />

      <Text className="pb-4 text-2xl uppercase">{STRINGS.appName}</Text>

      <View className="w-[90%]">
        <GeneralForm
          fields={fields}
          handleData={handleLogin}
          titleSubmitBtn={STRINGS.signIn}
        />
        <CustomizeButton title={STRINGS.notLoginBtn} onPress={handleGoMain} />
        <GoogleButton onPress={handleLoginGoogle} />
      </View>
      <View className="w-[90%] flex flex-row justify-between py-5 ">
        <Text className="text-blue-500">{STRINGS.forgotPassword}</Text>
        <TouchableOpacity onPress={handleGoToSignUp}>
          <Text className="text-blue-500">{STRINGS.signUp}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
