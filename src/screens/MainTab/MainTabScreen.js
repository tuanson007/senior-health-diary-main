import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as NAVIGATIONS from "../../navigations/navigations";
import * as SCREENS_NAME from "../../constants/screensName";

const Tab = createBottomTabNavigator();
function MainTabScreen() {
  const navigations = Object.values(NAVIGATIONS)
    .sort((a, b) => a.index - b.index)
    .map((navigation, index) => {
      return (
        <Tab.Screen
          key={index}
          name={navigation.name}
          options={navigation.options}
          component={navigation.component}
        />
      );
    });
  return (
    <Tab.Navigator initialRouteName={SCREENS_NAME.home}>
      {navigations}
    </Tab.Navigator>
  );
}

export default MainTabScreen;
