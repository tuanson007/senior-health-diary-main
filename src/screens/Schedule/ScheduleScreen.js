import React, { useEffect, useState } from "react";
import { View, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { localeConfig } from "../../constants/localeConfig";
import { ScrollView } from "react-native-gesture-handler";
import CustomizeButton from "../../components/CustomizeButton/CustomizeButton";
import ShareButton from "../../ShareButton/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  addDiary,
  addRemind,
  addSchedule,
  fetchSchedule,
  updateSchedule,
} from "../../store/schedule/scheduleSlice";
import * as SCREENS_NAME from "../../constants/screensName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

LocaleConfig.locales["vi"] = localeConfig;
LocaleConfig.defaultLocale = "vi";

function ScheduleScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { schedules } = useSelector((state) => state.schedule);
  const goToLogin = () => {
    navigation.navigate(SCREENS_NAME.login);
  };
  const loader = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(fetchSchedule());
    } else {
      Alert.alert(STRINGS.alertName, STRINGS.alertLogin);
      goToLogin();
    }
  };
  useEffect(() => {
    loader();
  }, [dispatch]);
  const [scheduleId, setScheduleId] = useState("");

  const renderItem = (item) => {
    return (
      <ScrollView>
        {item.type === "remind" ? (
          <View className="flex flex-column items-start justify-center shadow-md bg-gray-300 my-2 mr-2 rounded-md">
            <Text className="text-sm font-bold text-green-700">
              {item.time}
            </Text>
            <Text className="text-sm">{item.text}</Text>
          </View>
        ) : (
          <View className="relative w-full flex flex-column items-start justify-center shadow-md bg-gray-300 my-2 mr-2 rounded-md">
            <Text className="text-lg font-bold">{item.sick}</Text>
            <Text className="text-md">{item.symptoms}</Text>
            <Text className="text-sm italic text-gray-500">
              {item.description}
            </Text>
            <View className="absolute right-1 bottom-0">
              <ShareButton
                symptoms={item.symptoms}
                description={item.description}
                date={item.date}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderEmptyData = () => {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{STRINGS.noSchedule}</Text>
      </View>
    );
  };
  const [dataSelected, setDateSelected] = useState("");

  const fieldsRemind = [
    {
      name: "time",
      placeholder: "Thời gian",
      value: "",
      type: "time",
      label: "Thời gian",
      isRequired: true,
    },
    {
      name: "text",
      placeholder: "Nội dung",
      value: "",
      type: "text",
      label: "Nội dung",
      isRequired: true,
    },
  ];

  const fieldDiary = [
    {
      name: "sick",
      placeholder: "Tên bệnh",
      value: "",
      type: "text",
      label: "Tên bệnh",
      isRequired: true,
    },
    {
      name: "symptoms",
      placeholder: "Triệu chứng",
      value: "",
      type: "text",
      label: "Triệu chứng",
      isRequired: true,
    },
    {
      name: "description",
      placeholder: "Mô tả",
      value: "",
      type: "text",
      label: "Mô tả",
      isRequired: true,
    },
  ];

  const handleDayPress = _.debounce((value) => {
    setDateSelected(value.dateString);
    if (schedules[value.dateString]) {
      const scheduleId = schedules[value.dateString][0].scheduleId;
      setScheduleId(scheduleId);
    } else {
      setScheduleId("");
    }
  }, 100);

  const handleAddRemind = async (values) => {
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: { type: "remind", time: values?.time, text: values?.text },
      })
    );
    if (scheduleId) {
      const data = {
        scheduleId: scheduleId,
        time: values?.time,
        text: values?.text,
      };
      dispatch(addRemind(data));
    } else {
      const data = {
        customer_id: await AsyncStorage.getItem("userEmail"),
        date: dataSelected,
        type: "remind",
        reminds: [
          {
            time: values?.time,
            text: values?.text,
          },
        ],
        diaries: [],
      };
      dispatch(addSchedule(data));
    }
  };
  const handleAddDiary = async (values) => {
    dispatch(
      updateSchedule({
        date: dataSelected,
        schedule: {
          type: "diary",
          sick: values?.sick,
          symptoms: values?.symptoms,
          description: values?.description,
          date: dataSelected,
        },
      })
    );
    if (scheduleId) {
      const data = {
        scheduleId: scheduleId,
        sick: values?.sick,
        symptoms: values?.symptoms,
        description: values?.description,
      };
      dispatch(addDiary(data));
    } else {
      const data = {
        customer_id: await AsyncStorage.getItem("userEmail"),
        date: dataSelected,
        type: "diary",
        reminds: [],
        diaries: [
          {
            sick: values?.sick,
            symptoms: values?.symptoms,
            description: values?.description,
          },
        ],
      };
      dispatch(addSchedule(data));
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDateSelected(today);
  }, []);

  return (
    <View className="flex-1">
      <Agenda
        onDayPress={handleDayPress}
        theme={{
          todayBackgroundColor: COLORS.todayBackgroundColor,
          selectedDayBackgroundColor: COLORS.selectedDayBackgroundColor,
          dotColor: COLORS.dotColor,
          agendaTodayColor: COLORS.main,
        }}
        items={schedules}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
      />

      <View className="mb-2 px-2">
        <CustomizeButton
          onPress={() =>
            navigation.navigate(SCREENS_NAME.remind, {
              onSave: handleAddRemind,
              fields: fieldsRemind,
            })
          }
          title={STRINGS.addRemind}
        />
      </View>
      <View className="px-2">
        <CustomizeButton
          onPress={() =>
            navigation.navigate(SCREENS_NAME.diary, {
              onSave: handleAddDiary,
              fields: fieldDiary,
            })
          }
          title={STRINGS.addDiary}
        />
      </View>
    </View>
  );
}

export default ScheduleScreen;
