import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await api.post(
        `/index.php?route=extension/mstore/account/login`,
        {
          email: email,
          password: password,
        }
      );
      AsyncStorage.setItem("userEmail", email);

      //đây chỉ là mô phỏng lấy token
      //khi có api login thực thì bỏ nó đi

      if (response.status === 200) {
        return {
          token: JSON.stringify(response.data),
          fullName: `${response.data.data.firstname} ${response.data.data.lastname}`,
          age: "90",
        };
      } else {
        return { token: "" };
      }
      //khi có api login thực thì bỏ nó đi

      //thay bằng

      //return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ firstname, lastname, email, telephone, password, confirm }) => {
    try {
      const response = await api.post(
        "/index.php?route=extension/mstore/account/register",
        {
          email: email,
          firstname: firstname,
          lastname: lastname,
          telephone: telephone,
          password: password,
          confirm: confirm,
        }
      );
      AsyncStorage.setItem("userEmail", email);

      //đây chỉ là mô phỏng lấy token
      //khi có api signup thực thì bỏ nó đi

      if (response.data) {
        return {
          token: JSON.stringify(response.data),
          fullName: `${response.data.data.firstname} ${response.data.data.lastname}`,
          age: "90",
        };
      }

      //khi có api signup thực thì bỏ nó đi

      //thay bằng

      //return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unmounteAuth: (state) => {
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const { token, fullName, age } = action.payload;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("fullName", fullName);
        console.log("fullName :", fullName);
        AsyncStorage.setItem("age", age);
        console.log("age :", age);
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const { token, fullName, age } = action.payload;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("fullName", fullName);
        AsyncStorage.setItem("age", age);
        state.token = token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const { unmounteAuth } = authSlice.actions;

export default authSlice.reducer;
