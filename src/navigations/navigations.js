import { Text, View } from "react-native";
import { screenBottomOption } from "../constants/options";
import * as SCREENS_NAME from "../constants/screensName";
import * as STRINGS from "../constants/strings";
import AccountScreen from "../screens/Account/AccountScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import NotificationCounter from "../components/NotificationCounter/NotificationCounter";
import { useEffect } from "react";
import { fetchSchedule } from "../store/schedule/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";

export const home = {
  index: 1,
  name: SCREENS_NAME.home,
  component: HomeScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => (
      <Text className="text-lg font-bold">{STRINGS.home} </Text>
    ),
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" size={size} color={color} />
    ),
  },
};

export const schedule = {
  index: 2,
  name: SCREENS_NAME.schedule,
  component: ScheduleScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => (
      <Text className="text-lg font-bold">{STRINGS.schedule}</Text>
    ),
    tabBarIcon: ({ color, size }) => (
      <Icon name="table" size={size} color={color} />
    ),
  },
};

export const account = {
  index: 3,
  name: SCREENS_NAME.account,
  component: AccountScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => (
      <Text className="text-lg font-bold">{STRINGS.account}</Text>
    ),
    tabBarIcon: ({ color, size }) => (
      <Icon name="user" size={size} color={color} />
    ),
  },
};

export const notification = {
  index: 4,
  name: SCREENS_NAME.notification,
  component: NotificationScreen,
  options: {
    ...screenBottomOption,
    headerTitle: () => (
      <Text className="text-lg font-bold">{STRINGS.notification}</Text>
    ),
    tabBarIcon: ({ color, size }) => {
      const dispatch = useDispatch();
      const { schedules } = useSelector((state) => state.schedule);
      useEffect(() => {
        dispatch(fetchSchedule());
      }, [dispatch]);
      return (
        <View className="relative">
          <View className="absolute -top-4 -right-3 z-10">
            <NotificationCounter schedules={schedules} />
          </View>
          <Icon name="bell" size={size} color={color} />
        </View>
      );
    },
  },
};
