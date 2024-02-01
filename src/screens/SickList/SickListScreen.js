import { View, Text, ScrollView, Image } from "react-native";
import * as STRINGS from "../../constants/strings";
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS_NAME from "../../constants/screensName";
import {
  fetchSicks,
  searchSicks,
  setSick,
  updateSickList,
} from "../../store/sickList/sickListSlice";
import Loading from "../../components/Loading/Loading";

function SickListScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleGoToSickDetail = (sick) => {
    dispatch(setSick({ sick: sick }));
    navigation.navigate(SCREENS_NAME.sickDetail);
  };
  const { sicks } = useSelector((state) => state.sickList);
  const handleSearch = (data) => {
    const { search } = data;
    if (search) {
      const filteredSicks = sicks.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      dispatch(updateSickList({ sickList: filteredSicks }));
    } else {
      dispatch(fetchSicks());
    }
  };
  const fields = [
    {
      name: "search",
      placeholder: "Tìm kiếm bệnh",
      value: "",
      type: "text",
      label: "Tìm kiếm bệnh",
    },
  ];
  useEffect(() => {
    if (!sicks) {
      dispatch(fetchSicks());
    }
  }, [sicks, dispatch]);
  return (
    <View className="bg-blue-200 h-full">
      <View className="flex flex-row justify-center">
        <View className="w-[90%]">
          <GeneralForm
            fields={fields}
            titleSubmitBtn={STRINGS.search}
            handleData={handleSearch}
            isVertical={true}
          />
        </View>
      </View>
      <Text className="font-bold text-slate-500 uppercase text-start ml-6 text-xl my-2">
        {STRINGS.sickListName}
      </Text>

      <ScrollView className="bg-white h-full rounded-t-xl py-3 px-2 mx-1">
        <View className="rounded-t-xl space-y-2 mb-10">
          {sicks && sicks.length ? (
            sicks?.map((sick, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleGoToSickDetail(sick)}
              >
                <View className="flex flex-row items-center space-x-3 bg-slate-200 p-1 rounded-md">
                  <Image
                    className="w-20 h-20 object-fill rounded-md"
                    source={{
                      uri:
                        sick.thumb ??
                        `https://via.placeholder.com/100x100.png?text=${sick?.name}`,
                    }}
                  />
                  <Text className="text-xl font-bold w-2/3">{sick.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Loading />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default SickListScreen;
