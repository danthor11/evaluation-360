export const UserList = ({ users }) => {
  if (!users) return null;

  return (
    <div className="space-y-4">
      {users?.map((user) => (
        <div
          className="flex items-center justify-between p-2 border-b border-gray-200"
          key={user._id}
        >
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-medium uppercase">
                {user.username} - {user.email}
              </p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
