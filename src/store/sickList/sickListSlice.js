import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  sicks: undefined,
  sick: undefined,
  status: "idle",
  error: null,
};

export const fetchSicks = createAsyncThunk(
  "sickList/fetchSicks",
  async ({ category_id }) => {
    try {
      let result = [];
      const response = await api.get(
        `/index.php?route=extension/mstore/product&category=${category_id}`
      );
      if (response.data) {
        const response2 = await api.get(`/index.php?route=api/product`);
        if (response2.data) {
          response.data.data.forEach((x) => {
            response2.data.products.forEach((y) => {
              if (x.product_id === y.product_id) {
                result.push({
                  ...x,
                  thumb: y.thumb,
                });
              }
            });
          });
        }
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const sickListSlice = createSlice({
  name: "sickList",
  initialState,
  reducers: {
    setSick: (state, action) => {
      const { sick } = action.payload;
      state.sick = sick;
    },
    updateSickList: (state, action) => {
      const { sickList } = action.payload;
      state.sicks = sickList;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.sicks = action.payload;
      })
      .addCase(fetchSicks.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const { setSick, updateSickList } = sickListSlice.actions;

export default sickListSlice.reducer;
