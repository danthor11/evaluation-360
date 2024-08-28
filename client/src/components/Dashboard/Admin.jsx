import { useUser } from "../../hooks/UseUser";
import { UserForm } from "../UserForm";
import { UserList } from "../UserList";

export const AdminDashboard = () => {
  const { users } = useUser();

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <UserForm />
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">System Users</h2>
          <p className="text-gray-500 mb-4">Current list of users</p>
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
};
