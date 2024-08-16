import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import adminSlice from "./adminSlice";
import doctorSlice from "./doctorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    doctor: doctorSlice,
    admin: adminSlice,
  },
});

export default store;
