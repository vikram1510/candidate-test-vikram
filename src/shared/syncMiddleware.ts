import { createListenerMiddleware } from "@reduxjs/toolkit";
import { dispatchWorkStatusChanged, EventSource } from "./events";

// Create listener middleware to dispatch events when work status is updated
export const createSyncMiddleware = (source: EventSource) => {
  const listenerMiddleware = createListenerMiddleware();

  listenerMiddleware.startListening({
    matcher: (action) => 
      action.type.endsWith("/updateWorkStatus") && !action.meta?.fromSync,
    effect: (action) => {
      dispatchWorkStatusChanged(action.payload, source);
    },
  });

  return listenerMiddleware.middleware;
};
