import { Image, ScrollView, Text, View } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as STRINGS from "../../constants/strings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { login, signUp } from "../../store/auth/authSlice";
import { SUCCEEDED } from "../../constants/store";
import * as SCREENS_NAME from "../../constants/screensName";

function SignUpScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  const handleSignUp = (values) => {
    dispatch(
      signUp({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        telephone: values.telephone,
        password: values.password,
        confirm: values.confirm,
      })
    );
  };

  const handleBack = () => {
    navigation.goBack();
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
      name: "firstname",
      placeholder: "Họ",
      value: "",
      type: "text",
      label: "Họ",
      isRequired: true,
    },
    {
      name: "lastname",
      placeholder: "Tên và Tên lót",
      value: "",
      type: "text",
      label: "Tên và Tên lót",
      isRequired: true,
    },
    {
      name: "telephone",
      placeholder: "Điện thoại",
      value: "",
      type: "text",
      label: "Điện thoại",
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
    {
      name: "confirm",
      placeholder: "Nhập lại mật khẩu",
      type: "password",
      value: "",
      label: "Nhập lại mật khẩu",
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
  }, [token, status]);

  return (
    <ScrollView className="bg-white">
      <View className="w-full flex justify-center items-center space-y-2">
        <Image
          source={require("../../../assets/images/logo.jpg")}
          style={{ width: 200, height: 200 }}
        />

        <Text className="pb-4 text-2xl uppercase">{STRINGS.signUp}</Text>

        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            handleData={handleSignUp}
            titleSubmitBtn={STRINGS.save}
            isSmall={true}
          />
          <View className="flex flex-row justify-start py-5 ">
            <TouchableOpacity onPress={handleBack}>
              <Text className="text-blue-500">
                {"<< "}
                {STRINGS.backTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
