import { Alert, ScrollView, Text, View } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import * as STRINGS from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUser,
  getInfoUser,
  resetState,
  updateUser,
} from "../../store/userInformation/userInformationSlice";
import { SUCCEEDED } from "../../constants/store";
import Loading from "../../components/Loading/Loading";

function UserInformationScreen() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.userInformation);
  const handleSave = (data) => {
    dispatch(
      updateUser({
        customer_id: user.customer_id,
        firstname: data.firstname,
        lastname: data.lastname,
        telephone: data.telephone,
      })
    );
  };
  const fields = [
    {
      name: "firstname",
      placeholder: "Họ",
      value: user?.firstname,
      type: "text",
      label: "Họ",
      isRequired: true,
    },
    {
      name: "lastname",
      placeholder: "Tên lót và tên",
      value: user?.lastname,
      type: "text",
      label: "Tên lót và tên",
      isRequired: true,
    },
    {
      name: "telephone",
      placeholder: "Số điện thoại",
      value: user?.telephone,
      type: "number",
      label: "số điện thoại",
      isRequired: true,
    },
  ];
  useEffect(() => {
    if (!user) {
      dispatch(getInfoUser());
    }
    if (status === SUCCEEDED) {
      Alert.alert(
        STRINGS.alertName,
        STRINGS.alerUpdate,
        [
          {
            text: STRINGS.alertClose,
            onPress: () => {
              dispatch(resetState());
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [user, status, dispatch]);
  return user ? (
    <ScrollView>
      <View className="flex flex-column items-center">
        <Text className="text-2xl my-5 uppercase">{STRINGS.editTitle}</Text>
        <View className="w-[90%] ">
          <GeneralForm
            fields={fields}
            handleData={handleSave}
            titleSubmitBtn={STRINGS.save}
          />
        </View>
      </View>
    </ScrollView>
  ) : (
    <View className="flex flex-row justify-center items-center h-screen -mt-28">
      <Loading />
    </View>
  );
}

export default UserInformationScreen;
