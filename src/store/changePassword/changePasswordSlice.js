import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  status: "idle",
  error: null,
};

export const updatePassword = createAsyncThunk(
  "changePassword/updatePassword",
  async ({ email, password, oldPassword }) => {
    try {
      console.log("({ email, password, oldPassword } :", {
        email,
        password,
        oldPassword,
      });
      const response = await api.patch(
        `/index.php?route=extension/mstore/account/changePassword`,
        {
          email: email,
          oldPassword: oldPassword,
          newPassword: password,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updatePassword.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const { resetState } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
