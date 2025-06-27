import { Middleware } from "@reduxjs/toolkit";
import { dispatchWorkStatusChanged, EventSource } from "./events";

// Middleware to dispatch events when work status is updated
export const createSyncMiddleware = (source: EventSource): Middleware => {
  return _ => next => action => {
    const result = next(action);

    // Only dispatch events for actions that originated from user interaction (not from sync)
    if (action.type.endsWith("/updateWorkStatus") && !action.meta?.fromSync) {
      dispatchWorkStatusChanged(action.payload, source);
    }

    return result;
  };
};
