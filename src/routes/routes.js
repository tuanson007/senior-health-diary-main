import LoginScreen from "../screens/Login/LoginScreen";
import MainTabScreen from "../screens/MainTab/MainTabScreen";
import UserInformationScreen from "../screens/UserInformation/UserInformation";
import { screenChildOption, screenParentOption } from "../constants/options";
import * as SCREENS_NAME from "../constants/screensName";
import SignUpScreen from "../screens/SignUp/SignUpScreen";
import ChangePasswordScreen from "../screens/ChangePassword/ChangePassword";
import SickDetailScreen from "../screens/SickDetail/SickDetail";
import SickListScreen from "../screens/SickList/SickListScreen";
import RemindScreen from "../screens/Remind/RemindScreen";
import DiaryScreen from "../screens/Diary/DiaryScreen";

export const mainTab = {
  name: SCREENS_NAME.mainTab,
  component: MainTabScreen,
  options: screenParentOption,
};
export const login = {
  name: SCREENS_NAME.login,
  component: LoginScreen,
  options: screenParentOption,
};
export const signUp = {
  name: SCREENS_NAME.signUp,
  component: SignUpScreen,
  options: screenParentOption,
};
export const userInformation = {
  name: SCREENS_NAME.userInformation,
  component: UserInformationScreen,
  options: screenChildOption,
};
export const changePassword = {
  name: SCREENS_NAME.changePassword,
  component: ChangePasswordScreen,
  options: screenChildOption,
};
export const sickDetail = {
  name: SCREENS_NAME.sickDetail,
  component: SickDetailScreen,
  options: screenChildOption,
};
export const sickList = {
  name: SCREENS_NAME.sickList,
  component: SickListScreen,
  options: screenChildOption,
};
export const remind = {
  name: SCREENS_NAME.remind,
  component: RemindScreen,
  options: screenChildOption,
};
export const diary = {
  name: SCREENS_NAME.diary,
  component: DiaryScreen,
  options: screenChildOption,
};
