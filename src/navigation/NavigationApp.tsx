import { Provider } from "react-redux";
import { navStore } from "./store";
import { Navigation } from "./components/Navigation";
import { useWorkStatusSync } from "../shared/useWorkStatusSync";
import { updateWorkStatus } from "./store/userSlice";
import { EventSource } from "../shared/events";

const NavigationSync = () => {
  useWorkStatusSync(updateWorkStatus, EventSource.NAVIGATION);
  return null;
};

export const NavigationApp = () => {
  return (
    <Provider store={navStore}>
      <NavigationSync />
      <Navigation />
    </Provider>
  );
};
