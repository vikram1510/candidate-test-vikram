import { WorkStatus } from "./types";

// Event types
export const WORK_STATUS_CHANGED = "workStatusChanged";

// Source enum for better type safety
export enum EventSource {
  DASHBOARD = "dashboard",
  NAVIGATION = "navigation",
}

// Event detail interfaces
export interface WorkStatusChangedEvent {
  workStatus: WorkStatus;
  source: EventSource;
}

// Event dispatchers
export const dispatchWorkStatusChanged = (
  workStatus: WorkStatus,
  source: EventSource
) => {
  const event = new CustomEvent<WorkStatusChangedEvent>(WORK_STATUS_CHANGED, {
    detail: { workStatus, source },
  });
  window.dispatchEvent(event);
};

// Event listener helper
export const addWorkStatusListener = (
  callback: (event: CustomEvent<WorkStatusChangedEvent>) => void
) => {
  window.addEventListener(WORK_STATUS_CHANGED, callback as EventListener);
  
  // Return cleanup function
  return () => {
    window.removeEventListener(WORK_STATUS_CHANGED, callback as EventListener);
  };
};