import { configureStore } from "@reduxjs/toolkit";
import weatherGetter from "../features/getterSlice";

export const store = configureStore({
  reducer: {
    getter: weatherGetter,
  },
});
