import { configureStore } from "@reduxjs/toolkit";
import userslice from "./reducer/userSlice";

const store = configureStore({
  reducer: {
    users: userslice, 
  },
});

export default store;
