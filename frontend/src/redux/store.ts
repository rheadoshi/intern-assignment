import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice"; // Ensure correct path

const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
