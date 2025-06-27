import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWorkStatusListener, EventSource } from "./events";
import { WorkStatus } from "./types";

// Custom hook to listen for work status changes from other stores
export const useWorkStatusSync = (
  updateAction: (status: WorkStatus) => any,
  currentSource: EventSource
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanup = addWorkStatusListener((event) => {
      // Only update if event came from another source
      if (event.detail.source !== currentSource) {
        // Mark this action as coming from sync to prevent middleware from dispatching another event
        const action = updateAction(event.detail.workStatus);
        action.meta = { fromSync: true };
        dispatch(action);
      }
    });

    return cleanup;
  }, [dispatch, updateAction, currentSource]);
};