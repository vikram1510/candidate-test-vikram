import { Provider } from "react-redux";
import { dashboardStore } from "../store";
import { WorkStatusCard } from "./WorkStatusCard";
import { StatsSummary } from "./StatsSummary";
import { RecentJobs } from "./RecentJobs";
import { useWorkStatusSync } from "../../shared/useWorkStatusSync";
import { updateWorkStatus } from "../store/userSlice";
import { EventSource } from "../../shared/events";

export const DashboardSync = () => {
  useWorkStatusSync(updateWorkStatus, EventSource.DASHBOARD);
  return null;
};

export const Dashboard = () => {
  return (
    <Provider store={dashboardStore}>
      <DashboardSync />
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-2xl mb-2">Welcome to your Dashboard</h1>
          <p className="text-base text-gray-700">
            Track your freelance business at a glance
          </p>
        </header>

        <StatsSummary />

        <div className="grid grid-cols-3 gap-6">
          <WorkStatusCard className="h-full" />
          <RecentJobs className="col-span-2 h-full" />
        </div>
      </div>
    </Provider>
  );
};
