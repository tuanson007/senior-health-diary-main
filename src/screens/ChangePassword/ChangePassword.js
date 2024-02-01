import { Alert, ScrollView, Text, View } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUser,
  getInfoUser,
} from "../../store/userInformation/userInformationSlice";
import { SUCCEEDED } from "../../constants/store";
import {
  resetState,
  updatePassword,
} from "../../store/changePassword/changePasswordSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChangePasswordScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  const { status } = useSelector((state) => state.changePassword);
  const handleSave = async (data) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert(STRINGS.alertName, STRINGS.alerIsNotTheSame);
    } else {
      dispatch(
        updatePassword({
          email: await AsyncStorage.getItem("userEmail"),
          password: data.password,
          oldPassword: data.oldPassword,
        })
      );
    }
  };
  const fields = [
    {
      name: "oldPassword",
      placeholder: "Mật khẩu cũ",
      type: "password",
      value: "",
      label: "Mật khẩu cũ",
      minLength: 6,
      isRequired: true,
    },
    {
      name: "password",
      placeholder: "Mật khẩu mới",
      type: "password",
      value: "",
      label: "Mật khẩu mới",
      minLength: 6,
      isRequired: true,
    },
    {
      name: "confirmPassword",
      placeholder: "Nhập lại mật khẩu",
      type: "password",
      value: "",
      label: "Nhập lại mật khẩu",
      minLength: 6,
      isRequired: true,
    },
  ];
  useEffect(() => {
    if (!user) {
      dispatch(getInfoUser());
    }
    if (user && status === SUCCEEDED) {
      Alert.alert(
        STRINGS.alertName,
        STRINGS.alerUpdate,
        [
          {
            text: STRINGS.alertClose,
            onPress: () => {
              dispatch(resetState());
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [user, status, dispatch]);
  return (
    <ScrollView>
      <View className="flex flex-column items-center">
        <Text className="text-2xl my-5 uppercase">
          {STRINGS.changePassword}
        </Text>
        <View className="w-[90%] ">
          <GeneralForm
            fields={fields}
            handleData={handleSave}
            titleSubmitBtn={STRINGS.save}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ChangePasswordScreen;
