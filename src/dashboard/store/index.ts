import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { createSyncMiddleware } from "../../shared/syncMiddleware";
import { EventSource } from "../../shared/events";

export const dashboardStore = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createSyncMiddleware(EventSource.DASHBOARD)),
});

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
