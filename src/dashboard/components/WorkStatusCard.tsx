import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const handleStatusChange = (status: WorkStatus) => {
    dispatch(updateWorkStatus(status));
  };

  const statuses: WorkStatus[] = ["looking", "passive", "not_looking"];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <p className="mb-4">Update your availability for new opportunities:</p>
        
        <div className="flex flex-col gap-3">
          {statuses.map((status) => (
            <label
              key={status}
              className={`
                px-4 py-3 rounded-full cursor-pointer transition-all text-sm font-medium text-center
                ${profile.workStatus === status
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              onClick={() => handleStatusChange(status)}
            >
              <input
                type="radio"
                name="workStatus"
                value={status}
                checked={profile.workStatus === status}
                onChange={() => handleStatusChange(status)}
                className="sr-only"
              />
              {statusLabels[status]}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
