import React, { useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { format, isToday } from "date-fns";
import * as COLORS from "../../constants/colors";
import * as STRINGS from "../../constants/strings";
import { fetchSchedule } from "../../store/schedule/scheduleSlice";

function NotificationScreen() {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedule.schedules);

  useEffect(() => {
    if (!schedules) {
      dispatch(fetchSchedule());
    }
  }, [dispatch, schedules]);

  const todayNotifications = [];
  const otherNotifications = [];

  if (schedules) {
    Object.entries(schedules).forEach(([date, notifications]) => {
      if (isToday(new Date(date))) {
        todayNotifications.push({ date, notifications });
      } else {
        otherNotifications.push({ date, notifications });
      }
    });
  }

  const sortedNotifications = [...todayNotifications, ...otherNotifications];

  const renderItem = ({ item }) => (
    <View className="flex-row items-center p-4 bg-gray-200 m-2 shadow rounded-lg space-x-4">
      <Icon name="bell" size={24} color={COLORS.main} className="mr-4" />
      <View>
        <Text className="text-lg font-bold">{item.time}</Text>
        <Text className="text-lg">{item.text}</Text>
      </View>
      <View>
        <Text className="text-lg font-bold">{item.sick}</Text>
        <Text className="text-lg">{item.symptons}</Text>
        <Text className="text-lg">{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="p-4">
      {sortedNotifications.map(({ date, notifications }, index) => (
        <View key={date}>
          <Text className="text-xl font-bold text-gray-800 mt-4">
            {isToday(new Date(date)) && <Text>{STRINGS.today} - </Text>}
            {format(new Date(date), "dd/MM/yyyy")}
          </Text>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default NotificationScreen;
