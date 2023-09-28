import { createSlice } from "@reduxjs/toolkit";

export const getterSlice = createSlice({
  name: "getter",
  initialState: {
    value: "",
  },
  reducers: {
    fetchNewObj: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { fetchNewObj } = getterSlice.actions;

export default getterSlice.reducer;
export const selectWeatherObj = (state) => state.getter.value;
