import { Middleware } from "@reduxjs/toolkit";
import { dispatchWorkStatusChanged, EventSource } from "./events";

// Middleware to dispatch events when work status is updated
export const createSyncMiddleware = (source: EventSource): Middleware => {
  return _ => next => action => {
    const result = next(action);

    // Check if this is a work status update action
    if (action.type.endsWith("/updateWorkStatus")) {
      dispatchWorkStatusChanged(action.payload, source);
    }

    return result;
  };
};
