import { useEffect } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userInformation/userInformationSlice";
import {
  fetchSavedSicks,
  resetState,
  saveSavedSicks,
  unSaveSavedSicks,
} from "../../store/sickDetail/sickDetailSlice";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import * as STRINGS from "../../constants/strings";
import Icon from "react-native-vector-icons/FontAwesome";
import { SUCCEEDED } from "../../constants/store";
import ShareButton from "../../ShareButton/ShareButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

function SickDetailScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInformation);
  const { sick } = useSelector((state) => state.sickList);
  const { savedSicks, state } = useSelector((state) => state.sickDetail);
  const [isSickSaved, setIsSickSaved] = useState(false);

  const checkIsSaved = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      const savedSicksLocal = await AsyncStorage.getItem("savedSicks");
      const savedSicksArray = savedSicksLocal
        ? JSON.parse(savedSicksLocal)
        : [];
      return savedSicksArray.some(
        (x) => x.sicksId.toString() === sick?.product_id.toString()
      );
    } else {
      return savedSicks?.some(
        (x) =>
          x.usersId.toString() === user?.id.toString() &&
          x.sicksId.toString() === sick?.product_id.toString()
      );
    }
  };

  const saveToLocal = async (sickData) => {
    try {
      const existingSaves = await AsyncStorage.getItem("savedSicks");
      let newSave = JSON.parse(existingSaves);
      if (!newSave) {
        newSave = [];
      }
      newSave.push(sickData);
      await AsyncStorage.setItem("savedSicks", JSON.stringify(newSave));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const unsaveFromLocal = async (sickId) => {
    try {
      const existingSaves = await AsyncStorage.getItem("savedSicks");
      let saves = JSON.parse(existingSaves);
      if (saves) {
        saves = saves.filter((item) => item.sicksId !== sickId);
        await AsyncStorage.setItem("savedSicks", JSON.stringify(saves));
      }
    } catch (error) {
      console.error("Error removing data", error);
    }
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      saveToLocal({ usersId: user?.id, sicksId: sick?.product_id });
      return;
    }
    dispatch(saveSavedSicks({ usersId: user?.id, sicksId: sick?.product_id }));
  };

  const handleUnSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      unsaveFromLocal(sick?.product_id);
      return;
    }
    const obj = savedSicks.find(
      (x) =>
        x.usersId.toString() === user?.id.toString() &&
        x.sicksId.toString() === sick?.product_id.toString()
    );
    dispatch(
      unSaveSavedSicks({
        id: obj?.id,
        usersId: user?.id,
        sicksId: sick?.product_id,
      })
    );
  };

  const loadData = async () => {
    if (!user || !savedSicks) {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(fetchUser());
      }
      dispatch(fetchSavedSicks());
    }
    if (state === SUCCEEDED) {
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
    const isSaved = await checkIsSaved();
    setIsSickSaved(isSaved);
  };

  useEffect(() => {
    loadData();
  }, [user, sick, savedSicks, state, dispatch]);
  return (
    <View className="flex flex-row justify-center ">
      <View className="w-[90%] ">
        {isSickSaved ? (
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center space-x-2 mt-2">
              <Icon size={30} name="heart" color={"red"} />
              <Text className="text-xl">{STRINGS.saveSick}</Text>
            </View>
            <ShareButton
              name={sick?.name}
              reason={sick?.reason}
              simpton={sick?.simpton}
              description={sick?.description}
              revention={sick?.revention}
            />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center space-x-2 mt-2">
              <Icon size={30} name="heart" color={"black"} />
              <Text className="text-xl">{STRINGS.unSaveSick}</Text>
            </View>
            <ShareButton
              name={sick?.name}
              reason={sick?.reason}
              simpton={sick?.simpton}
              description={sick?.description}
              revention={sick?.revention}
            />
          </View>
        )}

        <ScrollView className="h-full mt-5">
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickName}
            </Text>
            <Text className="text-xl text-blue-800 font-bold mb-3">
              {sick?.name}
            </Text>
          </View>
          <View className="flex flex-row justify-center">
            <Image
              className="w-96 h-96 object-fill rounded-md"
              source={{
                uri:
                  sick.thumb ??
                  `https://via.placeholder.com/100x100.png?text=${sick?.name}`,
              }}
            />
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickReason}
            </Text>
            <Text className="text-xl">{sick?.description}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickSimptom}
            </Text>
            <Text className="text-xl">{sick?.description}</Text>
          </View>
          <View>
            <Text className="text-xl font-bold uppercase">
              {STRINGS.sickRevention}
            </Text>
            <Text className="text-xl mb-44">{sick?.description}</Text>
          </View>
        </ScrollView>
        <View className="absolute bottom-20 w-full">
          {!isSickSaved ? (
            <CustomizeButton onPress={handleSave} title={STRINGS.savesickBtn} />
          ) : (
            <CustomizeButton
              onPress={handleUnSave}
              title={STRINGS.unSavesickBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default SickDetailScreen;
