import React from "react";
import { View, Text } from "react-native";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import * as STRINGS from "../../constants/strings";

const RemindScreen = ({ route, navigation }) => {
  const { onSave, fields } = route.params || {};

  const handleSaveAndGoBack = async (values) => {
    if (onSave) {
      await onSave(values);
    }
    navigation.goBack();
  };

  return (
    <View className="bg-white p-4 rounded-lg w-full h-full">
      <Text className="text-center text-xl font-bold mb-4">
        {STRINGS.addRemind}
      </Text>
      <GeneralForm
        fields={fields}
        titleSubmitBtn={STRINGS.save}
        handleData={handleSaveAndGoBack}
        backBtn={true}
        goBack={() => navigation.goBack()}
      />
      {/* <CustomizeButton
        onPress={() => navigation.goBack()}
        title={STRINGS.close}
      /> */}
    </View>
  );
};

export default RemindScreen;
