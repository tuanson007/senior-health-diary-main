import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const initialState = {
  user: undefined,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "userInformation/fetchUser",
  async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const response = await api.post(
        `index.php?route=extension/mstore/user/userinfo`,
        {
          email: userEmail,
        }
      );
      const user = {
        id: response.data.customer_id,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
);
export const getInfoUser = createAsyncThunk(
  "userInformation/getInfoUser",
  async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const response = await api.post(
        `/index.php?route=extension/mstore/account/getUserInfoByEmail`,
        {
          email: userEmail,
        }
      );
      const user = {
        ...response.data.data,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  "userInformation/updateUser",
  async (user) => {
    try {
      const response = await api.patch(
        `/index.php?route=extension/mstore/account/updateUserInfo`,
        {
          ...user,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.status = "idle";
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.user = action.payload;
        AsyncStorage.setItem(
          "fullName",
          `${state.user.firstname} ${state.user.lastname}`
        );
      });
  },
});

export const { resetState } = userInformationSlice.actions;

export default userInformationSlice.reducer;
