import React from "react";
import { View, Text } from "react-native";

const NotificationCounter = ({ schedules }) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const events = schedules[today] || [];
    let remindCount = 0;
    let diaryCount = 0;
    events.forEach((event) => {
      if (event.type === "remind") {
        remindCount++;
      } else if (event.type === "diary") {
        diaryCount++;
      }
    });

    return (
      <View className="bg-red-500 w-7 h-7 rounded-full flex flex-row justify-center items-center border-white border-2 ">
        <Text className="text-white">{schedules[today].length}</Text>
      </View>
    );
  } catch (error) {
    return (
      <View className="bg-red-500 w-7 h-7 rounded-full flex flex-row justify-center items-center border-white border-2 ">
        <Text className="text-white">0</Text>
      </View>
    );
  }
};

export default NotificationCounter;
