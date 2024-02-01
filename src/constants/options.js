import * as COLORS from "./colors";
import * as STRINGS from "./strings";

export const screenParentOption = {
  headerLeft: null,
  headerShown: false,
};
export const screenBottomOption = {
  headerTitleAlign: "left",
  tabBarShowLabel: false,
  tabBarActiveTintColor: COLORS.main,
};
export const screenChildOption = {
  title: false,
  headerLeftLabelVisible: true,
  headerBackTitle: STRINGS.backTitle,
  headerBackTitleStyle: { color: COLORS.main },
  headerTintColor: COLORS.main,
};
