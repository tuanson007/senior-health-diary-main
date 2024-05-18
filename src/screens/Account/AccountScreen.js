import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";
import * as ACCOUNT_MENU from "../../constants/account";
import * as STRINGS from "../../constants/strings";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AccountScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState();
  const [age, setAge] = useState();

  const goToUserInformation = () => {
    navigation.navigate(SCREENS_NAME.userInformation);
  };
  const goToScreen = (screen) => {
    if (!screen) {
      Alert.alert(
        STRINGS.alertName,
        STRINGS.alertNoFeature,
        [
          {
            text: STRINGS.alertClose,
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate(screen);
    }
  };

  const arrow = (
    <Image
      source={require("../../../assets/images/arrow-icon.png")}
      className="w-5 h-5"
    />
  );
  const goToLogin = () => {
    navigation.navigate(SCREENS_NAME.login);
  };
  useEffect(() => {
    async function loadData() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const _fullName = await AsyncStorage.getItem("fullName");
        const _age = await AsyncStorage.getItem("age");
        if (_fullName && _age) {
          setFullName(_fullName);
          setAge(_age);
        }
      } else {
        Alert.alert(STRINGS.alertName, STRINGS.alertLogin);
        goToLogin();
      }
    }
    loadData();

    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <TouchableOpacity onPress={goToUserInformation}>
        <View className="border-y border-gray-400 py-2 w-full">
          <View className="flex justify-between flex-row items-center p-5">
            <View className="flex flex-row items-center space-x-2">
              <Image
                source={require("../../../assets/images/user-logo.png")}
                className="w-20 h-20 rounded-full"
              />
              <View>
                <Text>{STRINGS.info}</Text>
                <Text className="text-xl uppercase font-bold">{fullName}</Text>
              </View>
            </View>
            {arrow}
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <View className="border-b border-gray-400 p-3 mt-10">
          <Text className=" text-gray-400">{STRINGS.optionText}</Text>
        </View>
        {ACCOUNT_MENU.accountOptionMenu.map((menu, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => goToScreen(menu.navigateToScreen)}
            >
              <View className="border-b border-gray-400 w-full">
                <View className="flex justify-between p-5 flex-row">
                  <Text className="text-lg">{menu.title}</Text>
                  {arrow}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {fullName && (
          <TouchableOpacity className="mt-20">
            <View className="border border-gray-400 w-full">
              <View className="flex justify-start p-5">
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.navigate(SCREENS_NAME.login);
                  }}
                >
                  <Text className="text-red-500 font-bold text-lg">
                    {STRINGS.logOut}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export default AccountScreen;
