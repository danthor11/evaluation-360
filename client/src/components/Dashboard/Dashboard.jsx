import { AdminDashboard } from "./Admin";
import { EmployeeDashboard } from "./Employee";
import { ManagerDashboard } from "./Manager";
import { useAuth } from "../../hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "Admin" ? (
        <AdminDashboard />
      ) : user?.role === "Manager" ? (
        <ManagerDashboard />
      ) : (
        <EmployeeDashboard employee_id={user?._id} />
      )}
    </>
  );
};
