import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ROUTES from "./src/routes/routes";
import { Provider } from "react-redux";
import store from "./src/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setInitialRoute(ROUTES.mainTab.name);
      } else {
        setInitialRoute(ROUTES.login.name);
      }
    };
    checkToken();
  }, [initialRoute]);
  if (initialRoute === null) {
    return null;
  }
  const screens = Object.values(ROUTES).map((screen, index) => (
    <Stack.Screen
      key={index}
      name={screen.name}
      component={screen.component}
      options={screen.options}
    />
  ));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {screens}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
