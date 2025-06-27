import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { createSyncMiddleware } from "../../shared/syncMiddleware";
import { EventSource } from "../../shared/events";

export const navStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createSyncMiddleware(EventSource.NAVIGATION)),
});

export type NavRootState = ReturnType<typeof navStore.getState>;
export type NavDispatch = typeof navStore.dispatch;
