import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./schedule/scheduleSlice";
import authReducer from "./auth/authSlice";
import userInformationReducer from "./userInformation/userInformationSlice";
import changePasswordReducer from "./changePassword/changePasswordSlice";
import homeReducer from "./home/homeSlice";
import sickDetailReducer from "./sickDetail/sickDetailSlice";
import sickListReducer from "./sickList/sickListSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    auth: authReducer,
    userInformation: userInformationReducer,
    changePassword: changePasswordReducer,
    home: homeReducer,
    sickDetail: sickDetailReducer,
    sickList: sickListReducer,
  },
});

export default store;
